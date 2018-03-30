

import * as React from 'react'
export  interface TabsProps {
    mode?: string,
    className?:Array<string>|string|object,
    tabActive?:number,
    onMount?:Function,
    onBeforeChange?:Function,
    onAfterChange?: Function,
    tabClassName?:Array<string>|string|object,
    tabPanelClassName?:Array<string>|string|object,
    tabPanelStyle?:React.CSSProperties,
    tabMenuClassName?:Array<string>|string|object,
    tabFontClassName?:Array<string>|string|object,
    tabBarUnderlineStyle?:Array<string>|string|object,
    tabBarActiveTextColor?:Array<string>|string|object,
    tabBarInactiveTextColor?:Array<string>|string|object,
    allShowMode?:boolean,
};

export  interface TabItemProps {
    title:string,
    ItemContainerClass?:Array<string>|string|object
};