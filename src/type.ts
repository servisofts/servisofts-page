export type SPagePropsType = {

}

export type DPAMenuType = "scroll" | "flex";
export type DPAMenuPropsType = {
    data: MenuItemPropsType[],
    type: DPAMenuType
}

export type MenuItemPropsType = {
    icon?: any,
    label?: string,
    type: DPAMenuType,
    onPress?: () => any,
    children?: any,
}