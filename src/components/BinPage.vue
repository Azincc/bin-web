<template>
  <div>
    <p>
    <tiny-input type="url" v-model="currentPath" id="path" disabled></tiny-input>
    </p>
  </div>
  <div>
    <p />
    <p><el-text for="content">当前剪切板内容</el-text></p>
  </div>
  <div>
    <p>
      <tiny-input type="textarea" disabled v-model="content" placeholder="textarea"></tiny-input>
      <tiny-button type="primary" @click="copyToClipboard">复制</tiny-button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { CopyDocument } from '@element-plus/icons-vue'
import {
  Form as TinyForm,
  FormItem as TinyFormItem,
  Numeric as TinyNumeric,
  Radio as TinyRadio,
  DatePicker as TinyDatePicker,
  DropTimes as TinyDropTimes,
  Tooltip as TinyTooltip,
  Input as TinyInput,
  Button as TinyButton, Modal, Notify,
  Modal as TinyModal,
  Row as TinyRow
} from '@opentiny/vue'
const route = useRoute()
const nowPath= ref(window.location.href)
const currentPath = ref(window.location.href)
const content = ref('')
const contentInput = ref<HTMLTextAreaElement | null>(null)
const apiUrl=import.meta.env.VITE_API_ENDPOINT
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
    const response = await axios.get(apiUrl+'/v1/bin/get/'+`${bin_id}`)
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
      alert('复制成功!')
    })
    .catch((err) => {
      console.error('无法复制! 错误:', err)
    })
}
</script>

<style scoped></style>
