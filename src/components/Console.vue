<template>
  <div >

      <template v-if="isObject(conData)">
          <div v-for="name in keys" :key="name" :style="{'text-indent': depth*15+'px'}">

            <div v-if="isBasic(conData[name])">{{name}}:{{conData[name]}}</div>

            <div v-else class="item">
                <div>{{name}}:{{conData[name].constructor.name}}</div>
                <Console :conData="conData[name]" :depth="depth+1"></Console>
            </div>

        </div>
      </template>

      <template v-else-if="isArray(conData)">
          <div v-for="(item, index) in conData" :key="depth+'-'+index" :style="{'text-indent': depth*15+'px'}">
            
            <div v-if="isBasic(item)">{{index}}:{{item}}</div>

            <div v-else class="item">
                <div>{{index}}:{{item.constructor.name}}</div>
                <Console :conData="item" :depth="depth+1"></Console>
            </div>
            
        </div>
      </template>
  </div>
</template>

<script>

export default {
    name: 'Console',
    props: {
        conData: [Object, Array, Function],
        depth: {
            type: Number,
            default: 1
        }
    },
    computed: {
        keys(){
            return Object.keys(this.conData)
        }
    },

    methods: {
        getConstr(){

        },
        isObject(value){
            return value.constructor === Object
        },
        isArray(value){
            return value.constructor === Array
        },
        isBasic(val){
            const typeArr = ['string','number','null','undefined','boolean','symbol']
            return typeArr.includes(typeof val)
        }
    }

}
</script>

<style scoped>
    .item{
        position: relative;
    }
    .item::before{
        content: '';
        border: 3px solid transparent;
        border-left-color: #000;
        position: absolute;
        top: 10px;
        left: 0;
    }
</style>