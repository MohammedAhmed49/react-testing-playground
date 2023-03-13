import { render, screen } from "../../../testing-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";

test("subtotal updates if scoops are changed", async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />);

  // Make sure subtotal starts with 0.00
  const subtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(subtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(subtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocoInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocoInput);
  await user.type(chocoInput, "2");
  expect(subtotal).toHaveTextContent("6.00");
});

test("subtotal updates if toppings are changed", async () => {
  const user = userEvent.setup();

  render(<Options optionType="toppings" />);

  const subtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(subtotal).toHaveTextContent("0.00");

  const checkboxCherries = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(checkboxCherries);
  expect(subtotal).toHaveTextContent("1.50");

  const checkboxMMs = await screen.findByRole("checkbox", { name: "M&Ms" });
  await user.click(checkboxMMs);
  expect(subtotal).toHaveTextContent("3.00");

  await user.click(checkboxMMs);
  expect(subtotal).toHaveTextContent("1.50");
});

describe("Grand total", () => {
  test("grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);

    const total = screen.getByText("grand total: $", { exact: false });
    expect(total).toHaveTextContent("0.00");

    unmount();
  });
  test("grand total updates if scoop is added", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const total = screen.getByText("grand total: $", { exact: false });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(total).toHaveTextContent("2.00");
  });
  test("grand total updates if topping is added", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const checkboxMMs = await screen.findByRole("checkbox", { name: "M&Ms" });
    const total = screen.getByText("grand total: $", { exact: false });

    await user.click(checkboxMMs);

    expect(total).toHaveTextContent("1.50");
  });
});
