const IndexDB  = require('../../src/utils/indexDB.js')
// import IndexDB from '../../src/utils/indexDB'

// 需要先清空数据库
describe('indexDB', ()=>{
    const testDB = new IndexDB('testDatabase','testStore')

    it('open', async ()=>{
        await testDB.open()
        expect(testDB.db).to.be.an.instanceOf(IDBDatabase)
    })

    it('add and query',async ()=>{
        await testDB.open()
        await testDB.add({name: 'test1'})
        const result = await testDB.queryById(1)
        expect(result).to.deep.equal({id: 1,name: 'test1'})
    })

    it('query page size', async ()=>{
        await testDB.open()
        await testDB.add({name: 'test1'})
        const result = await testDB.queryList(1, 1)
        expect(result.length).to.equal(1)
        await testDB.add({name: 'test2'})
        const result2 = await testDB.queryList(1, 2)
        expect(result2.length).to.equal(2)
    })


    it('update and query', async ()=>{
        await testDB.open()
        const result = await testDB.queryById(1)
        expect(result).to.deep.equal({id: 1,name: 'test1'})
        await testDB.update({id: 1, name: 'test-1'})
        const result2 = await testDB.queryById(1)
        expect(result2).to.deep.equal({id: 1, name: 'test-1'})
    })

    it('delete and query', async ()=>{
        await testDB.open()
        const result = await testDB.queryById(1)
        expect(result).to.deep.equal({id: 1,name: 'test-1'})
        await testDB.deleteById(1)
        const result2 = await testDB.queryById(1)
        expect(result2).to.equal(undefined)

    })
})