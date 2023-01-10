import { useDispatch } from "react-redux";
import { selectTab } from "../../store/dataSlice";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";

function Header() {
  const dispatch = useDispatch();

  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar
        sx={{
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          TraderPRO
        </Typography>
        <nav>
          <Link
            variant='button'
            color='text.primary'
            href='#'
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => dispatch(selectTab("all"))}
          >
            All
          </Link>
          <Link
            variant='button'
            color='text.primary'
            href='#'
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => dispatch(selectTab("selected"))}
          >
            Selected
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
