<template>
  <div id="app">
      {{message}}
      <vue-intercept-log></vue-intercept-log>
  </div>
</template>

<script>
export default {
    data(){
        return {
            message: 'please checkout the tool console'
        }
    },
    created(){
        console.log(123)
    }
}
</script>

<style>

</style>