import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the right arrow then the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backward(left) in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("should hide the arrows when user it at the end of the carousel", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the left arrow to be absent
  let leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).not.toBeInTheDocument()

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  let rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // both arrows should be in the middle page
  leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeInTheDocument()
  rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).toBeInTheDocument()

  // move to final page
  fireEvent.click(rightArrow);

  // right arrow should be absent
  leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeInTheDocument()
  rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).not.toBeInTheDocument()
})

it("renders without crashing", function() {
    render(<Carousel />)
} )

it("should match snapshot", () => {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
})
