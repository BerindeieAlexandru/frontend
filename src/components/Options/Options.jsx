// Sidebar.js
import React from "react";
import useStyles from "./optionsStyle";
import {Button} from "@mui/material";

const Sidebar = ({setSelectedOption}) => {
    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            <Button
                style={{ backgroundColor: "#3f51b5", marginBottom: "18px", width: "100%" }}
                variant="contained"
                onClick={() => setSelectedOption("find")}
            >
                Find
            </Button>
            <Button
                style={{ backgroundColor: "#9c27b0", marginBottom: "18px", width: "100%" }}
                variant="contained"
                onClick={() => setSelectedOption("rent")}
            >
                Rent
            </Button>
            <Button
                style={{ backgroundColor: "#e91e63", marginBottom: "18px", width: "100%" }}
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
