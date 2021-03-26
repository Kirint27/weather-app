import React from "react";
import { render } from "@testing-library/react";
import DisplayWeather from "./DisplayWeather";

describe("DisplayWeather tests", () => {
  it("should render", () => {
    expect(render(<DisplayWeather />)).toBeTruthy();
  });
});
