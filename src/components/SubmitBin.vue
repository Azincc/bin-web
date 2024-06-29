<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <label for="content">Content:</label>
        <input type="text" v-model="content" id="content" required />
        <button type="submit">Submit</button>
      </form>
      <div v-if="id">
        <p>Received ID: {{ id }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
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
      id.value = response.data.id;
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  