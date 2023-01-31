import React from 'react'
import PageAbstract, { PageAbstractConfigType } from './PageAbstract';

import { SButtom, SHr, SImage, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Item from './item';
import Enviroment from './Enviroment';

interface listConfigType extends PageAbstractConfigType {

}

class list extends PageAbstract {
    onSelect
    constructor(props, config: listConfigType) {
        super(props, {
            type: "pageContainer",
            ...config,
        }, "list");
        this.onSelect = SNavigation.getParam("onSelect");
    }


    $onSelect(obj) {
        if (this.onSelect) {
            this.onSelect(obj);
            SNavigation.goBack();
            return;
        }
        SNavigation.navigate(this.Parent?.path + "/profile", { pk: obj[this.Parent.model.pk] })
    }
    $item(obj, opt?: { header?: (ref: Item) => any, footer?: (ref: Item) => any }) {
        const ItemNew = this.item;
        if (ItemNew) {
            return <ItemNew data={obj} header={opt?.header} footer={opt?.footer} itemType={this.itemType} Parent={this.Parent} excludes={this.excludes} row onPress={() => {
                this.$onSelect(obj)
            }} />
        }
        return <Item data={obj} header={opt?.header} footer={opt?.footer} itemType={this.itemType} Parent={this.Parent} excludes={this.excludes} row onPress={() => {
            this.$onSelect(obj)
        }} />
    }
    $filter(data) {
        return true;
    }

    onTable(params?) {
        SNavigation.navigate(this.Parent?.path + "/table", params);
    }
    onNew(params?) {
        SNavigation.navigate(this.Parent?.path + "/new", params);
    }

    $allowNew() {
        return false;
    }
    $allowTable() {
        return false;
    }
    $menu() {
        var arr = [];
        if (this.$allowNew()) {
            arr.push({ label: Enviroment.buttoms.new, onPress: () => this.onNew(this.$params) });
        }
        if (this.$allowTable()) {
            arr.push({ label: Enviroment.buttoms.table, onPress: () => this.onTable(this.$params) });
        }
        return arr;
    }

    $order() {
        return null
    }
    $render() {
        var data = this.$getData();
        if (!data) return this.$onLoading()
        return (<SList
            buscador
            order={this.$order()}
            limit={10}
            data={data ?? {}}
            filter={this.$filter.bind(this)}
            render={obj => { return this.$item(obj) }}
        />)
    }
}
export default list;