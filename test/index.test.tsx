import "@testing-library/jest-dom";
import React from "react";
import {
  render
  // fireEvent,
  // screen
} from "@testing-library/react";
import { Keyframes, Frame } from "../packages/react-keyframes/src";

jest.useFakeTimers();

it("should animate", () => {
  const { container } = render(
    <Keyframes>
      <Frame duration={100}>foo</Frame>
      <Frame duration={200}>bar</Frame>
      <Frame>baz</Frame>
    </Keyframes>
  );

  expect(container.childNodes.length).toBe(1);
  expect(container.childNodes[0].textContent).toBe("foo");

  jest.advanceTimersByTime(100);

  expect(container.childNodes.length).toBe(1);
  expect(container.childNodes[0].textContent).toBe("bar");

  jest.advanceTimersByTime(200);

  expect(container.childNodes.length).toBe(1);
  expect(container.childNodes[0].textContent).toBe("baz");
});

it("should render custom component", () => {
  const { container } = render(
    <Keyframes component="pre" className="woot">
      <Frame>foo</Frame>
      <Frame>bar</Frame>
    </Keyframes>
  );

  expect(container.childNodes[0].nodeName).toBe("PRE");
  expect(container.childNodes[0]).toHaveClass("woot");
});

it("should call onEnd", () => {
  let count = 0;

  render(
    <Keyframes onEnd={() => count += 1}>
      <Frame duration={100}>foo</Frame>
      <Frame duration={200}>bar</Frame>
      <Frame>baz</Frame>
    </Keyframes>
  );


  jest.advanceTimersByTime(100);

  expect(count).toBe(0);

  jest.advanceTimersByTime(200);

  expect(count).toBe(1);
});

it("should animate loop", () => {
  const {container} = render(
    <Keyframes loop>
      <Frame duration={100}>foo</Frame>
      <Frame duration={200}>bar</Frame>
      <Frame>baz</Frame>
    </Keyframes>
  );


  jest.advanceTimersByTime(500);

  expect(container.childNodes[0].textContent).toBe("bar");


  jest.advanceTimersByTime(100);
  expect(container.childNodes[0].textContent).toBe("foo");

})