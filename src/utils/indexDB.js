
class IndexDB {
    constructor(databaseName, storeName){
        this.db = null
        this.objectStore = null
        this.databaseName = databaseName
        this.storeName = storeName
    }
    open(){
        return new Promise((resolve, reject)=>{
            const request = indexedDB.open(this.databaseName)
            request.onerror = function(event){
                reject()
            }
            request.onsuccess = (event)=>{
                // this.db = event.target?.result
                this.db = event.target.result
                resolve(this.db)
            }
            request.onupgradeneeded = (event)=>{
                // this.db = event.target?.result
                this.db = event.target.result
                if(!this.db.objectStoreNames.contains(this.storeName)){
                    this.objectStore = this.db.createObjectStore(this.storeName,{
                        keyPath: 'id',
                        autoIncrement: true
                    })
                }
            }
        })
        
    }
    getStore(permission){
        return this.db.transaction([this.storeName],permission).objectStore(this.storeName)
    }

    add(data){
        return new Promise((resolve, reject)=>{
            const request = this.getStore('readwrite').add(data)
            request.onsuccess = function(event){
                resolve()
            }
            request.onerror = function(event){
                reject()
            }
            
        })
    }
    queryById(id){
        return new Promise((resolve, reject)=>{
            const request = this.getStore().get(id)
            request.onsuccess = function(event){
                resolve(request.result)
            }
            request.onerror = function(event){
                reject()
            }
        })
    }
    queryList(page, pageSize){
        return new Promise((resolve, reject)=>{
            const startIndex = (page-1)*pageSize+1 // 1 11
            const endIndex = page*pageSize // 10 20
            const range = IDBKeyRange.bound(startIndex, endIndex)
            const cursor = this.getStore().openCursor(range)
            const result = []
            cursor.onsuccess = function(event){
                const cursor = event.target.result
                if(cursor){
                    result.push(cursor.value)
                    cursor.continue()
                }else{
                    resolve(result)
                }
            }
        })
    }
    update(data){
        return new Promise((resolve, reject)=>{
            const request = this.getStore('readwrite').put(data)
            request.onsuccess = function(event){
                resolve()
            }
            request.onerror = function(event){
                reject()
            }
        })
    }

    deleteById(id){
        return new Promise((resolve, reject)=>{
            const request = this.getStore('readwrite').delete(id)
            request.onsuccess = function(event){
                resolve()
            }
            request.onerror = function(event){
                reject()
            }
        })
    }
}

module.exports = IndexDB

