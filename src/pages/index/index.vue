<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onUnload } from "@dcloudio/uni-app";
import {
  ConnectivityHelper,
  connectivityLabel,
  type ConnectivityType,
} from "@/utils/connectivity";
import { DeviceInfoHelper } from "@/utils/device-info";

const helper = new ConnectivityHelper();
const deviceInfoHelper = new DeviceInfoHelper();
const statusText = ref("Network: checking...");
const localUuid = ref("unknown");
const logs = ref<string[]>([]);

function updateStatus() {
  statusText.value = `Network: ${connectivityLabel(helper.getCurrentConnectivity())}`;
}

function updateDeviceInfo() {
  localUuid.value = deviceInfoHelper.getCurrentDeviceInfo().localUuid;
}

function appendLog(message: string) {
  logs.value.unshift(message);
}

onLoad(() => {
  updateDeviceInfo();
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
    <view class="device">
      <text class="device-row">LOCAL_UUID: {{ localUuid }}</text>
    </view>
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

.device {
  padding: 16rpx 32rpx;
}

.device-row {
  font-size: 32rpx;
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
