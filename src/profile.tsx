import React from 'react'
import PageAbstract, { PageAbstractConfigType } from './PageAbstract';
import { SButtom, SHr, SImage, SList, SLoad, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
import Item from './item';
import Enviroment from './Enviroment';

interface profileConfigType extends PageAbstractConfigType {

}

class profile extends PageAbstract {
    data;
    pk;
    onSelect
    constructor(props, config: profileConfigType) {
        config.params = ["pk", ...config.params ?? []];
        super(props, {
            type: "pageContainer",
            ...config,
        }, "profile");
        this.pk = this.$params["pk"];
        this.onSelect = SNavigation.getParam("onSelect");
    }

    $item(obj) {
        const ItemNew = this.item;
        if (ItemNew) {
            return <ItemNew data={obj} Parent={this.Parent} excludes={this.excludes} row={false} onPress={() => {
                this.$onSelect(obj)
            }} />
        }
        return <Item data={obj} itemType={this.itemType} Parent={this.Parent} excludes={this.excludes} row={false} />
    }

    $onSelect(obj) {
        return true;
    }
    $allowEdit() {
        return false;
    }
    $allowDelete() {
        return false;
    }
    $allowRestore() {
        return false;
    }
    $allowBack() {
        return false;
    }
    onEdit() {
        SNavigation.navigate(this.Parent?.path + "/edit", { pk: this.data[this.Parent.model.pk] });
    }
    onDelete() {
        SNavigation.navigate(this.Parent?.path + "/delete", { pk: this.data[this.Parent.model.pk] });
    }
    onRestore() {
        SNavigation.navigate(this.Parent?.path + "/restore", { pk: this.data[this.Parent.model.pk] });
    }
    onBack() {
        SNavigation.goBack();
    }
    $menu() {
        var arr = [];
        if (this.$allowBack()) {
            arr.push({ icon: "Arrow", label: "Back", onPress: this.onBack.bind(this) });
        }
        if (this.$allowEdit()) {
            arr.push({ icon: "Pencil", label: Enviroment.buttoms.edit, onPress: this.onEdit.bind(this) });
        }
        // if (this.data) {
        // if (this.data.estado != 0) {
        if (this.$allowDelete()) {
            arr.push({ icon: "Close", label: Enviroment.buttoms.delete, onPress: this.onDelete.bind(this) });
        }
        // } else {
        if (this.$allowRestore()) {
            arr.push({ icon: "Close", label: Enviroment.buttoms.restore, onPress: this.onRestore.bind(this) });
        }
        // }

        // }

        return arr;
    }
    $render() {
        this.data = this.$getData();
        if (!this.data) return this.$onLoading();
        if (!this.state.loadingSuccess) {
            this.state.loadingSuccess = true;
            this.setState({ ...this.state })
        }
        return <SView col={"xs-12"} center style={{
        }}>
                {this.$item(this.data)}
        </SView>
    }
}
export default profile;