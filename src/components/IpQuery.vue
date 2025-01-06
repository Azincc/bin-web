<template>
  <div>
    <h2>Your Current Location</h2>
    <div v-if="myLocation">
      <p>Location: {{ myLocation.location }}</p>
      <p>ISP: {{ myLocation.isp }}</p>
      <p>IP: {{ myLocation.ip }}</p>
    </div>
    <div v-else-if="myLocationError">
      <p>Error: {{ myLocationError }}</p>
    </div>

    <h2>Lookup IP Address</h2>
    <input type="text" v-model="ipAddress" placeholder="Enter IP address" />
    <button @click="lookupIp">Lookup</button>

    <div v-if="ipLocation">
      <p>Location: {{ ipLocation.location }}</p>
      <p>ISP: {{ ipLocation.isp }}</p>
    </div>
    <div v-else-if="ipLocationError">
      <p>Error: {{ ipLocationError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';

interface LocationData {
  location: string;
  isp: string;
  ip: string | null;
}

const myLocation: Ref<LocationData | null> = ref(null);
const myLocationError = ref<string>('');
const ipAddress = ref<string>('');
const ipLocation: Ref<LocationData | null> = ref(null);
const ipLocationError = ref<string>('');

onMounted(async () => {
  await getMyLocation();
});

async function getMyLocation() {
  try {
    const response = await fetch('/v1/public/ip/get/myLocation');
    const data = await response.json();
    if (data.isSuccess) {
      myLocation.value = data.data;
      myLocationError.value = '';
    } else {
      myLocation.value = null;
      myLocationError.value = data.message;
    }
  } catch (error) {
    myLocation.value = null;
    myLocationError.value = 'Failed to fetch location';
  }
}

async function lookupIp() {
  try {
    const response = await fetch('/v1/public/ip/get/ipLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ipAddress.value),
    });
    const data = await response.json();
    if (data.isSuccess) {
      ipLocation.value = data.data;
      ipLocationError.value = '';
    } else {
      ipLocation.value = null;
      ipLocationError.value = data.message;
    }
  } catch (error) {
    ipLocation.value = null;
    ipLocationError.value = 'Failed to lookup IP';
  }
}
</script>

<style scoped>
/* Add some basic styling here */
</style>
