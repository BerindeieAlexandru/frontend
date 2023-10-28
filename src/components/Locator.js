import React, { useEffect, useState } from "react";

function Locator() {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        // Check if geolocation is available in the browser
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } else {
            console.log("Geolocation is not available in this browser.");
        }
    }, []);

    return (
        <div>
            <h2>Your Location:</h2>
            {latitude !== null && longitude !== null ? (
                <p>
                    Latitude: {latitude}, Longitude: {longitude}
                </p>
            ) : (
                <p>Loading location...</p>
            )}
        </div>
    );
}

export default Locator;
