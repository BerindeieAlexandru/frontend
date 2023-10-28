import React, { useState, useEffect } from "react";
import {TextField, Button} from "@mui/material";

const Content = ({ selectedOption }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [userLocationText, setUserLocationText] = useState("");
    const [reservationData, setReservationData] = useState({
        name: "",
        phoneNumber: "",
        startTime: "",
        endTime: "",
        location: "",
    });
    const handleReservationChange = (e) => {
        const { name, value } = e.target;
        setReservationData({ ...reservationData, [name]: value });
    };
    const handleReservationSubmit = () => {
        // Code to send the reservation data
        // You can send the reservation data to your backend or handle it as needed
    };
    useEffect(() => {
        if (selectedOption === "find") {
            // Check if the "Find" button is pressed
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.error("Error getting user location:", error);
                    }
                );
            } else {
                console.error("Geolocation is not available in this browser.");
            }
        }
    }, [selectedOption]);
    return (
        <div style={{ flex: 1, padding: "20px" }}>
            {selectedOption === "find" && userLocation && (
                <div>
                    <p>User's Location:</p>
                    <p>Latitude: {userLocation.latitude}</p>
                    <p>Longitude: {userLocation.longitude}</p>
                </div>
            )}
            {selectedOption === "rent" && userLocation && (
                <div>
                    <p>Renter's Location:</p>
                    <p>Latitude: {userLocation.latitude}</p>
                    <p>Longitude: {userLocation.longitude}</p>
                </div>
            )}
            {selectedOption === "reserve" && (
                <div>
                    <form>
                        <div style={{ marginBottom: "10px" }}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={reservationData.firstName}
                                onChange={handleReservationChange}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={reservationData.lastName}
                                onChange={handleReservationChange}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                value={reservationData.phoneNumber}
                                onChange={handleReservationChange}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <TextField
                                label="Start Time"
                                name="startTime"
                                type="datetime-local"
                                value={reservationData.startTime}
                                onChange={handleReservationChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <TextField
                                label="End Time"
                                name="endTime"
                                type="datetime-local"
                                value={reservationData.endTime}
                                onChange={handleReservationChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div>
                            <p>Current Location</p>
                            <p>Latitude: {userLocation.latitude}; Longitude: {userLocation.longitude}</p>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleReservationSubmit}
                            >
                                Send Reservation
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Content;