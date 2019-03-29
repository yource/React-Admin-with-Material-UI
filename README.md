# Menusifu Cloud Configuration 
  
基于 React + ReactRouter + Redux + Meterial UI。

``` bash

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run start

# build for production with minification
npm run build

```

### Files Structure

├── build                           生产环境编译后的文件目录  
├── public  
│   ├── index.html                      主界面  
│   ├── login.html                      登陆页面  
├── src  
│   ├── index.js                         入口组件  
│   ├── index                            入口组件的资源  
│   │   └── index.scss                        包含全局用到的css样式  
│   │   └── layout.js                         布局组件  
│   │   └── PageFrame.js                      用来接入老html文件的组件  
│   │   └── style.js                          覆盖material样式  
│   ├── router.js                        路由文件  
│   ├── i18n                             国际化  
│   │   └── index.js                          统一导出  
│   │   └── common.js                         公共字段  
│   │   └── ...others                         各模块的字段  
│   ├── reducer                          redux相关  
│   ├── static                           静态资源  
│   │   └── css                               css相关文件  
│   │       └── thmem.js                           定制Material主题      
│   │       └── ...others                          其他css  
│   │   └── images                            图片  
│   ├── utils                           公共自定义工具方法  
│   │   └── axios.js                          axios实例，ajax方法  
│   │   └── date.js                           对日期格式进行转化  
│   │   └── empty.js                          列表、表格空白时显示的组件  
│   │   └── formRules.js                      表单校验规则  
│   │   └── mask.js                           loading遮罩  
│   ├── views                           页面目录  
├── server                          Node运行环境，供自动化构建使用  

### What can we learn

1. form表单校验
2. redux和ajax的使用
3. 国际化
4. Material定制主题和覆盖样式
5. react-router按路由打包

### Reference Link

[Material UI](https://material-ui.com/getting-started/installation/)

[Material Icons](https://material.io/tools/icons/?style=baseline)

[notistack](https://github.com/iamhosseindhv/notistack) (Plugin for Material Snackbar)
