import Vue from 'vue'
const plugin = require('../../src/index.js')
const { Log, LogType } = require('../../src/lib/log');
import { mount } from '@vue/test-utils';
import LogComponent from '../../src/components/Log.vue';
const store = require('../../src/store/index2')

Vue.use(plugin, {
  isDefaultRecord: true
})


describe('Log.vue', () => {
  const wrapper = mount(LogComponent);
  describe('render', ()=>{
    it('render normal dom', () => {
      expect(wrapper.text()).to.include('设备信息');
    });

    it('浏览器信息', ()=>{
      const navName = window.navigator.userAgent
      expect(wrapper.find('.box').text()).to.include(navName)
    })
  
    it('render store dom' ,async ()=>{
      window.console.log('test')
      await Vue.nextTick()
      const boxWrapper = wrapper.findAll('.box').at(1)
      expect(boxWrapper.findAll('.item').length).to.equal(store.logs.length).to.not.equal(0)

    })
  })

  describe('Log.vue funbar', ()=>{
    it('清空按钮点击', ()=>{
      window.console.log('testtest')
      const btn = wrapper.find('.clearbtn')
      btn.trigger('click')
      expect(store.logs.length).to.equal(0)
    })
  
    it('重新开始按钮点击', ()=>{
      window.console.log('123')
      const button = wrapper.find('.restartbtn')
      button.trigger('click')
      window.console.log('234')
      expect(store.logs.length).to.equal(1)
      expect(store.logs[0].content).to.equal('234')
    })
  
    it('停止记录按钮点击', ()=>{
      const btn = wrapper.find('.stopbtn')
      btn.trigger('click')
      const len = store.logs.length
      window.console.log('test')
      expect(store.logs.length).to.equal(len)
    })
  
    describe('查看全部按钮', ()=>{
      it('console', async ()=>{
        const showAllFn = wrapper.vm.showAll
        const log = new Log('test', LogType.Console)
        await showAllFn(log)
        expect(wrapper.find('.mc').exists()).to.equal(true)

        expect(wrapper.findAll('.box').at(2).find('.title').text()).to.include(log.logType)
  
        const timeEl = wrapper.find('[label="触发时间："]')
        expect(timeEl.text()).to.equal(log.createTime)
  
        const contentEl = wrapper.find('[label="打印内容："]')
        expect(contentEl.text()).to.equal(log.content)
        expect(wrapper.find('[label="数据格式："]').exists()).to.equal(false)
  
        log.content = {name: 'test'}
        await showAllFn(log)
        expect(wrapper.find('[label="数据格式："]').exists()).to.equal(true)
      })
    })

  })

});


