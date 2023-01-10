import { render, fireEvent, act } from "@testing-library/react";
import { TickerTable } from "../components";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

describe("TickerTable", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: {
        data: [
          {
            ticker: "AAPL",
            exchange: "NASDAQ",
            direction: "up",
            price: 200,
            change: 2,
            changePercent: 0.1,
            lastTrade: "2022-01-01",
            selected: true,
          },
          {
            ticker: "GOOG",
            exchange: "NASDAQ",
            direction: "up",
            price: 100,
            change: 1,
            changePercent: 0.2,
            lastTrade: "2022-01-02",
            selected: false,
          },
        ],
      },
    });
  });

  it("renders loading message when data is not present", () => {
    store = mockStore({ data: { data: null } });
    const { getByText } = render(
      <Provider store={store}>
        <TickerTable />
      </Provider>
    );
    getByText("Loading...");
  });

  it("renders table when data is present", () => {
    const { getByText } = render(
      <Provider store={store}>
        <TickerTable />
      </Provider>
    );
    getByText("Ticker name");
    getByText("Exchange");
    getByText("Direction");
    getByText("Price");
    getByText("Change");
    getByText("Change Percent");
    getByText("Last trade");
    getByText("Selected");
  });
});
