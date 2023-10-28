// sidebarStyle.js
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        backgroundColor: "white",
        color: "white",
        width: "200px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "blue",
        color: "white",
        margin: "5px",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    textArea: {
        backgroundColor: "blue",
        color: "white",
        margin: "5px",
        padding: "10px",
        borderRadius: "5px",
    },
}));

export default useStyles;
