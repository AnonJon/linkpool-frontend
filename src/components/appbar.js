import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Link } from "react-router-dom";
import logo from "../images/linkpoolsvg.svg";

const useStyles = makeStyles((theme) => ({
  toolbar: {},
  appBar: {
    backgroundColor: "rgb(51,57, 196)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
}));
const AppBarComp = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <a href="https://www.linkpool.io/">
              <img alt="" className="logo" src={logo} />
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComp;
