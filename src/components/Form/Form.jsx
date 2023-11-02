import React, {useEffect, useState} from "react";
import {TextField, Button, Typography, Grid, Box} from "@mui/material";
import useStyles from "./formStyle";

const Form = ({rentData, handleReservationChange, userLocation, handleReservationSubmit}) => {
    const classes = useStyles();
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [formCleared, setFormCleared] = useState(false);

    const handleConfirmation = () => {
        handleReservationSubmit();
        setConfirmationMessage("Reservation submitted successfully!");
        setFormCleared(true);
    };

    useEffect(() => {
        if (confirmationMessage !== "") {
            const timer = setTimeout(() => {
                setConfirmationMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [confirmationMessage]);

    const clearForm = () => {
        rentData.firstName = "";
        rentData.lastName = "";
        rentData.phoneNumber = "";
        rentData.startTime = "";
        rentData.endTime = "";
        rentData.price = 0;
        setFormCleared(false);
    };
    return (
        <div className={classes.container}>
        <div className={classes.formBox}>
        <form className={classes.form}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        variant="outlined"
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={rentData.firstName}
                        onChange={handleReservationChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        variant="outlined"
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={rentData.lastName}
                        onChange={handleReservationChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        className={classes.input}
                        required
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={rentData.phoneNumber}
                        onChange={handleReservationChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        className={classes.input}
                        required
                        fullWidth
                        label="Start Time"
                        name="startTime"
                        type="datetime-local"
                        value={rentData.startTime}
                        onChange={handleReservationChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        className={classes.input}
                        required
                        fullWidth
                        label="End Time"
                        name="endTime"
                        type="datetime-local"
                        value={rentData.endTime}
                        onChange={handleReservationChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.input} variant="h6">Current Location</Typography>
                    <Typography className={classes.input} style={{ marginTop: "16px"}}>
                        Latitude: {userLocation.latitude}; Longitude: {userLocation.longitude}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    style={{ marginTop: "16px"}}
                    variant="outlined"
                    className={classes.input}
                    required
                    fullWidth
                    label="Price (€/hour)"
                    name="price"
                    type="number"
                    value={rentData.price}
                    onChange={handleReservationChange}
                />
            </Grid>
            <div className={classes.submitButtonContainer}>
            <Box mt={2}>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    onClick={() => {
                        handleConfirmation();
                        clearForm();
                    }}
                >
                    Send
                </Button>
            </Box>
                {confirmationMessage && (
                    <Typography variant="body1" style={{ marginLeft: "10px", marginTop: "22px", color: "green" }}>
                        {confirmationMessage}
                    </Typography>
                )}
            </div>
        </form>
        </div>
        </div>
    );
};

export default Form;