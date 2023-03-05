import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("the checkbox should be unchecked and button is disabled at the begininning", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });

  const button = screen.getByRole("button", { name: /Confirm order/i });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("the button should be enabled when the checkbox is checked", async () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  const button = screen.getByRole("button", { name: /Confirm order/i });
  const user = userEvent.setup();
  await user.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();
});

test("the button should be disabled if the checkbox is not checked once again", async () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  const button = screen.getByRole("button", { name: /Confirm order/i });
  const user = userEvent.setup();
  await user.click(checkbox);
  await user.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  // popover starts not in the DOM
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover shows in the dom with hover on checkbox
  const checkbox = screen.getByText(/Terms and Conditions/i);
  await user.hover(checkbox);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when unhover happens
  await user.unhover(checkbox);
  expect(popover).not.toBeInTheDocument();
});
