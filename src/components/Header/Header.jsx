import React from "react";
import useStyles from "./headerStyle";
import {Paper, Typography} from "@mui/material";

const Header = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.header} elevation={3}>
            <Typography variant="h4" className={classes.headerText}>
                Ecomobility
            </Typography>
        </Paper>
    );
}

export default Header;