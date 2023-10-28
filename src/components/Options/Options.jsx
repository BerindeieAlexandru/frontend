// Sidebar.js
import React from "react";
import useStyles from "./optionsStyle";

const Sidebar = ({setSelectedOption}) => {
    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            <button
                className={classes.button}
                onClick={() => setSelectedOption("find")}
            >
                Find
            </button>
            <button
                className={classes.button}
                onClick={() => setSelectedOption("rent")}
            >
                Rent
            </button>
            <button
                className={classes.button}
                onClick={() => setSelectedOption("reserve")}
            >
                Reserve
            </button>
            <div className={classes.textArea}>This app comes with the initiative to solve an actual issue related to traffic, that is electric scooters rental.</div>
        </div>
    );
}

export default Sidebar;
