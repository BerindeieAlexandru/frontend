import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        background: "linear-gradient(45deg, rgba(33, 47, 243, 0.9) 20%, rgba(156, 39, 176, 0.8) 50%, rgba(136, 14, 79, 0.9) 80%)",
        width: "200px",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        position: 'absolute',
        top: '37vh',
        left: '10px',
        zIndex: 2,
    },
    textArea: {
        background: "rgba(255, 255, 255, 0.2)",
        color: "white",
        margin: "10px 0",
        padding: "10px",
        borderRadius: "5px",
    },
}));

export default useStyles;
