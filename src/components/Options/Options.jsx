// Sidebar.js
import React from "react";
import useStyles from "./optionsStyle";
import {Button} from "@mui/material";

const Sidebar = ({setSelectedOption}) => {
    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            <Button
                style={{ backgroundColor: "rgba(63, 81, 181, 0.8)", marginBottom: "18px", width: "100%" }}
                variant="contained"
                onClick={() => setSelectedOption("find")}
            >
                Find
            </Button>
            <Button
                style={{ backgroundColor: "rgba(156, 39, 176, 0.8)", marginBottom: "18px", width: "100%" }}
                variant="contained"
                onClick={() => setSelectedOption("rent")}
            >
                Rent
            </Button>
            <Button
                style={{ backgroundColor: "rgba(233, 30, 99, 0.8)", marginBottom: "18px", width: "100%" }}
                variant="contained"
                onClick={() => setSelectedOption("reserve")}
            >
                Reserve
            </Button>
            <div className={classes.textArea}>
                This app comes with the initiative to solve an actual issue related to traffic, that is electric scooters rental.
            </div>
        </div>
    );
}

export default Sidebar;
