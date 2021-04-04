import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "../style/CustomButtons/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "500px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    "& label.Mui-focused": {
      color: "green",
    },
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(51,57,196)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(51,57,196)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(51,57,196)",
      },
      "&:hover fieldset": {
        borderColor: "rgb(51,57,196)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(51,57,196)",
      },
    },
  },
})(TextField);

const CheckModal = (props) => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [round, setRound] = useState("");
  const [roundPrice, setRoundPrice] = useState(null);
  const [roundTime, setRoundTime] = useState(null);

  useEffect(() => {});
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeRound = (e) => {
    setRound(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRoundPrice(null);
    setRoundTime(null);
    const url = `https://${process.env.REACT_APP_URL}/api/roundInfo/${round}`;
    const res = await axios.get(url);
    let price = res.data.data.answer.slice(0, 8);
    let date = parseInt(res.data.data.updated);
    price =
      price.slice(0, 2) + "," + price.slice(2, 5) + "." + price.slice(5, -1);
    setRoundPrice(price);
    setRoundTime(moment.unix(date).format("dddd, MMMM, Do, YYYY h:mm:ss A"));
  };

  return (
    <div>
      <Button color="info" type="button" onClick={handleOpen}>
        Look Up A Round
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Container className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <CssTextField
                id="round"
                name="round"
                onChange={onChangeRound}
                label={`Round (Max ${props.round})`}
                type="text"
                margin="normal"
                required
                autoFocus
              />
              <Button color="info" type="submit">
                Check
              </Button>
            </form>
          </Container>
          {roundPrice ? (
            <div>
              <h1>Price:</h1>
              <h2>{roundPrice}</h2>
            </div>
          ) : null}
          {roundTime ? (
            <div>
              <h1>Date:</h1>
              <h2>{roundTime}</h2>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default CheckModal;
