/**
 * 对于多处用到的数据，可以存入redux中
 * 子页面需要按照原有逻辑去请求数据，得到返回后修改redux store
 * 避免频繁显示loading
 */
import { combineReducers } from 'redux'
import { createStore } from 'redux'
import mask from './mask'
import itemSize from './itemSize'
import versionTag from './versionTag'

const reducer = combineReducers({
    mask,
    itemSize,
    versionTag
})
const store = createStore(reducer);

export default store;
