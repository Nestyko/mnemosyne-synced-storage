import { Adapter, AdapterOptions } from "../../storageAdapter";
import { parse, stringify } from "query-string";

const name = "urlParamsAdapter";

export const urlParamsAdapter: (
  options?: AdapterOptions
) => Adapter<any> = () => ({
  name,
  isCompatible: () => !!window && !!window.location && !!window.location.href,
  get: (key: string) => {
    const params = parse(window.location.search, { arrayFormat: "bracket" });
    const value = params[key];
    return value !== undefined && value !== null
      ? Promise.resolve(value)
      : Promise.reject(`${name}: Value not found for key "${key}"`);
  },
  set: (key: string, value: string) => {
    const currentValues = parse(window.location.search, {
      arrayFormat: "bracket",
    });
    currentValues[key] = value;
    const paramString = stringify(currentValues, { arrayFormat: "bracket" });
    window.history.replaceState(null, "", `?${paramString}`);
    return Promise.resolve();
  },
});
