import React from 'react';
import { SHr, SList, SText, SView } from 'servisofts-component';
import MenuItem from './MenuItem';

class DPAMenu extends React.Component {
    props: any
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!this.props.data) return null
        if (this.props.data.length <= 0) return null
        return (
            <SView col={"xs-12"}>
                <SList
                    data={this.props.data} horizontal render={obj => {
                        return <MenuItem icon={obj.icon} onPress={obj.onPress} >{obj.label}</MenuItem>
                    }} />
                <SHr />
            </SView>
        );
    }
}
export default DPAMenu;