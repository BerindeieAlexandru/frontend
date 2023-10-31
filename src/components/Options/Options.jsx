// Sidebar.js
import React from "react";
import useStyles from "./optionsStyle";
import {Button} from "@mui/material";

const Sidebar = ({setSelectedOption}) => {
    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            <Button style={{color:"white", backgroundColor:"rgba(255, 255, 255, 0.3)"}}
                variant="outlined"
                onClick={() => setSelectedOption("find")}
            >
                Find
            </Button>
            <Button style={{color:"white", backgroundColor:"rgba(255, 255, 255, 0.3)"}}
                variant="outlined"
                className={classes.button}
                onClick={() => setSelectedOption("rent")}
                >
                Rent
            </Button>
            <Button
                variant="outlined" style={{color:"white", backgroundColor:"rgba(255, 255, 255, 0.3)"}}
                className={classes.button}
                onClick={() => setSelectedOption("reserve")}
            >
                Reserve
            </Button>
            <div className={classes.textArea}>This app comes with the initiative to solve an actual issue related to traffic, that is electric scooters rental.</div>
        </div>
    );
}

export default Sidebar;
