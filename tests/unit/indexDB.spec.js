const IndexDB  = require('../../src/utils/indexDB.js')
// import IndexDB from '../../src/utils/indexDB'

describe('indexDB', ()=>{
    const testDB = new IndexDB('testDatabase','testStore')
    before(async ()=>{
        await testDB.open()
        await testDB.add({id: 1,name: 'test1'})
        
    })

    it('open', async ()=>{
        expect(testDB.db).to.be.an.instanceOf(IDBDatabase)
    })

    it('query', async ()=>{
        const result = await testDB.queryById(1)
        expect(result).to.deep.equal({id: 1,name: 'test1'})
    })

    it('add and query',async ()=>{
        await testDB.add({id: 2,name: 'test2'})
        const result = await testDB.queryById(2)
        expect(result).to.deep.equal({id: 2,name: 'test2'})
        
    })

    it('query page size', async ()=>{
        const result = await testDB.queryList(1, 1)
        expect(result.length).to.equal(1)
        const result2 = await testDB.queryList(1, 2)
        expect(result2.length).to.equal(2)
    })


    it('update and query', async ()=>{
        const result = await testDB.queryById(1)
        expect(result).to.deep.equal({id: 1,name: 'test1'})
        await testDB.update({id: 1, name: 'test-1'})
        const result2 = await testDB.queryById(1)
        expect(result2).to.deep.equal({id: 1, name: 'test-1'})
    })

    it('delete and query', async ()=>{
        const result = await testDB.queryById(2)
        expect(result).to.deep.equal({id: 2,name: 'test2'})
        await testDB.deleteById(2)
        const result2 = await testDB.queryById(2)
        expect(result2).to.be.undefined

    })

    after(async ()=>{
        await testDB.deleteById(1)
        await testDB.deleteById(2)
    })
})