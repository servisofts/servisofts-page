import React from 'react'
import { SNavigation, SLoad, SPopup, SPage, SView, SHr, SText, SThread } from 'servisofts-component';
import DPAContainer from './components/DPAContainer';
import DPAMenu from './components/DPAMenu';
import Enviroment from './Enviroment';
import { DPAMenuType, MenuItemPropsType } from './type';


export type ParentType = {
    name: String,
    path?: String,
    model?: any
}
export type PageAbstractConfigType = {
    title?: String,
    isPage?: boolean,
    Parent?: ParentType,
    item?: any,
    limit?: number,
    itemType?: "default" | "1" | "2",
    menuType?: DPAMenuType,
    excludes?: String[],
    params?: String[]
    defaultParams?: any;
    type?: "page" | "pageContainer" | "component" | "componentTitle" | "container",
    onRefresh?: (resolve: Function) => any

}

abstract class PageAbstract extends React.Component {
    title; Parent; excludes; item; params; defaultParams; isPage; type; itemType;
    $params; limit;
    state;
    config: PageAbstractConfigType;

    constructor(props, config: PageAbstractConfigType, pageType: String) {
        super(props);
        this.state = {}
        this.config = config;
        const { title, Parent, excludes, item, params, defaultParams, type, itemType, limit } = config;
        this.type = type ?? "component"
        this.title = title;
        if (!this.title) {
            if (Parent?.name) {
                this.title = `${Enviroment.pages[pageType + ""] ?? pageType} ${Parent?.name}`;
            }
        }

        this.itemType = itemType;
        if (type == "page" || type == "pageContainer") {
            new SThread(50, "_ready_to_view", false).start(() => {
                this.setState({ _ready_to_view: true })
            })
        }

        this.limit = limit;
        this.Parent = Parent ?? props.Parent;
        this.excludes = excludes ?? props.excludes ?? [];
        this.item = item ?? props.item;
        this.params = params ?? props.params ?? []
        this.defaultParams = defaultParams ?? {}
        this.$params = {};
        this._validateParams();

    }

    _validateParams() {
        var parameters = {};
        var valid = true;
        this.params.map(key => {
            const last = key.charAt(key.length - 1);
            var required = true;
            if (last == "?") {
                key = key.slice(0, -1);
                required = false;
            }
            var param = SNavigation.getParam(key) ?? this.props[key];
            if (!param) {
                param = this.defaultParams[key];
            }
            if (!param && required) {
                valid = false;
            } else {
                parameters[key] = param;
            }
        })
        if (!valid) {
            SNavigation.goBack();
        }
        this.$params = parameters;
        return valid;
    }
    // $onRefresh: (resolve) => any = null

    abstract $render();

    $header() {
        return null;
    }
    $menu(): MenuItemPropsType[] {
        var arr: MenuItemPropsType[] = [];
        return arr;
    }
    $footer() {
        return null;
    }
    $allowAccess() {
        return "exito";
    }
    $onLoading() {
        return <SLoad />
    }
    $getData() {
        return null;
    }
    render() {
        if (this.$allowAccess() == "cargando") {
            return this.$onLoading();
        }
        if (!this.$allowAccess()) {
            SPopup.alert("Access denied to page " + this.Parent.name + " " + this.title)
            SNavigation.goBack();
            return null;
        }


        switch (this.type) {
            case "page":
                // if (!this.state._ready_to_view) return <SView col={"xs-12"} height center><SLoad /></SView>
                return <SPage title={this.title} disableScroll onRefresh={this.config.onRefresh} header={<>
                    {this.$header()}
                    <DPAMenu data={this.$menu()} type={this.config.menuType} />
                </>}>
                    {(!this.state._ready_to_view) ? <SLoad /> : <>
                        {this.$render()}
                        {this.$footer()}
                    </>}
                </SPage>
            case "pageContainer":
                // if (!this.state._ready_to_view) return <SView col={"xs-12"} height center><SLoad /></SView>
                return <SPage title={this.title} onRefresh={this.config.onRefresh} header={<DPAContainer>
                    {this.$header()}
                    <DPAMenu data={this.$menu()} type={this.config.menuType} />
                </DPAContainer>
                }>
                    {(!this.state._ready_to_view) ? <SLoad /> : <DPAContainer >
                        {this.$render()}
                        {this.$footer()}
                    </DPAContainer>}
                    <SHr height={100} />
                </SPage >
            case "container":
                return <DPAContainer >
                    {this.$header()}
                    <DPAMenu data={this.$menu()} type={this.config.menuType} />
                    {this.$render()}
                    {this.$footer()}
                    <SHr height={100} />
                </DPAContainer>
            case "component":
                return <SView col={"xs-12"}>
                    {this.$header()}
                    <DPAMenu data={this.$menu()} type={this.config.menuType} />
                    {this.$render()}
                    {this.$footer()}
                </SView>
            case "componentTitle":
                return <SView col={"xs-12"}>
                    <SHr />
                    <SText bold fontSize={16}>{this.title}</SText>
                    <SHr />
                    {this.$header()}
                    <DPAMenu data={this.$menu()} type={this.config.menuType} />
                    {this.$render()}
                    {this.$footer()}
                </SView>
        }
        return this.$render();
    }
}
export default PageAbstract