<template>
   <el-carousel :interval="4000" type="card" height="500px" wigth="800px">
    <el-carousel-item v-for="(item, index) in urls" :key="index">
      <img v-bind:src="item.url" style="width: 100%;height: 100%"/>
     
    </el-carousel-item>
  </el-carousel>
  </template>
  <script>
export default {
    data(){
      return{
        urls:[
         
          {url:require('../static/buou.jpeg')},
          {url:require('../static/keji.jpeg')},
          {url:require('../static/mianyin.jpeg')},
          {url:require('../static/dog.jpeg')},
        ] 
      }
    }
  }
  </script>
  
  <style>
   
    
    /* .el-carousel__item:nth-child(1) {
      background-image:url('../static/dog.jpeg');
      background-size:cover;
    }
    
    .el-carousel__item:nth-child(2) {
        background-image:url('../static/buou.jpeg');
        background-size:cover;
    }
    .el-carousel__item:nth-child(3) {
      background-image:url('../static/keji.jpeg');
      background-size:cover;
    }
    
    .el-carousel__item:nth-child(4) {
        background-image:url('../static/mianyin.jpeg');
        background-size:cover;
    } */
  </style>