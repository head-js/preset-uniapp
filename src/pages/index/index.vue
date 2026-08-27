<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onUnload } from "@dcloudio/uni-app";
import {
  ConnectivityHelper,
  connectivityLabel,
  type ConnectivityType,
} from "@/utils/connectivity";

const helper = new ConnectivityHelper();
const statusText = ref("Network: checking...");
const logs = ref<string[]>([]);

function updateStatus() {
  statusText.value = `Network: ${connectivityLabel(helper.getCurrentConnectivity())}`;
}

function appendLog(message: string) {
  logs.value.unshift(message);
}

onLoad(() => {
  helper.registerCallback((type: ConnectivityType) => {
    appendLog(`Network changed: ${connectivityLabel(type)}`);
    updateStatus();
  });
  updateStatus();
});

onUnload(() => {
  helper.unregisterCallback();
});
</script>

<template>
  <view class="page">
    <text class="status">{{ statusText }}</text>
    <scroll-view scroll-y class="logs">
      <view v-for="(log, index) in logs" :key="index" class="log-item">
        <text class="log-text">{{ log }}</text>
      </view>
    </scroll-view>
  </view>
</template>

<style>
.page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--window-top, 0px));
}

.status {
  font-size: 48rpx;
  font-weight: 500;
  padding: 32rpx 32rpx 16rpx;
}

.logs {
  flex: 1;
  height: 0;
}

.log-item {
  padding: 12rpx 32rpx;
}

.log-text {
  font-size: 32rpx;
}
</style>
