import { urlParamsAdapter } from "./urlParams";

global.window = Object.create(window);

describe("urlParams", () => {
  const adapter = urlParamsAdapter({ storeType: "array" });
  it("should read and get params from the URL", () => {
    const search =
      "timezones[]=America%2FSantiago&timezones[]=America%2FLos_Angeles";
    Object.defineProperty(window, "location", {
      value: {
        search,
      },
    });
    expect.assertions(1);
    return adapter.get("timezones").then((value: string[]) => {
      expect(value).toEqual(["America/Santiago", "America/Los_Angeles"]);
    });
  });

  it("should set a param to the URL", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "",
      },
    });
    jest.spyOn(window.history, "replaceState");

    expect.assertions(1);
    return adapter
      .set("timezones", ["America/Santiago", "America/Argentina/Buenos_Aires"])
      .then(() => {
        expect(window.history.replaceState).toHaveBeenCalledWith(
          null,
          "",
          "?timezones[]=America%2FSantiago&timezones[]=America%2FArgentina%2FBuenos_Aires"
        );
      });
  });
});
