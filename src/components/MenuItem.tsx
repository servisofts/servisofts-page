import React, { Component } from 'react';
import { SIcon, SText, STheme, SView } from 'servisofts-component';

class MenuItem extends Component {
    props: any;
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getIcon() {
        if (!this.props.icon) return null;
        return <>
            <SIcon name={this.props.icon} width={12} height={12} fill={STheme.color.text} />
            <SView width={4} />
        </>
    }
    render() {
        return (
            <SView style={{
                padding: 8,
                borderRadius: 4,
                backgroundColor: STheme.color.card,
            }} onPress={this.props.onPress} row center>
                {this.getIcon()}
                <SText >{this.props.children}</SText>
            </SView>
        );
    }
}
export default MenuItem;