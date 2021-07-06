# vue-intercept-log

## 功能 
###### 根据时间生成完整的操作记录

* 统计console.log 打印内容

* 统计异常打印以及报错信息

* 统计按钮点击

* 统计接口请求



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

