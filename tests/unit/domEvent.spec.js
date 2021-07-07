const { expect } = require('chai')
const { JSDOM } = require('jsdom')
const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)
const store = require('../../src/store/index2')
const domEvent = require('../../src/lib/domEvent')

describe('domEvent.js', () => {
    store.outWindow = window
    domEvent.init()

    it('listen dom click', ()=>{
        store.logs = []
        window.document.querySelector('p').click()
        const log = store.logs[0]
        expect(log).to.not.equal(undefined)
        expect(log.content).to.include('按钮点击')
    })
})