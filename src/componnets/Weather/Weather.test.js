import React from "react";
import { render } from "@testing-library/react";
import Weather from "./Weather";

describe("Weather tests", () => {
  it("should render", () => {
    expect(render(<Weather />)).toBeTruthy();
  });
});
