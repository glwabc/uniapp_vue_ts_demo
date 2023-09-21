/**
 * 添加拦截器:
 *   拦截 request 请求
 *   拦截 uploadFile 文件上传
 *
 * TODO:
 *   1. 非 http 开头需拼接地址
 *   2. 请求超时
 *   3. 添加小程序端请求头标识
 *   4. 添加 token 请求头标识
 */

import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时, 默认 60s  默认单位 毫秒
    options.timeout = 10000
    // 3. 添加小程序端请求头标识
    options.header = {
      ...options.header, // 先保留原先的数据
      // 三个点（…）真名叫扩展运算符，是在ES6中新增加的内容，它可以在函数调用/数组构造时，将数组表达式
      // 或者string在语法层面展开；还可以在构造字面量对象时将对象表达式按照key-value的方式展开。
      // // 数组
      // var number = [1,2,3,4,5,6]
      // console.log(...number) //1 2 3 4 5 6
      // //对象
      // var man = {name:'chuichui',height:176}
      // console.log({...man}) / {name:'chuichui',height:176}
      // //数组的复制
      // var arr1 = ['hello']
      // var arr2 =[...arr1]
      // arr2 // ['hello']
      // //对象的复制
      // var obj1 = {name:'chuichui'}
      // var obj2 ={...arr}
      // ob12 //  {name:'chuichui'}
      // //数组的合并
      // var arr1 = ['hello']
      // var arr2 =['chuichui']
      // var mergeArr = [...arr1,...arr2]
      // mergeArr  // ['hello','chuichui']
      // // 对象分合并
      // var obj1 = {name:'chuichui'}
      // var obj2 = {height:176}
      // var mergeObj = {...obj1,...obj2}
      // mergeObj // {name: "chuichui", height: 176}
      // // 字符串转数组
      // var arr1 = [...'hello']
      // arr1 // ["h", "e", "l", "l", "o"]
      // // 函数传参
      // // 可以和正常的函数相结合
      // function f(v,w,x,y,z){ }
      // var args = [2,3]
      // f(1,...args,4,...[5])
      // // 数组中的元素迭代为函数参数时
      // function f(x,y,z){}
      // var args = [1,2,3]
      // f(...args)
      //
      // 三点是es6中出现的扩展运算符。作用是遍历当前使用的对象能够访问到的所有属性，并将属性放入当前对象中。
      // 这个放入当前对象的操作是会影响到被复制的对象的，因为…这个操作是一种引用，并不是直接将数据放入当前的对象里
      // var a = {"a":"a","b":"b"}
      // var b = {...a} //{"a":"a","b":"b"}
      // var c = {...a,"b":"b1"} //{"a":"a","b":"b1"}
      // var d = {...a,...{"a":"a1","b":"b1"}} //{"a":"a1","b":"b1"}
      //
      // var a = {1:1,2:2}
      // var b = {...a} //此时b为{1:1,2:2}
      // b.2=3
      // console.log(a) //{1:1,2:3}
      // console.log(b) //{1:1,2:3}

      'source-client': 'miniapp',
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    // JavaScript中?.主要有两种使用方式：
    // 1.条件式属性访问
    // 2.条件式调用
    // 它的特点主要就两个字：短路。
    // a?.b
    // 使用普通的属性访问表达式时，如果.或[]求值为 null 或 undefined，会报TypeError。
    // 如果使用?.或者?.[]可以防止这种错误发生。
    // 例如a?.b，如果a本身是null或者未定义，那么返回的结果是undefined而不是报错，因为a本身没有值，
    // 所以在这里短路，不会再去尝试访问b。而如果a不是null 或 undefined，那么返回的结果就是a.b的值，
    // 此时如果a没有属性b，那么依然返回undefined。
    // let a = { b: null }
    // a.b?.c.d   //=> undefined
    // 这里a和b都是有过定义的，常规的a.b的值会是null，但是a.b.c会报错。我们使用了?.过后，a.b?.c的值
    // 为undefined不会报错，a.b?.c.d同样是undefined不会报错，因为在c处已经短路，不会继续访问下去。
    // 但如果是(a.b?.c).d则会抛出TypeError。
    // 如果.?左侧的子表达式的值为null 或 undefined，整个表达式立即求值为undefined，不会再进一步尝试
    // 访问属性，这就是可选链接的重要特征。
    // 条件式调用
    // 可以使用?.()来调用函数，如果?左侧的表达式求值为null 或 undefined，则整个表达式求值为undefined，不会报错。
    // 若要写一个包含可选函数参数的方法，通常要先判断是否定义该参数：
    // function square(x, log){   //第二个参数是一个可选的函数
    //     if(log){               //如果定义了可选函数就调用这个函数
    //         log(x)
    //     }
    //     return x * x
    // }
    // 使用条件式调用可以简化写法：
    // function square(x, log){
    //     log?.(x)
    //     return x * x
    // }
    // 使用?.()来调用函数也是短路操作，如果?.左侧的值是null 或 undefined，()中的表达式不会执行。
    // 几种写法：
    // o.m()    //常规访问常规调用
    // o?.m()   //条件式属性访问，常规调用
    // o.m?.()  //常规属性访问，条件式调用
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
