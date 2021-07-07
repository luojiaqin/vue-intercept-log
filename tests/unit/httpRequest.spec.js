const chai = require('chai')
const expect = chai.expect
const { JSDOM } = require('jsdom')
const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)
const store = require('../../src/store/index2')
const httpRequest = require('../../src/lib/httpRequest')
const { LogType, Log } = require('../../src/lib/log')


describe('httpRequest.js ', ()=>{
    store.outWindow = window
    
    httpRequest.init()

    it('normal httpRequest',(done)=>{
        store.logs = []
        const request = new window.XMLHttpRequest()
        request.open('POST','https://api.apiopen.top/getWangYiNews')
        const sendData = { page: 1, count: 5 }
        request.send(sendData)
        request.onload = function(e){
            const httpLog = store.logs[0]
            expect(httpLog).to.not.equal(undefined)
            expect(httpLog.logType).to.equal(LogType.HttpRequest)
            expect(httpLog.response.status).to.equal(200)

            done()
        }
        
    })

    it('error httpRequest',(done)=>{
        store.logs = []
        const request = new window.XMLHttpRequest()
        request.open('POST','https://api.apiopen.top/getWangYiNew')
        const sendData = { page: 1, count: 5 }
        request.send(sendData)
        request.onload = function(e){
            const httpLog = store.logs[0]
            expect(httpLog).to.not.equal(undefined)
            expect(httpLog.logType).to.equal(LogType.ErrorHttpRequest)
            expect(httpLog.response.status).to.not.equal(200)
            done()
        }
    })
})