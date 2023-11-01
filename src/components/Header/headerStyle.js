import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        background: "linear-gradient(45deg, rgba(33, 47, 243, 0.6) 20%, rgba(156, 39, 176, 0.9) 50%, rgba(136, 14, 79, 0.6) 80%)",
        padding: theme.spacing(2),
        textAlign: "center",
        borderRadius: "13px !important",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        position: 'absolute',
        top: '6.5vh',
        left: '10px',
        width: '97%',
        zIndex: 2,
    },
    headerText: {
        color: "white",
        textTransform: "uppercase",
    },
}));

export default useStyles;
