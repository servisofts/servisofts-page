import React from 'react';
import { SHr, SText, SView } from 'servisofts-component';

class DPAContainer extends React.Component<any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let child: any = this.props.children
        return (
            <SView col={"xs-12"} center>
                <SView col={"xs-11.5 sm-10 md-8 lg-6 xl-4"} center >
                    {child}
                </SView>
            </SView>
        );
    }
}
export default DPAContainer;