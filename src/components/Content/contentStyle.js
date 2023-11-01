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
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: theme.spacing(2),
    },
    label: {
        fontWeight: "bold",
        marginBottom: theme.spacing(1),
    },
    input: {
        padding: theme.spacing(1),
        border: "1px solid #ccc",
        borderRadius: theme.spacing(0.5),
    },
}));

export default useStyles;
