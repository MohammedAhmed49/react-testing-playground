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
