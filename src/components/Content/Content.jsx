import React, { useState, useEffect } from "react";
import {CircularProgress} from "@mui/material";
import useStyles from "./contentStyle";
import Form from "../Form/Form";
import {addScooter, addReservation, updateScooter} from "../../api";

import customMarkerIcon from "./scooter1.png";
const customMarkerIconSize = new window.google.maps.Size(40, 40);
const Content = ({ selectedOption }) => {

    //base url for api calls
    const baseURL = 'http://localhost:5000';

    //style data
    const classes = useStyles();

    // store map instance
    const [map, setMap] = useState(null);

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

    // check if map is initialized
    const [mapInitialized, setMapInitialized] = useState(false);

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

        addScooter(dataToSend)
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
        setMarkers(map, scooterdata);
    };

    // initialize google map for reserving a scooter
    const initGoogleMapReserve = (latitude, longitude) => {
        const map = new window.google.maps.Map(document.getElementById("resmap"), {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
        });
        setrMarkers(map, scooterdata);
    };

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
                    <div class="${classes.formGroup}">
                            <input type="hidden" name="ofirst_name" id="ofirst_name" value="${first_name}" />
                            <input type="hidden" name="olast_name" id="olast_name" value="${last_name}" />
                            <div class="${classes.text}">First Name: ${first_name}</div>
                            <div class="${classes.text}">Last Name: ${last_name}</div>
                            <div class="${classes.text}">Phone Number: ${phone_number}</div>
                            <div class="${classes.text}">Price: ${price_per_hour} €/h</div>
                            <label class="${classes.label}" htmlFor="startTime">Start Time:</label>
                            <input class="${classes.input}" type="datetime-local" id="startTime" name="startTime" required />
                        </div>
                        <div class="${classes.formGroup}">
                            <label class="${classes.label}" htmlFor="endTime">End Time:</label>
                            <input class="${classes.input}" type="datetime-local" id="endTime" name="endTime" required />
                        </div>
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

                            const startTime = infoWindowContent.querySelector("#startTime").value;
                            const endTime = infoWindowContent.querySelector("#endTime").value;
                            const o_fname = infoWindowContent.querySelector("#ofirst_name").value;
                            const o_lname = infoWindowContent.querySelector("#olast_name").value;

                            updateScooter({
                                owner_first_name: o_fname,
                                owner_last_name: o_lname,
                                first_name: first_name,
                                last_name: last_name,
                                start_time: startTime,
                                end_time: endTime,
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
                    const { first_name, last_name} = el;

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
                        <div class="${classes.centerButton}">
                        <button class="reserve-button ${classes.takeButton}">Reserve</button>
                        </div>
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
                                addReservation(dataToSend)
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
    }, [userLocation]);

    const fetchScooterData = () => {
        fetch(baseURL + "/available-scooters")
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
    };

    // Fetch scooter data
    useEffect(() => {
        const fetchInterval = setInterval(() => {
            fetchScooterData();
        }, 20000);

        return () => {
            clearInterval(fetchInterval);
        };
    }, []);

    // initialize google map when user location and scooter data are fetched for finding a scooter
    useEffect(() => {
        if (selectedOption==="find" || (!mapInitialized && userLocation && scooterDataLoaded && document.getElementById("map"))) {
            initGoogleMap(userLocation.latitude, userLocation.longitude);
            setMapInitialized(true);
        }
    }, [selectedOption, userLocation, scooterDataLoaded, mapInitialized, initGoogleMap]);

    // initialize google map when user location and scooter data are fetched for reserving a scooter
    useEffect(() => {
        if (selectedOption==="reserve" || (!mapInitialized && userLocation && scooterDataLoaded && document.getElementById("resmap"))) {
            initGoogleMapReserve(userLocation.latitude, userLocation.longitude);
        }
    }, [selectedOption, userLocation, scooterDataLoaded, mapInitialized, initGoogleMapReserve]);

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