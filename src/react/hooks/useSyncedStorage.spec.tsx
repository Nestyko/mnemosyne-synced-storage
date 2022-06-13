import React, { useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { MultiStorageAdapter } from "../../storageAdapter";
import { MnemosyneProvider } from "../components/Provider";
import { useSyncedStorage } from "../hooks/useSyncedStorage";

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
  const mockAdapter = new MultiStorageAdapter([
    new MockAdapter({ myAweomeSyncVar: "myValue" }),
  ]);

  const ComponentThatTestsSync = () => {
    const [storedVar, setVar] = useSyncedStorage<string>({
      key: "myAwesomeSyncVar",
      defaultValue: "default hook",
    });
    useEffect(() => {
      setTimeout(() => setVar("somethingElse"), 1000);
    }, [setVar]);
    return <div>{storedVar}</div>;
  };
  it("should call the method get and set", async () => {
    const component = render(
      <MnemosyneProvider adapter={mockAdapter}>
        <ComponentThatTestsSync />
      </MnemosyneProvider>
    );
    expect(component.getByText("default hook")).toBeTruthy();
    jest.runAllTimers();
    await waitFor(() =>
      expect(component.getByText("somethingElse")).toBeTruthy()
    );
  });
});
