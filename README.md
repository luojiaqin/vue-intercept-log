# vue-intercept-log

## Install
```
npm install vue-intercept-log
```

## Usage
### - Setting
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

### Using
router not exit
```js
<vue-intercept-log />
```

router exit
```js
localhost:{port}/vue-intercept-log // routerPath not exit
or
localhost:{port}/{routePath} // routerPath exit
```

## Options

| Key | Value | 类型 | 默认值 | 描述 | 是否必传 |
| --- | --- | --- | --- | --- | --- |
|isDefaultRecord|是否开始进行日志记录|Boolean|false|只有为true才开始记录| 否 |
| router | 路由实例 | Router | 无 | 用于向当前添加日志路由 | 否 |
| routePath | 路由path | String | 'vue-intercept-log' | 进入页面的路由访问路径 | 否 |
