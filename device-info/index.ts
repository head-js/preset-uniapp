import uuid4 from 'vanilla.js/random/uuid4';
import { APP_ID } from '@/utils/package-info';

const STORAGE_KEY = `${APP_ID}.LOCAL_UUID`;

export interface DeviceInfo {
  localUuid: string;
}

export class DeviceInfoHelper {
  private currentInfo: DeviceInfo = {
    localUuid: "unknown",
  };

  getCurrentDeviceInfo(): DeviceInfo {
    let localUuid = uni.getStorageSync(STORAGE_KEY);
    if (typeof localUuid !== "string" || localUuid.length === 0) {
      localUuid = uuid4();
      uni.setStorageSync(STORAGE_KEY, localUuid);
    }
    this.currentInfo = { localUuid };
    return this.currentInfo;
  }

  getDisplayString(): string {
    const info = this.getCurrentDeviceInfo();
    return `LOCAL_UUID: ${info.localUuid}`;
  }
}
