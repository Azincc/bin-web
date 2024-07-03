<template>
  <div>
    <el-text id="nowPath" v-model="nowPath"></el-text>
    <p><el-input type="url" v-model="currentPath" id="path" readonly /></p>
  </div>
  <div>
    <p />
    <p><el-text for="content">当前剪切板内容</el-text></p>
  </div>
  <div>
    <p>
      <el-input
        type="textarea"
        minlength="100"
        maxlength="1920"
        v-model="content"
        id="dynamic_content"
        readonly
        autosize
        resize="none"
      />
      <el-button type="primary" :icon="CopyDocument" @click="copyToClipboard"></el-button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { CopyDocument } from '@element-plus/icons-vue'
const route = useRoute()
const nowPath= ref(window.location.href)
const currentPath = ref(window.location.href)
const content = ref('')
const contentInput = ref<HTMLTextAreaElement | null>(null)
const adjustTextareaHeight = () => {
  const textarea = contentInput.value
  if (textarea) {
    textarea.style.height = 'auto' // Reset height to auto
    textarea.style.height = '${textarea.scrollHeight}px' // Set to the scroll height
    textarea.style.width = 'auto'
  }
}
const fetchContent = async (bin_id: string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8080/v1/bin/get/${bin_id}`)
    content.value = response.data.content
    adjustTextareaHeight()
  } catch (error) {
    console.error('Error fetching content:', error)
  }
}

onMounted(() => {
  const bin_id = route.params.id as string
  if (/^[a-zA-Z0-9]{10}$/.test(bin_id)) {
    fetchContent(bin_id)
  } else {
    console.error('Invalid bin_id format')
  }
})

const copyToClipboard = () => {
  navigator.clipboard
    .writeText(content.value)
    .then(() => {
      alert('Text copied to clipboard!')
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err)
    })
}
</script>

<style scoped></style>
