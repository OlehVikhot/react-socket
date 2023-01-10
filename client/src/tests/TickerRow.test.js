import { render, fireEvent, cleanup } from "@testing-library/react";
import ReactRedux from "react-redux";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../store/dataSlice";
import { selectTicker } from "../store/dataSlice";
import TickerRow from "../components/TickerTable/TickerRow/TickerRow";

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

test("TickerRow component correctly renders data for each ticker", () => {
  const data = {
    ticker: "AAPL",
    exchange: "NASDAQ",
    price: "121.5",
    change: "1.5",
    change_percent: "1.25",
    last_trade_time: "2022-05-20T16:00:00.000Z",
  };

  const { getByText } = render(
    <Provider store={store}>
      <TickerRow data={data} />
    </Provider>
  );

  expect(getByText("AAPL")).toBeInTheDocument();
  expect(getByText("NASDAQ")).toBeInTheDocument();
  expect(getByText("121.5$")).toBeInTheDocument();
  expect(getByText("1.5$")).toBeInTheDocument();
  expect(getByText("1.25%")).toBeInTheDocument();
  expect(getByText("May 20, 2022")).toBeInTheDocument();
});

jest.spyOn(ReactRedux, "useDispatch").mockImplementation(() => jest.fn());

test('TickerRow component dispatches "selectTicker" action on star click', () => {
  const data = {
    ticker: "AAPL",
    exchange: "NASDAQ",
    price: "121.5",
    change: "1.5",
    change_percent: "1.25",
    last_trade_time: "2022-05-20T16:00:00.000Z",
  };

  const dispatch = jest.fn();
  jest.spyOn(ReactRedux, "useDispatch").mockImplementation(() => dispatch);

  const { getByRole } = render(<TickerRow data={data} />);
  const starIcon = getByRole("button", { name: /select ticker/i });
  fireEvent.click(starIcon);
  expect(dispatch).toHaveBeenCalledWith(selectTicker("AAPL"));
});
