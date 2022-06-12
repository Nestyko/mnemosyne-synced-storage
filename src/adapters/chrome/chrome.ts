import { Adapter } from "storageAdapter";

const name = "ChromeStorageAdapter";

export const chromeStorageAdapter: () => Adapter<any> = () => ({
  name,
  isCompatible: () => typeof chrome !== "undefined" && !!chrome.storage,
  get: (key: string) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (result) => {
        const value = result[key];
        if (value) {
          resolve(result[key]);
        } else {
          reject(`${name}: Value for key "${key}" not found`);
        }
      });
    });
  },
  set: (key: string, value: any) => {
    return new Promise<void>((resolve) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve();
      });
    });
  },
});
