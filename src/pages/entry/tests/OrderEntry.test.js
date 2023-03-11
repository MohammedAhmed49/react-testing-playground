import { rest } from "msw";
import { server } from "../../../mocks/servers";
import { render, screen } from "../../../testing-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";

test("Showing alerts when server responds back with error", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});
