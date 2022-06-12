import { Adapter } from "storageAdapter";
import { useEffect, useState, useCallback } from "react";

export const setUseStorage: (
  adpter: Adapter<any>
) => <T>(key: string, defaultValue: T) => [T, (value: T) => void] =
  (adapter) => (key, defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    const customSetValue = useCallback(
      (newValue: any) => {
        setValue(newValue);
        adapter.set(key, newValue).then(() => {});
      },
      [key]
    );
    useEffect(() => {
      adapter.get(key).then((savedValue: any) => {
        if (savedValue) {
          customSetValue(savedValue);
        }
      });
    }, [customSetValue, key]);

    return [value, customSetValue];
  };
