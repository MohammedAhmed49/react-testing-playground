import { render, screen } from "@testing-library/react";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("suptotal price should be updated when a scoop is added or removed", async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

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
