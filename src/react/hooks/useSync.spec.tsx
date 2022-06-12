import React, { useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { setUseStorage } from "./useStorage";
import { MultiStorageAdapter } from "../../storageAdapter";

jest.useFakeTimers();

describe("useSync", () => {
  class MockAdapter {
    state: any = {};
    constructor(defaultState: any) {
      this.state = defaultState;
    }
    get = (key: string) => Promise.resolve(this.state[key]);
    set = (key: string, value: any) => {
      this.state = { ...this.state, [key]: value };
      return Promise.resolve();
    };
    name = "Mock Adapter";
    isCompatible = () => true;
  }

  const ComponentThatTestsSync = () => {
    const mockAdapter = new MultiStorageAdapter([
      new MockAdapter({ myAweomeSyncVar: "myValue" }),
    ]);
    const useSync = setUseStorage(mockAdapter);
    const [storedVar, setVar] = useSync<string>(
      "myAweomeSyncVar",
      "default hook"
    );
    useEffect(() => {
      setTimeout(() => setVar("somethingElse"), 1000);
    }, [setVar]);
    return <div>{storedVar}</div>;
  };
  it("should call the method get and set", async () => {
    const component = render(<ComponentThatTestsSync />);
    expect(component.getByText("default hook")).toBeTruthy();
    jest.runAllTimers();
    await waitFor(() =>
      expect(component.getByText("somethingElse")).toBeTruthy()
    );
  });
});
