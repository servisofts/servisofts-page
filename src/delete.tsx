import React from 'react'
import PageAbstract, { PageAbstractConfigType } from './PageAbstract';
import { SButtom, SHr, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
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
        }, "delete");
        this.pk = this.$params["pk"];
    }

    $onDelete() {
        return null;
    }
    $render() {
        this.data = this.$getData();
        if (!this.data) return <SLoad />;
        return <SView center>
            <SHr height={30} />
            <SText center fontSize={18}>Esta seguro que desea eliminar el elemento {this.Parent.name}?</SText>
            <SHr height={20} />
            <SText center fontSize={12} color={STheme.color.gray}>Por su seguridad esta accion quedara registrada.</SText>
            <SHr height={30} />
            <SButtom variant={"confirm"} type={"danger"}
                onPress={() => {
                    this.$onDelete();
                }}>{Enviroment.buttoms.delete}</SButtom>
            {/* <SText>{JSON.stringify(this.data)}</SText> */}
        </SView>
    }
}
export default index;