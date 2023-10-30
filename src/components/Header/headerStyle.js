import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        background: "linear-gradient(45deg, #212ff3 20%, #9C27B0 50%, #880E4F 80%)",
        padding: theme.spacing(2),
        textAlign: "center",
        borderRadius: "13px !important",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    },
    headerText: {
        color: "white",
        textTransform: "uppercase",
    },
}));

export default useStyles;
