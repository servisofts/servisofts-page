
declare module "\*.json" {
    const content: any;
    export default content;
}


declare module "\*.json" {
    const content: any;
    export default content;
}
declare module '*.svg?inline' {
    const content: any
    export default content
}
declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;

    export default content;
}

declare module 'react-native-svg' {
    import Svg, { Line, Rect, Svg, Circle, ClipPath, Defs, Ellipse, ForeignObject, Image, G, LinearGradient, Mask, Marker, Path, Pattern, Polygon, Polyline, Stop, SvgAst, SvgCss, Text, TextPath, SvgXml } from 'react-native-svg';
    export { Svg, Line, Path, Rect, Circle, ClipPath, Defs, Ellipse, ForeignObject, Image, G, LinearGradient, Mask, Marker, Pattern, Polygon, Polyline, Stop, SvgAst, SvgCss, Text, TextPath, SvgXml };
    export default Svg;
}
// declare module 'servisofts-component' {
//     export { STable2, SForm, SInput, SDate, SButtom, SHr, SImage, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon } from 'servisofts-component';
// }
declare module 'servisofts-socket' {
    import SSocket from 'servisofts-socket';
    export default SSocket;
}

declare module 'react-redux' {
    export { connect } from 'react-redux';
}


// declare module 'servisofts-component' {
//     export { SButtom, SHr, SImage, SList, SLoad, SNavigation, SScrollView3, SScrollView2, SPage, SPopup, SText, STheme, SView, STable2, SDate, HeaderProps, SIcon, SInput, SForm } from 'servisofts-component';
// }
