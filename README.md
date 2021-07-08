# vue-intercept-log

## 功能 
### 

##### 统计用户行为(点击事件)与浏览器行为（浏览器信息，控制台打印，http请求，页面跳转，数据存储，请求异常，代码报错）
##### 按照时间顺序生成完整的操作记录存储在客户端

## 目的

##### 方便针对不方便调试的、以及偶发性问题进行分析

##### 可作为调试工具进行使用



## 安装
```
npm install vue-intercept-log
```

## 用法
### - 配置
```js
// main.js
import VueInterceptLog from 'vue-intercept-log'
...

Vue.use(VueInterceptLog,{
    isDefaultRecord: true,
    router: router,
    routePath: '/vue-intercept-log'
})
```

### 使用
router not exit
```js
<vue-intercept-log />
```

router exit

直接将当前地址栏的路由名称改为传如的routePath或'vue-intercept-log'

## 选项

| Key | Value | 类型 | 默认值 | 描述 | 是否必传 |
| --- | --- | --- | --- | --- | --- |
|isDefaultRecord|是否开始进行日志记录|Boolean|false|只有为true才开始记录| 否 |
| router | 路由实例 | Router | 无 | 用于向当前添加日志路由 | 否 |
| routePath | 路由path | String | 'vue-intercept-log' | 进入页面的路由访问路径 | 否 |

