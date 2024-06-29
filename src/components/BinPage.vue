<template>
  <div>
    <p><input type="url" v-model="currentPath" id="path" readonly /></p>
  </div>
  <div>
    <p />
    <p><label for="content">Content:</label></p>
  </div>
  <div>
    <p>
      <textarea minlength="100" maxlength="1920" type="text"
        v-model="content"
        id="dynamic_content"
        readonly
      />
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
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
</script>

<style scoped>
.dynamic_content {
  width: 100%;
  max-width: 1920px;
  min-width: 100px;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}
</style>
