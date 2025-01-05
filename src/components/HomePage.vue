<template>
    <div class="left-panel">
    <tiny-fall-menu :data="dataset"></tiny-fall-menu>
    </div>
    <div class="homepage_container">
        <div class="homepage_content">
            <div class="homepage_content_title">
                    <span class="homepage_content_title_text_span">欢迎使用</span>
                    <span class="homepage_content_title_text_span_name">{{ username }}</span>
                    <span class="homepage_content_title_text_span">的在线工具箱</span>
            </div>
        </div>
        <footer>
            <div class="homepage_footer">
                <div class="homepage_footer_text">
                    <span>Copyright © 2024</span>
                    <span><a href="https://github.com/Azincc/bin-web">AToolbox</a></span>
                    <span>All rights reserved.</span>
                </div>
            </div>
        </footer>
    </div>
    <div class="jump_to_bin">
        <text>跳转到粘贴板</text>
        <tiny-input class="input" v-model="input" placeholder="Please input"></tiny-input>
        <tiny-button type="primary" @click="handleRedirect">跳转</tiny-button>
    </div>
</template>

<script setup lang="ts">
import { Button as TinyButton, Layout as TinyLayout, Row as TinyRow ,TinyInput} from '@opentiny/vue'
import { iconDel, iconYes, iconEdit, iconMail, iconStarO, iconSearch } from '@opentiny/vue-icon'
import { FallMenu as TinyFallMenu} from '@opentiny/vue'
import { ref } from 'vue';

let username = ''
// 将name设置为随机姓名
const names = ['Azin', 'CyberCll', 'Azincc']
username = names.at(Math.floor(Math.random() * names.length)) || 'Nobody'
const dataset = ref([
  { title: '创建粘贴板', url: '/submit', children: [] },
  { title: '查看粘贴板', url: '/bin', children: [] },
  { title: '关于我们', url: '/about', children: [] },
])
const input = ref('')
function handleRedirect() {
  const url = '/bin'+input.value
  if (url) {
    window.location.href = url
  }
}
</script>

<style>
.left-panel {
    position: fixed;
    left: 0;
    top: 0;
  width: 100%;
  padding: 10px;
}
.homepage_content_title{
    margin-top: 50px; 
    display: flex;
}
.input{
    width: 300px;
}
</style>