<template>
  <div>
    <tiny-form>
      <text for="content">输入粘贴板内容: </text>
      <tiny-row>
        <tiny-input type="textarea" v-model="content" id="content" required />
      </tiny-row>
      <tiny-row>
        <tiny-button type="primary" @click="handleSubmit">提交</tiny-button>
      </tiny-row>
    </tiny-form>
    <div v-if="returnedUri">
      <p>链接: {{ id }}</p>
      <tiny-input v-model="returnedUri" type="url" id="id" readonly />
    </div>
  </div>
</template>

<script setup lang="ts">
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
import { ref } from 'vue';
import axios from 'axios';
const content = ref<string>('');
const id = ref<string>('');
const returnedUri = ref<string>('');
const data = {
  content: content.value,
  id: id.value
}

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

async function handleSubmit() {
  Modal.message({ message: '开始发送', status: 'loading' });
  // 随机生成id
  id.value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  data.content = content.value;
  data.id = id.value;
  try {
    const response = await axios.post(apiUrl + '/v1/bin/create',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          // 添加认证头，例如:
          // 'Authorization': 'Bearer your-token-here'
        }
      }
    );
    const baseUrl = window.location.origin;
    returnedUri.value = `${baseUrl}/${response.data.id}`;
    jumpTo(`/${response.data.id}`);
  } catch (error: any) {
    Modal.message({ message: '发送失败', status: 'error' })
    Modal.alert({ message: error.message, title: '发送失败', status: 'error' })
  }
}

function jumpTo(url: string) {
  window.location.href = url;
}
</script>

<style scoped>
/* Add your styles here */
#content {
  width: 300px;
}
</style>