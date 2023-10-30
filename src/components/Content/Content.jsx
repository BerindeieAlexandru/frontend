import React, { useState, useEffect } from "react";
import {TextField, Button, CircularProgress} from "@mui/material";
import axios from "axios";
import {log} from "util";
import useStyles from "./contentStyle";
import Form from "../Form/Form";

const Content = ({ selectedOption }) => {

    //style data
    const classes = useStyles();

    // user location
    const [userLocation, setUserLocation] = useState(null);

    // scooter data
    const [scooterdata, setScooterdata] = useState([]);

    // check if scooter data is fetched
    const [scooterDataLoaded, setScooterDataLoaded] = useState(false);

    // reservation data
    const [reservationData, setReservationData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        startTime: "",
        endTime: "",
        location: "",
        available: "yes",
    });

    // info window for scooters on map
    const [infoWindow, setInfoWindow] = useState(null);

    // map data
    const [mapData, setMapData] = useState(null);

    // check if map is initialized
    const [mapInitialized, setMapInitialized] = useState(false);

    // check if markers are initialized
    const [markersInitialized, setMarkersInitialized] = useState(false);

    // handle reservation data change
    const handleReservationChange = (e) => {
        const { name, value } = e.target;
        setReservationData({ ...reservationData, [name]: value });
    };

    // handle reservation submit
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

        axios.post("http://localhost:5000/create-reservation", dataToSend)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // initialize google map
    const initGoogleMap = (latitude, longitude) => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
        });
        if (!markersInitialized)
        {
            setMarkers(map, scooterdata);
        }
    };

    // Function to create markers on the map
    const setMarkers = (map, scooterdata) => {
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

                    // Create a div element for the InfoWindow content
                    const infoWindowContent = document.createElement("div");
                    infoWindowContent.classList.add(classes.infoWindowContent);
                    infoWindowContent.innerHTML = `
                    <p>First Name: ${first_name}</p>
                    <p>Last Name: ${last_name}</p>
                    <p>Phone Number: ${phone_number}</p>
                    <button class="take-button ${classes.takeButton}">Take</button>
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
                        infoWindow.open(map, marker);

                        // Handle the "Take" button click
                        const takeButton = infoWindowContent.querySelector(".take-button");
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
                                        setScooterdata((prevScooterData) => prevScooterData.filter(scooter => scooter.first_name !== first_name && scooter.last_name !== last_name));
                                    } else {
                                        console.error("Failed to update scooter availability.");
                                    }
                                })
                                .catch((error) => {
                                    console.error("Error updating scooter availability:", error);
                                });
                        });
                    });
                }
            }
        });
    };

    // get user location
    useEffect(() => {
        if (!userLocation) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        setUserLocation({latitude, longitude});
                        console.log("User location obtained.")
                    },
                    (error) => {
                        console.error("Error getting user location:", error);
                    }
                );
            } else {
                console.error("Geolocation is not available in this browser.");
            }
        }
    }, []);

    // fetch scooter data and set variable for loaded data true
    useEffect(() => {
        fetch("http://localhost:5000/get-reservation-data")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Scooter data obtained.")
                setScooterdata(data);
                setScooterDataLoaded(true);
            })
            .catch((error) => {
                console.error("Error fetching reservation data:", error);
            });
    }, []);

    // initialize google map when user location and scooter data are fetched
    useEffect(() => {
        if (selectedOption==="find" || (!mapInitialized && userLocation && scooterDataLoaded && document.getElementById("map"))) {
            initGoogleMap(userLocation.latitude, userLocation.longitude);
            setMapInitialized(true);
        }
    }, [userLocation, scooterDataLoaded, mapInitialized, initGoogleMap]);

    return (
        <div style={{ flex: 1, padding: "20px" }}>
            {selectedOption === "find" && (
                <div>
                    {userLocation ? (
                        <div>
                            <div id="map" style={{ width: "100%", height: "600px" }}></div>
                        </div>
                    ) : (
                        <CircularProgress />
                    )}
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
                <Form reservationData={reservationData} handleReservationChange={handleReservationChange} userLocation={userLocation} handleReservationSubmit={handleReservationSubmit}/>
            )}
        </div>
    );
}

export default Content;