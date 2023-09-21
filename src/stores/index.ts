import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 一，import（模块、文件）引入方式
// 1 引入第三方插件
// import echarts from 'echarts'
// 2.导入 css文件
// import 'iview/dist/styles/iview.css';
// 如果是在.vue文件中那么在外面套个style
// <style>
//   @import './test.css';
// </style>
// 3.导入组件
// import name1 from './name1'
// import name2 from './name2'
//   components:{
//      name1,
//      name2,
//   },
// 4．import '@…'的语句
// @ 等价于 /src 这个目录，避免写麻烦又易错的相对路径
// 5.引入工具类
// 一种是引入单个方法
// import {axiosfetch} from './util';
// 第二种  导入成组的方法
// import * as tools from './libs/tools'

// 二，export,import和export default的关系
// export 与import是es6中新增模块功能最主要的两个命令。
// 1.export与export default均可用于导出常量、函数、文件、模块等
// 2.在一个文件或模块中，export、import可以有多个，export default仅有一个
// 3.通过export方式导出，在导入时要加{ }，export default则不需要{ }

// 一、import引入文件路径
// import引入一个依赖包，不需要相对路径。如：import  app from ‘app’;
// import 引入一个自己写的js文件，是需要相对路径的。如：import app from ‘./app.js’;

// 二、import引入文件变量名
// 1、使用export抛出的变量需要用{}进行import
// //a.js
// export const str = "blablabla~";
// export function log(sth) {
//       return sth;
//     }
//
// 对应的导入方式：
// //b.js
// import { str, log as _log } from 'a'; //也可以分开写两次，导入的时候带花括号。还可以用as重命名

// 2、使用export default抛出的变量，只需要自己起一个名字就行：
// //a.js :
// var obj = { name: ‘example’ };
// export default obj;
//
// //b.js:
// import newNname from ‘./a.js’;   // newNname 是自己随便取的名字，这里可以随便命名
// console.log(newNname.name);       // example;

// 总结：
// 其中export和export default最大的区别就是export不限变量数 可以一直写，
// 而export default  只输出一次 而且 export出的变量想要使用必须使用{}来盛放，
// 而export default 不需要 只要import任意一个名字来接收对象即可。

// 三，部分导入和部分导出，全部导入和全部导出
// 一、部分导出和部分导入
// 部分导出和部分导入的优势，当资源比较大时建使用部分导出，这样一来使用者可以使用部分导入来减少资源体积，
// 比如element - ui官方的就推荐使用部分导入来减少项目体积，因为element - ui是一个十分庞大的框架，如果
// 我们只用到其中的一部分组件， 那么只将用到的组件导入就可以了。
//
// //部分导出
// //A.js
//    export function helloWorld(){
//     conselo.log("Hello World");
//    }
//    export function test(){
//     conselo.log("this's test function");
//    }

// //部分导入
// //B.js
//    import {helloWorld} from "./A.js" //只导入A.js中的helloWorld方法
//    helloWorld(); //执行utils.js中的helloWorld方法
//
//    import * as _A from "./A.js" //导入全部的资源，_A为别名，在调用时使用
//    _A.helloWorld(); //执行A.js中的helloWorld方法
//    _A.test(); //执行A.js中的test方法

// 二、全部导出和全部导入
// 如果使用全部导出，那么使用者在导入时则必须全部导入，推荐在写方法库时使用部分导出，
// 从而将全部导入或者部分导入的权力留给使用者。
// 需要注意的是:一个js文件中可以有多个export，但只能有一个export default
//    //全部导出  A.js
//    var helloWorld=function(){
//     conselo.log("Hello World");
//    }
//    var test=function(){
//     conselo.log("this's test function");
//    }
//    export default{
//     helloWorld,
//     test
//    }

//    //全部导入  B.js
//    import A from "./A.js"
//    A.helloWorld();
//    A.test();

// 在 Vue 中，import 语句的文件后缀可以省略，例如
//      import Foo from './Foo'
// 如果省略了文件后缀，Vue 会尝试按照以下顺序搜索文件：.js、.jsx、.ts 和 .tsx。如果都找不到文件，则会抛出一个异常。
//
// 在 Vue 中，import 语句可以用于加载一个文件夹，例如：
//      import components from './components'
// 上述代码将会加载位于 ./components/index.js 文件中的模块。如果 ./components 文件夹中没有 index.js 文件，则会抛出一个异常。
//
// 另外，Vue 还支持通过在文件夹中添加 package.json 文件来配置加载方式。例如：
//      {
//        "main": "CustomComponent.vue"
//      }
// 上述代码会将 ./CustomComponent.vue 文件作为该文件夹的入口文件。这样，我们就可以使用以下方式来加载该文件夹：
//      import CustomComponent from './components'

// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

// 默认导出，给 main.ts 使用
export default pinia

// 模块统一导出
export * from './modules/member'
