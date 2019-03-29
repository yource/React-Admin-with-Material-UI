/**
 * id: 路由标识，根据此值查询字典表
 * page: 组件或者html文件
 */

import React from 'react';
import StoreIcon from '@material-ui/icons/StoreOutlined';
import MenuIcon from '@material-ui/icons/VerticalSplit';
import SystemIcon from '@material-ui/icons/Settings'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
// import ItemSize from './views/itemSize/itemSize'
import VersionTag from './views/versionTag/versionTag'
const router = [
    {
        id: "Restaurant",
        icon: <StoreIcon />,
        children: [{
            id: "Restaurant1",
            url: "company.html"
        }, {
            id: "Table",
            page: "tables.html"
        }]
    }, {
        id: "Menu",
        icon: <MenuIcon/>,
        children: [
        {
            id: "Menu1",
            page: "menu/index.html"
        }, 
        {
            id: "Modifier",
            page: "globalOptions.html"
        }, {
            id: "Item",
            page: "itemSize.html"
        }, {
            id: "Course",
            page: "course.html"
        },
        // {
        //     id: "TimeBase",
        //     page: "hourlyRate.html"
        // }, 
        {
            id: "Order",
            page: "orderTypeSetting.html"
        }]
    }, {
        id: "PriceAndPayment",
        icon: <AttachMoneyIcon />,
        children: [{
            id: "Tax",
            page: "tax.html"
        }]
    },
    {
        id: "System",
        icon: <SystemIcon/>,
        children: [ {
            id: "Printer",
            page: "printers.html"
        },{
            id: "Print",
            page: "printingSetup.html"
        },{
            id: "Language",
            page: "language.html"
        }, {
            id: "VersionTag",
            page: VersionTag
        }]
    }
]

const routerWithUrl = router.map((route)=>{
    route.children.map((item)=>{
        if (typeof item.page === "string") {
            item.url = "/oldpages/"+item.page.substring(0, item.page.length - 5)
        } else {
            item.url = "/"+item.id
        }
        return item;
    })
    return route
})
export default routerWithUrl;