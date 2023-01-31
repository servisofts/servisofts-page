import React from 'react'
import PageAbstract, { PageAbstractConfigType } from './PageAbstract';

import { SForm, SInput, SLoad, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Enviroment from './Enviroment';

interface newConfigType extends PageAbstractConfigType {

}
class index extends PageAbstract {
    form;
    _params;
    constructor(props, config: newConfigType) {
        super(props, {
            type: "pageContainer",
            ...config,
        }, "new");
        this._params = SNavigation.getAllParams();
        console.log(this._params)
    }


    $inputs() {
        var headers = {};
        const excludes = this.excludes ?? [];
        if (this.Parent.model.image) {
            headers["image_profile"] = { type: "image" }
        }
        Object.keys(this.Parent.model.Columns).map((key) => {
            if (excludes.indexOf(key) > -1) {
                return;
            }


            var col = this.Parent?.model?.Columns[key];
            var label = key;
            if (col) {
                label = col.label ?? key;
            }
            var typeImput = "";
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
            }

            headers[key] = { label: label, required: col["notNull"], type: typeImput }
            if (this._params[key]) {
                headers[key].defaultValue = this._params[key];
                headers[key].editable = false;
            }
            if (col.fk) {
                // headers[key] = { label: label, required: col["notNull"], type: "text", editable:false, onPress:()=>{
                //     alert("asd")
                // } }
            }
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
    $submitFile(pk) {
        console.log("entro al sumbut fil")
        this.form.uploadFiles(
            this.Parent.model._get_image_upload_path(SSocket.api, pk)
        );
        return null;
    }
    $getData() {
        return true;
    }
    $submitName() {
        return Enviroment.buttoms.confirm ?? "confirm"
    }
    $render() {
        var data = this.$getData();
        if (!data) return this.$onLoading()
        return (<SForm
            row
            style={{
                justifyContent: 'space-between',
            }}
            col={"xs-12"}
            ref={ref => this.form = ref}
            inputs={this._buildHeaders()}
            // onSubmitProps={{
            //     type:"outline",
            //     variant:""
            // }}
            onSubmitName={this.$submitName()}
            onSubmit={this.$onSubmit.bind(this)}
        />
        );
    }
}
export default index;