import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function DrawerAppBar() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#4e54c6" ,marginLeft:"15px"}}
          >
            LOGO
          </Typography>
          <Link to={"/"}>
            <Button sx={{ color: "#4e54c6", fontWeight: "bold",fontSize:"15px" ,marginRight:"20px"}}>Home</Button>
          </Link>
          <Link to={"/profile"}>
            <Button sx={{ color: "#4e54c6", fontWeight: "bold",fontSize:"15px" ,marginRight:"20px" }}>
              Profile
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
