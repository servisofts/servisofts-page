import React from 'react'
import { SButtom, SHr, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import PageAbstract, { PageAbstractConfigType } from './PageAbstract';
import Enviroment from './Enviroment';
interface deleteConfigType extends PageAbstractConfigType {

}
class index extends PageAbstract {
    pk;
    data;
    constructor(props, config: deleteConfigType) {
        config.params = ["pk", ...config.params ?? []];
        super(props, {
            type: "pageContainer",
            ...config,
        }, "restore");
        this.pk = this.$params["pk"];
    }

    $onRestore() {
        return null;
    }
    $render() {
        this.data = this.$getData();
        if (!this.data) return <SLoad />;
        return <SView center>
            <SHr height={30} />
            <SText center fontSize={18}>Esta seguro que desea recuperar el elemento {this.Parent.name}?</SText>
            <SHr height={20} />
            <SText center fontSize={12} color={STheme.color.gray}>Por su seguridad esta accion quedara registrada.</SText>
            <SHr height={30} />
            <SButtom variant={"confirm"} type={"outline"}
                onPress={() => {
                    this.$onRestore();
                }}>{Enviroment.buttoms.restore}</SButtom>
            {/* <SText>{JSON.stringify(this.data)}</SText> */}
        </SView>
    }
}
export default index;