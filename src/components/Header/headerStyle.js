// headerStyle.js
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: "blue",
        padding: "10px",
        textAlign: "center",
        borderRadius: "10px",
    },
    headerText: {
        color: "white",
        textTransform: "uppercase",
    },
}));

export default useStyles;
