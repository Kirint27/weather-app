import React from "react";
import { render } from "@testing-library/react";
import TodaysDate from "./TodaysDate";

describe("TodaysDate tests", () => {
  it("should render", () => {
    expect(render(<TodaysDate />)).toBeTruthy();
  });
});
