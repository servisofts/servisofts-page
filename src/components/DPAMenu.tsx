import React from 'react';
import { SHr, SList2, SScrollView2, SScrollView3, SText, SView } from 'servisofts-component';
import { DPAMenuPropsType } from '../type';
import MenuItem from './MenuItem';

class DPAMenu extends React.Component<DPAMenuPropsType> {
    props: DPAMenuPropsType
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!this.props.data) return null
        if (this.props.data.length <= 0) return null

        if (this.props.type == "flex") {

            return (
                <SView col={"xs-12"}  >
                    {/* <SScrollView3 horizontal scroll={false} style={{}}> */}
                    <SHr />
                    <SList2
                        data={this.props.data} horizontal space={4}
                        render={obj => {
                            return <MenuItem {...obj} type={this.props.type} >{obj.children}</MenuItem>
                        }} />
                    {/* </SScrollView3> */}
                    <SHr />
                </SView>
            );
        }
        // if (this.props.type == "scroll") {
        return (
            <SView col={"xs-12"} height={50}>
                <SScrollView3 horizontal scroll={false} style={{}}>
                    {/* <SHr /> */}
                    <SList2
                        data={this.props.data} horizontal render={obj => {
                            return <MenuItem type={"scroll"} {...obj}  >{obj.children}</MenuItem>
                        }} />
                </SScrollView3>
                {/* <SHr /> */}
            </SView>
        );
        // }
    }
}
export default DPAMenu;