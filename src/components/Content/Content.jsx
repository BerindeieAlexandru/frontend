import React, { useState, useEffect } from "react";
import {TextField, Button} from "@mui/material";
import Map from "../Map/Map";
import axios from "axios";
import {log} from "util";

const Content = ({ selectedOption }) => {

    const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});
    const [scooterDataLoaded, setScooterDataLoaded] = useState(false);
    const [infoWindow, setInfoWindow] = useState(null);
    const [reservationData, setReservationData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        startTime: "",
        endTime: "",
        location: "",
        available: "yes",
    });
    const [scooterdata, setScooterdata] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/get-reservation-data")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Reservation data:", data);
                setScooterdata(data);
                setScooterDataLoaded(true);
            })
            .catch((error) => {
                console.error("Error fetching reservation data:", error);
            });
    }, []);

    const handleReservationChange = (e) => {
        const { name, value } = e.target;
        setReservationData({ ...reservationData, [name]: value });
    };

    const handleReservationSubmit = () => {
        const dataToSend = {
            firstName: reservationData.firstName,
            lastName: reservationData.lastName,
            phoneNumber: reservationData.phoneNumber,
            startTime: reservationData.startTime,
            endTime: reservationData.endTime,
            location: `Latitude: ${userLocation.latitude}; Longitude: ${userLocation.longitude}`,
            available: "yes",
        };

        // Send a POST request to your Flask API
        axios.post("http://localhost:5000/create-reservation", dataToSend)
            .then((response) => {
                // Handle the response from the server (e.g., success message)
                console.log(response.data);
            })
            .catch((error) => {
                // Handle errors (e.g., error message)
                console.error(error);
            });
    };


    useEffect(() => {
        if (selectedOption === "find") {
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

    useEffect(() => {
        if (userLocation && scooterDataLoaded && document.getElementById("map")) {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: userLocation.latitude, lng: userLocation.longitude },
                zoom: 15,
            });

            scooterdata.forEach((el) => {
                const locationMatch = el.location.match(/Latitude: ([-+]?\d*\.\d+|\d+); Longitude: ([-+]?\d*\.\d+|\d+)/);

                if (locationMatch && locationMatch.length === 3) {
                    const latitude = parseFloat(locationMatch[1]);
                    const longitude = parseFloat(locationMatch[2]);

                    if (!isNaN(latitude) && !isNaN(longitude) && isFinite(latitude) && isFinite(longitude)) {
                        const marker = new window.google.maps.Marker({
                            position: {
                                lat: latitude,
                                lng: longitude,
                            },
                            map,
                            title: "Scooter",
                        });

                        // Extract first name, last name, and phone number
                        const { first_name, last_name, phone_number } = el;

                        // Create content for the InfoWindow
                        let infoWindowContent = `
                        <div>
                            <p>First Name: ${first_name}</p>
                            <p>Last Name: ${last_name}</p>
                            <p>Phone Number: ${phone_number}</p>
                        </div>
                    `;

                        // Create an InfoWindow for each marker
                        const infoWindow = new window.google.maps.InfoWindow({
                            content: infoWindowContent,
                        });

                        // Inside your useEffect where you create markers
                        marker.addListener("click", () => {
                            if (infoWindow) {
                                infoWindow.close();
                            }
                            infoWindow.setContent(infoWindowContent);

                            // Create a "Take" button
                            const takeButton = document.createElement("button");
                            takeButton.textContent = "Take";

                            takeButton.addEventListener("click", () => {
                                // Send a POST request to update scooter availability
                                axios.post("http://localhost:5000/update-scooter", {
                                    first_name: first_name,
                                    last_name: last_name,
                                })
                                    .then((response) => {
                                        if (response.status === 200) {
                                            // Close the InfoWindow
                                            infoWindow.close();
                                            // Remove the marker from the map
                                            marker.setMap(null);
                                        } else {
                                            console.error("Failed to update scooter availability.");
                                        }
                                    })
                                    .catch((error) => {
                                        console.error("Error updating scooter availability:", error);
                                    });
                            });

                            infoWindowContent += takeButton.outerHTML;
                            infoWindow.setContent(infoWindowContent);
                            infoWindow.open(map, marker);
                            setInfoWindow(infoWindow);
                        });
                    }
                }
            });
        }
    }, [userLocation, scooterdata, scooterDataLoaded]);


    return (
        <div style={{ flex: 1, padding: "20px" }}>
            {selectedOption === "find" && userLocation && scooterdata.length > 0 &&(
                <div>
                    <div id="map" style={{ width: "100%", height: "600px" }}></div>
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