import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        background: "linear-gradient(45deg, #212ff3 20%, #9C27B0 50%, #880E4F 80%)",
        width: "200px",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        height: "81vh",
        justifyContent: "space-between",
        marginTop: "15px",
    },
    textArea: {
        background: "rgba(255, 255, 255, 0.2)",
        color: "white",
        margin: "5px",
        padding: "10px",
        borderRadius: "5px",
    },
}));

export default useStyles;
