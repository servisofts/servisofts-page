import React from 'react'
import PageAbstract, { PageAbstractConfigType } from './PageAbstract';

import { SButtom, SHr, SImage, SList, SList2, SLoad, SNavigation, SPage, SPopup, SText, STheme, SThread, SView } from 'servisofts-component';
import Item from './item';
import Enviroment from './Enviroment';
import { MenuItemPropsType } from './type';

interface listConfigType extends PageAbstractConfigType {

}

class list2 extends PageAbstract {
    onSelect
    constructor(props, config: listConfigType) {
        super(props, {
            type: "pageContainer",
            ...config,
        }, "list2");
        this.onSelect = SNavigation.getParam("onSelect");
        new SThread(50, "_ready_to_view", false).start(() => {
            this.setState({ _ready_to_view: true })
        })
    }


    $onSelect(obj) {
        if (this.onSelect) {
            if (!this.onSelect(obj)) {
                SNavigation.goBack();
            }
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
    $menu(): MenuItemPropsType[] {
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
        if (!this.state._ready_to_view) return <SLoad/>
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
export default list2;