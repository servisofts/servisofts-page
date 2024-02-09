import React, { Component } from 'react';
import { View } from 'react-native'
import { SIcon, SText, STheme, SView } from 'servisofts-component';
import { MenuItemPropsType } from '../type';

class MenuItem extends Component<MenuItemPropsType> {
    props: MenuItemPropsType;
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getIcon() {
        if (!this.props.icon) return null;
        return <>
            <SView width={8} />
            <SIcon name={this.props.icon} width={12} height={12} fill={STheme.color.text} />
            <SView width={4} />
        </>
    }

    renderContent() {
        if (!this.props.children) return <SText style={{ padding: 4 }} >{this.props.label}</SText>
        return this.props.children;
    }
    render() {
        return (
            <SView style={{
                borderRadius: 4,
                backgroundColor: STheme.color.card,
                overflow: "hidden",
                // width:100,
                height: 40,
                ...(this.props.type == "flex" ? {
                    marginTop: 4,
                } : {}),
                ...(this.props.type == "scroll" ? {
                    // height:
                } : {}),
                paddingStart: 4,
                paddingEnd: 4,
            }} onPress={this.props.onPress} center >
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                }}>
                    {/* <SView width={4} /> */}
                    {/* <SView width={15} center style={{
                        paddingStart: 8
                    }}> */}
                    {this.getIcon()}
                    {/* </SView> */}
                    {this.renderContent()}
                </View>
            </SView>
        );
    }
}
export default MenuItem;