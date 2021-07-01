<template>
  <div id="app">
      {{message}}
      <vue-intercept-log @click="changeContent"></vue-intercept-log>
  </div>
</template>

<script>
export default {
    data(){
        return {
            message: 'please checkout the tool console'
        }
    },
    methods: {
        changeContent(){
            this.message = '123'
        }
    }
}
</script>

<style>

</style>