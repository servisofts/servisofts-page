import React from 'react'
import PageAbstract, { PageAbstractConfigType } from './PageAbstract';
import { SForm, SInput, SLoad, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Enviroment from './Enviroment';

interface editConfigType extends PageAbstractConfigType {

}
class index extends PageAbstract {
    pk;
    data;
    form;
    constructor(props, config: editConfigType) {
        config.params = ["pk", ...config.params ?? []];
        super(props, {
            type: "pageContainer",
            ...config,
        }, "profile");
        this.pk = this.$params["pk"];
    }

    $inputs() {
        var headers = {};
        const excludes = this.excludes ?? [];
        if (this.Parent.model.image) {
            headers["image_profile"] = {
                type: "image",
                defaultValue: this.Parent.model._get_image_download_path(SSocket.api, this.pk)
            }
        }
        Object.keys(this.Parent.model.Columns).map((key) => {
            if (excludes.indexOf(key) > -1) {
                return;
            }
            var col = this.Parent?.model?.Columns[key];
            if (!col.editable) {
                return;
            }
            var label = key;
            if (col) {
                label = col.label ?? key;
            }
            var defaultValue = this.data[key] ?? "";
            var typeImput = "default";
            switch (col["type"]) {
                case "text":
                    typeImput = "text"
                    break;
                case "date":
                    typeImput = "date"
                    break;
                case "integer":
                    typeImput = "number"
                    break;
                case "double":
                    typeImput = "text"
                    // if (defaultValue) {
                        // defaultValue = parseFloat(defaultValue).toFixed(2)
                    // }
                    break;
                case "money":
                    typeImput = "money"
                    if (defaultValue) {
                        defaultValue = parseFloat(defaultValue).toFixed(2)
                    }
                    break;

            }
            headers[key] = { label: label, required: col["notNull"], type: typeImput, defaultValue: defaultValue }
        })
        return headers;
    }
    _buildHeaders() {
        var heads = this.$inputs();
        var arr = [];
        Object.keys(heads).map((key, i) => {
            arr.push({
                key: key,
                index: i + 1,
                ...heads[key]
            })
        })
        arr = arr.sort((a, b) => a.index - b.index);
        var data = {}
        arr.map((obj) => {
            data[obj.key] = obj
        })
        return data;
    }

    $onSubmit(data) {
        return null;
    }

    $submitName() {
        return Enviroment.buttoms.confirm ?? "confirm"
    }
    $onSubmitFile() {
        this.form.uploadFiles(
            this.Parent.model._get_image_upload_path(SSocket.api, this.pk),
            "image_profile"
        );
        return null;
    }

    $render() {
        this.data = this.$getData();
        if (!this.data) return this.$onLoading()
        return <SForm
            row
            style={{
                justifyContent: 'space-between',
            }}
            col={"xs-12"}
            ref={ref => this.form = ref}
            inputs={this._buildHeaders()}
            onSubmitName={this.$submitName()}
            onSubmit={(form) => {
                this.$onSubmit(form)
                this.$onSubmitFile()

            }}
        />
    }
}
export default index;