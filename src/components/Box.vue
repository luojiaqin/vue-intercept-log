<template>
  <div class="box">
      <div class="title">{{title}}<span v-if="close" @click="$emit('close')">&times;</span></div>
      <slot></slot>
  </div>
</template>

<script>
export default {
    props: {
        title: String,
        close: {
          type: Boolean,
          default: false
        }
    }
}
</script>

<style scoped>
.box{
  border: 3px solid #eee;
  border-radius: 5px;
  padding: 20px;
  padding-top:0;
  text-align: left;
  margin-top: 15px;
  overflow: auto;
}
.title{
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-bottom: 1px solid #efefef;
}
.title span{
  float: right;
  font-size: 30px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>