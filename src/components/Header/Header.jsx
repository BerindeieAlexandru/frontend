import React from "react";
import useStyles from "./headerStyle";

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <h1 className={classes.headerText}>Ecomobility</h1>
        </div>
    );
}

export default Header;