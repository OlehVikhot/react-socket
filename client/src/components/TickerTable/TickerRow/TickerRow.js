import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTicker } from "../../../store/dataSlice";
import { TableCell, TableRow, styled } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getReadableDate } from "../../../util/utilities";

const COLOR = {
  up: "green",
  down: "red",
  idle: "black",
};

const ICON = {
  up: <ArrowUpwardIcon data-testid='direction-icon' />,
  down: <ArrowDownwardIcon data-testid='direction-icon' />,
  idle: <DragHandleIcon data-testid='direction-icon' />,
};

function TickerRow({ data }) {
  const { ticker, exchange, price, change, change_percent, last_trade_time } =
    data;

  const [direction, setDirection] = useState("idle");
  const priceRef = useRef(data);
  const dispatch = useDispatch();

  const tab = useSelector((state) => state.data.tab);
  const selected = useSelector((state) => state.data.selected);

  let show = false;
  const include = selected?.includes(ticker);
  if (tab === "selected" && include) show = true;
  if (tab === "all") show = true;

  useEffect(() => {
    const prevPrice = +priceRef.current.price;
    if (prevPrice < +price) setDirection("up");
    if (prevPrice > +price) setDirection("down");
    if (prevPrice === +price) setDirection("idle");
    priceRef.current = data;
  }, [data]);

  const StyledTableCell = styled(TableCell)(() => ({
    fontSize: 14,
  }));
  const StyledTableCellColor = styled(TableCell)(() => ({
    color: COLOR[direction],
  }));

  return (
    <>
      {show && (
        <TableRow key={ticker}>
          <StyledTableCell component='th' scope='row'>
            {ticker}
          </StyledTableCell>
          <StyledTableCell>{`${exchange}`}</StyledTableCell>
          <StyledTableCellColor>{ICON[direction]}</StyledTableCellColor>
          <StyledTableCellColor align='right'>{`${price}$`}</StyledTableCellColor>
          <StyledTableCellColor align='right'>{`${change}$`}</StyledTableCellColor>
          <StyledTableCellColor align='right'>{`${change_percent}%`}</StyledTableCellColor>
          <StyledTableCell align='right'>
            {getReadableDate(last_trade_time)}
          </StyledTableCell>
          <StyledTableCell
            align='right'
            onClick={() => dispatch(selectTicker(ticker))}
          >
            {include ? <StarIcon /> : <StarBorderIcon />}
          </StyledTableCell>
        </TableRow>
      )}
    </>
  );
}

export default TickerRow;
