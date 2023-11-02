import React, { useState, useEffect } from "react";
import {TextField, Button, CircularProgress} from "@mui/material";
import axios from "axios";
import useStyles from "./contentStyle";
import Form from "../Form/Form";

import customMarkerIcon from "./scooter1.png";
const customMarkerIconSize = new window.google.maps.Size(40, 40);
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
    const [rentData, setRentData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        startTime: "",
        endTime: "",
        location: "",
        available: "yes",
        price: 0,
    });
    // info window for scooters on map
    const [infoWindow, setInfoWindow] = useState(null);

    // check if map is initialized
    const [mapInitialized, setMapInitialized] = useState(false);

    // check if map is initialized for reservation
    const [rmapInitialized, setrMapInitialized] = useState(false);

    // check if markers are initialized for finding a scooter
    const [markersInitialized, setMarkersInitialized] = useState(false);

    // check if markers are initialized for reservation
    const [rmarkersInitialized, setrMarkersInitialized] = useState(false);

    // handle reservation data change
    const handleRentalChange = (e) => {
        const { name, value } = e.target;
        setRentData({ ...rentData, [name]: value });
    };

    // handle reservation submit
    const handleRentalSubmit = () => {
        const dataToSend = {
            firstName: rentData.firstName,
            lastName: rentData.lastName,
            phoneNumber: rentData.phoneNumber,
            startTime: rentData.startTime,
            endTime: rentData.endTime,
            location: `Latitude: ${userLocation.latitude}; Longitude: ${userLocation.longitude}`,
            available: "yes",
            price: rentData.price,
        };

        axios.post("http://localhost:5000/add-scooter", dataToSend)
            .then((response) => {
                // console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // initialize google map for finding a scooter
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

    // initialize google map for reserving a scooter
    const initGoogleMapReserve = (latitude, longitude) => {
        const map = new window.google.maps.Map(document.getElementById("resmap"), {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
        });
        if (!markersInitialized) {
            setrMarkers(map, scooterdata);
        }
    }

    // Function to create markers on the map for finding a scooter
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
                        icon: {
                            url: customMarkerIcon,
                            scaledSize: customMarkerIconSize,
                        },
                    });

                    // Extract first name, last name, and phone number
                    const { first_name, last_name, phone_number, price_per_hour } = el;

                    // Create a div element for the InfoWindow content
                    const infoWindowContent = document.createElement("div");
                    infoWindowContent.classList.add(classes.infoWindowContent);
                    infoWindowContent.innerHTML = `
                    <p>First Name: ${first_name}</p>
                    <p>Last Name: ${last_name}</p>
                    <p>Phone Number: ${phone_number}</p>
                    <p>Price: ${price_per_hour} €/h</p>
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

    // Function to create markers on the map for reserving a scooter
    const setrMarkers = (map, scooterdata) => {
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
                        icon: {
                            url: customMarkerIcon,
                            scaledSize: customMarkerIconSize,
                        },
                    });

                    // Extract first name, last name, and phone number
                    const { first_name, last_name, phone_number, price_per_hour } = el;

                    // Create a div element for the InfoWindow content
                    const infoWindowContent = document.createElement("div");
                    infoWindowContent.classList.add(classes.infoWindowContent);

                    const form = document.createElement("form");
                    // Add form fields for first name, last name, phone number, and starting/ending date and time pickers
                    form.innerHTML = `
                        <form class="${classes.form}">
                        <input type="hidden" name="first_name" id="first_name" value="${first_name}" />
                        <input type="hidden" name="last_name" id="last_name" value="${last_name}" />
                        <div class="${classes.formGroup}">
                            <label class="${classes.label}" htmlFor="firstName">First Name:</label>
                            <input class="${classes.input}" type="text" id="firstName" name="firstName" required />
                        </div>
                        <div class="${classes.formGroup}">
                            <label class="${classes.label}" htmlFor="lastName">Last Name:</label>
                            <input class="${classes.input}" type="text" id="lastName" name="lastName" required />
                        </div>
                        <div class="${classes.formGroup}">
                            <label class="${classes.label}" htmlFor="phoneNumber">Phone Number:</label>
                            <input class="${classes.input}" type="text" id="phoneNumber" name="phoneNumber" required />
                        </div>
                        <div class="${classes.formGroup}">
                            <label class="${classes.label}" htmlFor="startTime">Start Time:</label>
                            <input class="${classes.input}" type="datetime-local" id="startTime" name="startTime" required />
                        </div>
                        <div class="${classes.formGroup}">
                            <label class="${classes.label}" htmlFor="endTime">End Time:</label>
                            <input class="${classes.input}" type="datetime-local" id="endTime" name="endTime" required />
                        </div>
                        <button class="reserve-button ${classes.takeButton}">Reserve</button>
                    </form>
                    `;
                    infoWindowContent.appendChild(form);
                    // Create an InfoWindow for each marker
                    const infoWindow = new window.google.maps.InfoWindow({
                        content: infoWindowContent,
                    });
                    marker.addListener("click", () => {
                        if (infoWindow) {
                            infoWindow.close();
                        }
                        infoWindow.open(map, marker);
                            // Handle form submission
                            form.addEventListener("submit", (e) => {
                                e.preventDefault();
                                const formData = new FormData(form);
                                const dataToSend = {
                                    owner_first_name: formData.get("first_name"),
                                    owner_last_name: formData.get("last_name"),
                                    firstName: formData.get("firstName"),
                                    lastName: formData.get("lastName"),
                                    phoneNumber: formData.get("phoneNumber"),
                                    startTime: formData.get("startTime"),
                                    endTime: formData.get("endTime"),
                                    location: `Latitude: ${latitude}; Longitude: ${longitude}`,
                                };
                                console.log(dataToSend);
                                //to add in a db the reservation
                                axios.post("http://localhost:5000/add-reservation", dataToSend)
                                    .then((response) => {
                                        if (response.status === 201) {
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
                            }
                        );
                        }
                    );
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
        fetch("http://localhost:5000/available-scooters")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setScooterdata(data);
                setScooterDataLoaded(true);
            })
            .catch((error) => {
                console.error("Error fetching reservation data:", error);
            });
    }, []);

    // initialize google map when user location and scooter data are fetched for finding a scooter
    useEffect(() => {
        if (selectedOption==="find" || (!mapInitialized && userLocation && scooterDataLoaded && document.getElementById("map"))) {
            initGoogleMap(userLocation.latitude, userLocation.longitude);
            setMapInitialized(true);
        }
    }, [userLocation, scooterDataLoaded, mapInitialized, initGoogleMap]);

    // initialize google map when user location and scooter data are fetched for reserving a scooter
    useEffect(() => {
        if (selectedOption==="reserve" || (!mapInitialized && userLocation && scooterDataLoaded && document.getElementById("resmap"))) {
            initGoogleMapReserve(userLocation.latitude, userLocation.longitude);
            setrMapInitialized(true);
        }
    }, [userLocation, scooterDataLoaded, mapInitialized, initGoogleMapReserve]);

    return (
        <div style={{position:"absolute", top:"0vh", left: "0vh", width:"100%", zIndex:"1"}}>
            {selectedOption === "find" && (
                <div className={classes.mapContainer}>
                    {userLocation ? (
                        <div>
                            <div id="map" style={{width: "100%", height: "98vh", borderRadius:"15px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", border: "1px solid #ddd", overflow: "hidden", position: "relative"}}></div>
                        </div>
                    ) : (
                        <CircularProgress />
                    )}
                </div>
            )}
            {selectedOption === "reserve" && userLocation && (
                <div className={classes.mapContainer}>
                    {userLocation ? (
                        <div>
                            <div id="resmap" style={{ width: "100%", height: "98vh", borderRadius: "15px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", border: "1px solid #ddd", overflow: "hidden", position: "relative" }}></div>
                        </div>
                    ) : (
                        <CircularProgress />
                    )}
                </div>
            )}
            {selectedOption === "rent" && (
                <Form rentData={rentData} handleRentalChange={handleRentalChange} userLocation={userLocation} handleRentalSubmit={handleRentalSubmit}/>
            )}
        </div>
    );
}

export default Content;