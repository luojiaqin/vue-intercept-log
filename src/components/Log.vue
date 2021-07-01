<template>
  <div>
    <div class="fun-bar">
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
      <button class="btn closebtn" @click="startDebug">启动调试</button>
    </div>
    <section ref="logBody">
      <Box title="设备信息">
        设备名称{{navInfo.name}}
      </Box>
    <Box title="日志">
        <div  v-for="(item,index) in logs" :class="['item',item.logType]" :key="index">
          <button>查看全部</button>
          {{item.createTime}}
          {{item.content || item.contentGroup}}
          {{item.stack}}
          
        </div>
      </Box>
    </section>
    
  </div>
</template>
<script>
import {LogType } from '../lib/log'
const store = require('../store/index2')
import Box from './Box.vue'
export default {
  name: 'log',
  components: {
    Box
  },
  data(){
    return {
      logs: store.logs,
      navInfo: store.navigatorInfo,
      LogType
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
  color:yellow;
}
.errorHttpRequest{
  color: red;
}
.item{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>