import React from "react";
import useStyles from "./headerStyle";
import {Paper, Typography} from "@mui/material";

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <Typography variant="h4" className={classes.headerText}>
                Ecomobility
            </Typography>
        </div>
    );
}

export default Header;