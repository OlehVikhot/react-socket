import { render, fireEvent, cleanup } from "@testing-library/react";
import TickerRow from "../components/TickerTable/TickerRow/TickerRow";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DragHandleIcon from "@mui/icons-material/DragHandle";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../store/dataSlice";

const store = configureStore({
  reducer: rootReducer,
});

afterEach(cleanup);

test("displays correct direction icon based on change", () => {
  let data = {
    ticker: "AAPL",
    exchange: "NASDAQ",
    price: "123.45",
    change: "0.12",
    change_percent: "0.1",
    last_trade_time: "2022-01-01T00:00:00.000Z",
  };
  let { getByTestId } = render(
    <Provider store={store}>
      <TickerRow data={data} />
    </Provider>
  );
  expect(getByTestId("direction-icon")).toBeInTheDocument();

  data = {
    ticker: "AAPL",
    exchange: "NASDAQ",
    price: "123.45",
    change: "-0.12",
    change_percent: "-0.1",
    last_trade_time: "2022-01-01T00:00:00.000Z",
  };
  ({ getByTestId } = render(
    <Provider store={store}>
      <TickerRow data={data} />
    </Provider>
  ));
  expect(getByTestId("direction-icon")).toBeInTheDocument();

  data = {
    ticker: "AAPL",
    exchange: "NASDAQ",
    price: "123.45",
    change: "0",
    change_percent: "0",
    last_trade_time: "2022-01-01T00:00:00.000Z",
  };
  ({ getByTestId } = render(
    <Provider store={store}>
      <TickerRow data={data} />
    </Provider>
  ));
  expect(getByTestId("direction-icon")).toBeInTheDocument();
});
