import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadData } from "./store/dataSlice";
import io from "socket.io-client";
import CssBaseline from "@mui/material/CssBaseline";
import { TickerTable, Header, ErrorFallback } from "./components";
import { ErrorBoundary } from "react-error-boundary";

const socket = io("http://localhost:4000/");

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("start");
    });

    socket.on("ticker", (data) => {
      dispatch(loadData(data));
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CssBaseline />
      <Header />
      <TickerTable />
    </ErrorBoundary>
  );
}

export default App;
