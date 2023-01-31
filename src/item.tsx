import React from 'react'
import { SDate, SHr, SImage, SList, SLoad, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import PageAbstract, { PageAbstractConfigType } from './PageAbstract';

interface itemConfigType extends PageAbstractConfigType {
    row?: boolean
}

class item extends PageAbstract {
    row;
    props;
    // props:{ header:(this)=>any, footer:(this)=>any};
    data;
    constructor(props, config: itemConfigType) {

        super(props, {
            ...config,
            type: config.type ?? "component"
        }, "item");
        this.row = config.row ?? props.row;
    }
    $getData() {
        return this.props.data;
    }
    loadImage(pk) {
        var src = this.Parent.model?._get_image_download_path(SSocket.api, pk);
        if (!src) return null;

        var imageSize = { w: 60, h: 60 }
        switch (this.props?.itemType) {
            case "2":
                imageSize = { w: 40, h: 40 }
                break;
        }
        return <SView center row>
            <SView width={8} />
            <SView width={imageSize.w} height={imageSize.h} card style={{
                overflow: 'hidden',
            }}>
                <SImage src={src} style={{
                    position: "absolute",
                    resizeMode: "cover"
                }} />
                <SImage style={{
                    resizeMode: "cover"
                }} src={src + "?time=" + (new Date().getTime() / 1000)} enablePreview />
            </SView>
            <SView width={8} />
        </SView>
    }
    buildLabel({ label, value }) {
        // console.log(this.Parent)
        switch (this.props?.itemType) {
            case "2":
                return <SView col={"xs-12"}>
                    {/* <SHr /> */}
                    {/* <SText color={STheme.color.gray} fontSize={14} >{`${label}: `} </SText> */}
                    {/* <SHr height={4} /> */}
                    <SText col={"xs-12"} fontSize={14}>{value}</SText>
                </SView>
            case "1":
                return <SView col={"xs-12"} center>
                    <SHr />
                    <SText color={STheme.color.gray} fontSize={14} >{`${label}: `} </SText>
                    <SHr height={4} />
                    <SText flex fontSize={14}>{value}</SText>
                </SView>
            default:
                return <SView col={"xs-12"} row style={{
                    alignItems: 'center',
                    padding: 4
                }}>

                    {/* <SText color={STheme.color.gray} fontSize={12} >{`${label}: `} </SText> */}
                    <SText flex fontSize={14}>
                        <SText color={STheme.color.gray} fontSize={12} >{`${label}: `} </SText>
                        {value}
                    </SText>
                </SView>
        }

    }
    $renderContent() {
        var arr = Object.keys(this.Parent?.model?.Columns)
        return <SList data={arr}
            filter={(x) => { return this.excludes.indexOf(x) <= -1 }}
            space={0}
            render={(key) => {
                var col = this.Parent?.model?.Columns[key];
                var label = key;
                var value = this.data[key];
                if (col) {
                    label = col.label ?? key;
                    if (col.type == "timestamp") {
                        value = new SDate(value).toString('yyyy-MM-dd hh:mm')
                    }
                    if (col.type == "boolean") {
                        value = value ? "SI" : "NO"
                    }
                    if (col.type == "json") {
                        value = JSON.stringify(value);
                    }
                }
                return this.buildLabel({ label, value })
            }} />
    }
    renderContent() {
        this.data = this.$getData();
        if (!this.data) return this.$onLoading();
        return <SView col={"xs-12"} row={this.row} center={!this.row} >

            {this.loadImage(this.data[this.Parent.model.pk])}
            {!this.row ? <SHr /> : null}
            <SView flex center>
                {this.props?.header ? this.props.header(this) : null}
                {this.$renderContent()}
                {this.props?.footer ? this.props.footer(this) : null}
            </SView>
        </SView>
    }

    $render() {
        return (<SView card col={"xs-12"} style={{
            padding: 8
        }} onPress={this.props.onPress}>
            {this.renderContent()}
        </SView>);
    }
}
export default item;