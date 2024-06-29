<template>
    <div>
      <el-form >
        <el-text for="content">输入粘贴板内容: </el-text>
        <el-input type="text" v-model="content" id="content" required />
        <el-button type="primary" @click="handleSubmit" >Submit</el-button>
      </el-form>
      <div v-if="returnedContent">
        <p>链接: {{ id }}</p>
        <el-input v-model="returnedContent" type="url" id="id" readonly/>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  const returnedContent = ref('');
  const content = ref<string>('');
  const id = ref<string>('');
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/v1/bin/create', {
      content: content.value
    }, {
      headers: {
        'Content-Type': 'application/json',
        // 添加认证头，例如:
        // 'Authorization': 'Bearer your-token-here'
      }}
    );
    const baseUrl = window.location.origin;
    returnedContent.value =  `${baseUrl}/${response.data.id}`;
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  