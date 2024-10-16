import React from "react";
import { render } from "@testing-library/react";
import WeatherCard from "./WeatherCard";

describe("WeatherCard tests", () => {
  it("should render", () => {
    expect(render(<WeatherCard />)).toBeTruthy();
  });
});
