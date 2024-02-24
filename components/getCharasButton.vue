<template>
  <div>
    <button @click="clickEvent">{{label}}</button>
  </div>
</template>

<script setup>
  defineProps(['clickEvent','label'])
</script>

<style scoped>

  button {
    display: block;
    width: max-content;
    padding: 10px 15px;
    margin: 0 auto;
    background-color: rgb(70, 70, 70);
    border: 1px solid white;
    border-radius: 20px;
    color:white;
  }

  #dbList{
    background-color: rgb(46, 46, 46);
    padding: 0 10px;
    max-height: 400px;
    margin-top: 30px;
    border-radius: 20px;
    transform: scaleY(1.1);
    overflow: auto;
  }

</style>