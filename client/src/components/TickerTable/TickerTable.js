import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import TickerRow from "./TickerRow/TickerRow";

const ROWS = [
  { name: "Ticker name" },
  { name: "Exchange", align: "left" },
  { name: "Direction", align: "left" },
  { name: "Price", align: "right" },
  { name: "Change", align: "right" },
  { name: "Change Percent", align: "right" },
  { name: "Last trade", align: "right" },
  { name: "Selected", align: "right" },
];

const StyledTableCell = styled(TableCell)(() => ({
  backgroundColor: "black",
  color: "white",
  fontSize: 14,
}));

export default function TickerTable() {
  const data = useSelector((state) => state.data.data);

  return (
    <>
      {!data && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      )}
      {data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                {ROWS.map((item, index) => (
                  <StyledTableCell key={index} align={item.align}>
                    {item.name}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                return <TickerRow key={item.ticker} data={item} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
