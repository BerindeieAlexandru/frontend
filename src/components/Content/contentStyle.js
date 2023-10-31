import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    infoWindowContent: {
        background: "white",
        color: "black",
        fontSize: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
    },
    takeButton: {
        backgroundColor: "rgba(0, 128, 0, 0.7)",
        color: "white",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer",
        borderRadius: "10px",
        marginTop: "16px",
        transition: "background-color 0.3s, transform 0.2s",
        "&:hover": {
            backgroundColor: "rgba(0, 128, 0, 1)",
            color: "white",
            transform: "scale(1.05)",
        },
        mapContainer: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",  // Set the width to 100% to fill the screen
            height: "100vh", // Set the height to 100vh to fill the viewport height
        },
    },
}));

export default useStyles;
