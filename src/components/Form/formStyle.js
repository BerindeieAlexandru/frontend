import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "75vh",
    },
    formBox: {
        background: "linear-gradient(45deg, #212ff3 20%, #9C27B0 50%, #880E4F 80%)",
        padding: "20px",
        borderRadius: "10px !important",
        border: "1px solid #000",
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(2),
    },
    submitButtonContainer: {
        display: "flex",
        justifyContent: "center", // Center the button horizontally
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submitButton: {
        margin: theme.spacing(3, 0, 2),
        width: "100%", // Adjust the button width as needed
    },
    input: {
        background: "rgba(255, 255, 255, 0.4)", // Increase contrast for text
        padding: "10px",
        borderRadius: "5px", // Add rounded borders for inputs
        marginTop: "10px",
        marginBottom: "10px",
        display:"flex",
        justifyContent:"center"
    },
}));

export default useStyles;