
const consolePlatform = require('../../src/lib/consolePlatform.js')
const store = require('../../src/store/index2.js')
const { LogType } = require('../../src/lib/log')
import Vue from 'vue'

describe('consolePlatform.js', () => {
  store.outerVue = Vue
  store.outWindow = window
  consolePlatform.init()

  it('get console Log when console.log 基础类型', () => {
    store.logs = []
    window.console.log(1)
    expect(store.logs[0].content).to.equal(1);
    expect(store.logs[0].logType).to.equal(LogType.Console)
  });

  it('get console Log when console.log 多个参数', () => {
    store.logs = []
    const obj = {name: 'ljq'}
    window.console.log(1, obj)
    expect(store.logs[0].content).to.deep.include([1,obj]);
  });

  it('get console Log when console.log 对象', ()=>{
    store.logs = []
    const obj = {name: 'ljq'}
    window.console.log(obj)
    expect(store.logs[0].content).to.equal(obj)
  })

  // ? 错误信息捕捉
  // it('get console Log when error', ()=>{
  //   store.logs = []
  //   //  window.eval(window.ljq.name.test = 123)
  //   expect(store.logs[0]).to.not.equal(undefined)
  //   expect(store.logs[0].content).to.equal('this is an error')
  //   expect(store.logs[0].logType).to.equal(LogType.ErrorConsole)
  // })
});
