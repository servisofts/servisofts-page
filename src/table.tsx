import React from 'react'
import PageAbstract, { PageAbstractConfigType } from './PageAbstract';

import { SDate, SImage, SLoad, SNavigation, SPage, SPopup, STable2, SView, HeaderProps } from 'servisofts-component';
import SSocket from 'servisofts-socket'

interface tableConfigType extends PageAbstractConfigType {

}

class table extends PageAbstract {
    constructor(props, config: tableConfigType) {
        super(props, {
            type: "page",
            ...config
        }, "table");
    }

    $headers(): { [name: string]: HeaderProps } {
        const excludes = this.excludes ?? [];
        var headers = {};
        headers["index"] = { label: "#", width: 50 }
        if (this.Parent.model.image) {
            headers["key-image"] = {
                label: "Img",
                width: 50,
                center: true,
                render: (key_r) => {
                    return this.Parent.model._get_image_download_path(SSocket.api, key_r);
                },
                component: (src) => {
                    return <SView col={"xs-11"} height center card>
                        <SImage src={src} enablePreview />
                    </SView>
                }
            }
        }
        Object.keys(this.Parent.model.Columns).map((key) => {
            var col = this.Parent.model.Columns[key];
            if (excludes.indexOf(key) > -1) {
                return;
            }
            var render = null;
            if (col.type == "timestamp") {
                render = (obj) => { return new SDate(obj).toString() }
            }
            if (col.type == "date") {
                render = (obj) => { return new SDate(obj).toString("dd/MM/yyyy") }
            }
            if (col.type == "time") {
                render = (obj) => { return new SDate(obj).toString("hh:mm:ss") }
            }
            var label = key;
            if (col) {
                label = col.label ?? key;
            }
            headers[key] = ({
                key: key,
                label: label,
                width: 100,
                render: render
            })
        })
        return headers;
    }
    _formatHeaders() {
        var heads = this.$headers();
        var arr = [];
        Object.keys(heads).map((key, i) => {
            arr.push({
                key: key,
                index: i + 1,
                ...heads[key]
            })
        })

        arr = arr.sort((a, b) => a.index - b.index);
        return arr;
    }
    $filter(data) {
        return true;
    }
    // $menu() {
    //     var arr = [];
    //     arr.push({ icon: "Arrow", label: "Back", onPress: () => { } });
    //     return arr;
    // }
    $render() {
        var data = this.$getData();
        if (!data) return this.$onLoading();
        return <SView col={"xs-12"} flex>
            <STable2
                data={data}
                header={this._formatHeaders()}
                filter={this.$filter.bind(this)}
            />
        </SView>
    }
}
export default table;