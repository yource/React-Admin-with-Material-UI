// common中包含一些常用字段，会包含在在各语言模块中导出
import Common from './common'
import FormRules from './formRules'
import Dashboard from './dashboard';
import Layout from './layout';
import Restaurant from './restaurant';
import DeliveryArea from './deliveryArea'
import Modifier from './modifier'
import ItemSize from './itemSize'
import VersionTag from './versionTag'

const localeDefault = "en";
const locale = window.storage.getItem("locale") || localeDefault;
function getLocale(locales, notMix) {
    var lan = notMix ? Object.assign({}, locales) : Object.assign({}, Common, locales);
    Object.keys(lan).forEach(function (key) {
        lan[key] = lan[key][locale] || lan[key][locale.replace(/-/i, "_")] || lan[key][locale.replace(/_/i, "-")] || lan[key][localeDefault] || "";
    });
    return lan;
}

export const common = getLocale(Common, true);
export const dashboard = getLocale(Dashboard);
export const layout = getLocale(Layout);
export const restaurant = getLocale(Restaurant);
export const deliveryArea = getLocale(DeliveryArea);
export const modifier = getLocale(Modifier)
export const itemSize = getLocale(ItemSize)
export const versionTag = getLocale(VersionTag)
export const fromRules = getLocale(FormRules)