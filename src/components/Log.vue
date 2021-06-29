<template>
  <div>
    <div class="fun-bar">
      <button class="btn restartbtn" @click="restart">重新开始</button>
      <button class="btn stopbtn">停止记录</button>
      <button class="btn consolebtn">console</button>
      <button class="btn requestbtn">httpRequest</button>
      <button class="btn clearbtn">清空</button>
      <button class="btn downloadbtn">下载</button>
    </div>
    <div>
      <div class="title">设备信息</div>
    </div>
    <Box title="正常打印日志">
      <div class="item" v-for="(item,index) in consoleLog" :key="index">
        {{item.createTime}}
        内容：{{item.content || item.contentGroup}}
      </div>
    </Box>
    <Box title="异常打印日志">
      <div class="item" v-for="(item,index) in errorConsoleLog" :key="index">
        {{item.createTime}}
        内容：{{item.content || item.contentGroup}}
      </div>
    </Box>
    <Box title="DOM日志">
      <div class="item" v-for="(item,index) in eventLog" :key="index">
        {{item.createTime}}
        内容：{{item.content || item.contentGroup}}
        事件名称：{{item.eventName}}
        <button>查看dom元素</button>
      </div>
    </Box>
    <Box title="正常请求">
      <div class="item" v-for="(item,index) in HttpRequestLog" :key="index">
        {{item.createTime}}
        请求：{{item.requestTime}} {{item.request}}
        <!-- 响应：{{item.responseTime}} {{item.response}} -->
        <button>查看全部</button>
      </div>
    </Box>
    <Box title="异常请求">
      <div class="item" v-for="(item,index) in errorHttpRequestLog" :key="index">
        {{item.createTime}}
        请求：{{item.requestTime}} {{item.request}}
        <!-- 响应：{{item.responseTime}} {{item.response}} -->
        <button>查看全部</button>
      </div>
    </Box>
  </div>
</template>
<script>
import {LogType } from '@/lib/log'
import { mapState } from 'vuex'
import Box from './Box.vue'
export default {
  created(){
    console.log('生命周期钩子创建')
  },
  components: {
    Box
  },
  computed: {
    ...mapState(['logs']),
    consoleLog(){
      return this.logs[LogType.Console]
    },
    errorConsoleLog(){
      return this.logs[LogType.ErrorConsole]
    },
    HttpRequestLog(){
      return this.logs[LogType.HttpRequest]
    },
    errorHttpRequestLog(){
      return this.logs[LogType.ErrorHttpRequest]
    },
    eventLog(){
      return this.logs[LogType.Event]
    }
  },
  methods: {
    restart(){
      console.log('重新开始')
      this.test.name = 123
    }
  }
}
</script>
<style scoped>

</style>