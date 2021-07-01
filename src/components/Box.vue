<template>
  <div class="box">
      <div class="title">{{title}}</div>
      <slot></slot>
  </div>
</template>

<script>
export default {
    props: {
        title: String
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
}
</style>