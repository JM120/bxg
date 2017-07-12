//获取地址栏的参数，并把他转为对象
define(function(){
    //先获取地址栏传递的参数=> ?name=1&age=2
    var search = window.location.search
    
    //获取？号后面的字符串 => name=1&age=2
    var query = search.split('?')[1] || ''

    // ['name=1', 'age=2']  =>  {name:1, age:2}
    var arr = query.split('&') || ''
    var obj = {}
    arr.forEach(function(v){
        var key = v.split('=')[0];//name
        var value = v.split('=')[1];//1
        obj[key] = value
    })
    return obj
})