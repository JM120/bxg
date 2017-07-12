
//配置别名
require.config({
    baseUrl:'/bxg/node_modules',
    paths: {
        jquery: './jquery/dist/jquery',
        cookie: './jquery.cookie/jquery.cookie',
        nprogress: './nprogress/nprogress',//进度条
        template: './art-template/lib/template-web',//模板引擎
        bootstrap: './bootstrap/dist/js/bootstrap',//框架
        datepicker: './bootstrap-datepicker/dist/js/bootstrap-datepicker',//日期插件
        zh: './bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',//汉子
        validate: './jquery-validation/dist/jquery.validate',//表单验证
        form: './jquery-form/dist/jquery.form.min'//表单请求ajax
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        zh:{
            deps:['jquery','bootstrap']
        }
    }
})