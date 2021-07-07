<template>
  <div>
    <div class="fun-bar" :class="{blur:showMc}">
      <button class="btn restartbtn" @click="restart">重新开始</button>
      <button class="btn stopbtn" @click="stop">停止记录</button>
      <button class="btn clearbtn" @click="clear">清空</button>
      <button class="btn downloadbtn" @click="download">下载</button>

      <button class="btn filterbtn" @click="filterLog('')">全部</button>
      <button class="btn filterbtn" @click="filterLog(LogType.Console)">console</button>
      <button class="btn filterbtn" @click="filterLog(LogType.ErrorConsole)">Errorconsole</button>
      <button class="btn filterbtn" @click="filterLog(LogType.HttpRequest)">httpRequest</button>
      <button class="btn filterbtn" @click="filterLog(LogType.ErrorHttpRequest)">ErrorHttpRequest</button>
      <button class="btn filterbtn" @click="filterLog(LogType.EventLog)">Event</button>

      <button class="btn closebtn" @click="closeDebug">关闭调试</button>
      <button class="btn launchbtn" @click="startDebug">启动调试</button>
    </div>
    <section :class="{blur:showMc}" ref="logBody">
      <Box title="设备信息">
        设备名称{{navInfo.name}}
      </Box>
      <Box title="日志">
        <div  v-for="(item,index) in logs" :class="['item',item.logType]" :key="index">
          <button @click="showAll(item)">查看全部</button>
          {{item.createTime}}
          {{item.content || item.contentGroup}}
          <label v-if="item.logType === LogType.HttpRequest || item.logType === LogType.ErrorHttpRequest">
            {{item.request}}
            </label>
          {{item.stack}}
          
        </div>
      </Box>
      
    </section>
    <div v-if="showMc" class="mc" @click="showMc = false">
        <Box :title="currentLog.logType" class="mc-box">
          <div class="mc-body" v-if="currentLog.logType === LogType.EventLog">
            <div class="mc-item" label="触发时间：">{{currentLog.createTime}}</div>
            <div class="mc-item" label="事件触发方式：">点击</div>
            <div class="mc-item" label="元素名称：">{{currentLog.dom.nodeName}}</div>
            <div class="mc-item" label="元素id：">{{currentLog.dom.id}}</div>
            <div class="mc-item" label="元素class：">{{getClass(currentLog.dom.classList)}}</div>
            <div class="mc-item" label="元素内容：">{{currentLog.dom.innerText}}</div>
          </div>
          <div class="mc-body" v-if="currentLog.logType === LogType.HttpRequest || currentLog.logType === LogType.ErrorHttpRequest">
            <div class="mc-item" label="触发时间：">{{currentLog.createTime}}</div>
            <div class="mc-item" label="请求时间：">{{currentLog.requestTime}}</div>
            <div class="mc-item" label="请求方式：">{{currentLog.request.method}}</div>
            <div class="mc-item" label="请求url：">{{currentLog.request.url}}</div>
            <div class="mc-item" label="是否异步：">{{currentLog.request.isAsync}}</div>
            <div class="mc-item" label="响应时间：">{{currentLog.responseTime}}</div>
            <div class="mc-item" label="响应状态：">{{currentLog.response.status}}</div>
            <div class="mc-item" label="响应数据：">{{currentLog.response.response}}</div>
          </div>
          <div class="mc-body" v-if="currentLog.logType === LogType.Console || currentLog.logType === LogType.ErrorConsole">
            <div class="mc-item" label="触发时间：">{{currentLog.createTime}}</div>
            <div class="mc-item" label="打印内容：">{{currentLog}}</div>
            <Console :conData="currentLog.content"></Console>
          </div>
        </Box>
      </div>
  </div>
</template>
<script>
import {LogType } from '../lib/log'
const store = require('../store/index2')
import Box from './Box.vue'
import Console from './Console.vue'
export default {
  name: 'log',
  components: {
    Box,
    Console
  },
  data(){
    return {
      logs: store.logs,
      navInfo: store.navigatorInfo,
      LogType,
      showMc: false,
      currentLog: {}
    }
  },
  methods: {
    filterLog(logType){
      if(logType){
        this.logs = store.logs.filter(log=>log.logType === logType)
      }else{
        this.logs = store.logs
      }
    },
    showAll(item){
      this.showMc = true
      this.currentLog = item
    },
    getClass(classList){
      let str = ''
      for(let i=0;i<classList.length;i++){
        str += '.'+classList[i]
      }
      return str
    },
    restart(){
      this.$interceptLog.clear()
      this.$interceptLog.start()
      
    },
    download(){
      const el = this.$refs.logBody
      this.$interceptLog.download(el)
    },
    stop(){
      this.$interceptLog.stop()
    },
    clear(){
      this.$interceptLog.clear()
      this.$emit('click')
    },
    closeDebug(){
      this.$interceptLog.stop()
    },
    startDebug(){

    }
  }
}
</script>
<style scoped>
.console{
  color: blue
}
.errorConsole{
  color: red;
}
.event{
  color: green;
}
.httpRequest{
  color:darkorange;
}
.errorHttpRequest{
  color: red;
}
.fun-bar{
  display: flex;
}
.downloadbtn{
  margin-right: auto;
}
.closebtn{
  margin-left: auto;
}
.item{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.mc{
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.mc-box{
  width: 500px;
  height: 60%;
  background: #fff;
}
.blur{
  filter: blur(3px);
}
.mc-item::before{
  content: attr(label);
  color: #999;
}
</style>