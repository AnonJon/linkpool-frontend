import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import CoinGraphHourly from "../components/graphs/hourlyValueGraph";
import CoinGraphDaily from "../components/graphs/dailyValueGraph";
import CoinGraphWeekly from "../components/graphs/weeklyValueGraph";
import CheckModal from "../components/checkModal";
import AppBarComp from "../components/appbar";
import Card from "../style/Card/Card";
import CardHeader from "../style/UserProfile/Card/CardHeader";
import GridContainer from "../style/Grid/GridContainer";
import GridItem from "../style/Grid/GridItem.js";
import CardBody from "../style/Card/CardBody";
import CardFooter from "../style/Card/CardFooter";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "../style/assets/jss/material-dashboard-react/views/dashboardStyle";
import btc from "../images/btc-80x80.png";

const useStyles = makeStyles(styles);

const Home = () => {
  const classes = useStyles();
  const [currentPrice, setCurrentPrice] = useState(null);
  const [currentRound, setCurrentRound] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [roundUpdated, setRoundUpdated] = useState(null);

  useEffect(() => {
    async function wrapper() {
      const url = `https://${process.env.REACT_APP_URL}/api/getLatestRound`;
      const res = await axios.get(url);
      let date = parseInt(res.data.data.updated);
      let price = res.data.data.answer.slice(0, 8);
      price =
        price.slice(0, 2) + "," + price.slice(2, 5) + "." + price.slice(5, -1);
      setCurrentPrice(price);
      setCurrentRound(res.data.data.round);
      setLastUpdated(
        moment.unix(date).format("dddd, MMMM, Do, YYYY h:mm:ss A")
      );
      setRoundUpdated(res.data.data.round);
    }
    wrapper();
  }, []);
  return (
    <div style={{ marginTop: "100px" }}>
      <AppBarComp />
      <CheckModal round={roundUpdated} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader>
              <h1>${!currentPrice ? <CircularProgress /> : currentPrice}</h1>
            </CardHeader>
            <CardBody>
              <div style={{ display: "flex" }}>
                <h4 className={classes.cardTitle}>Current Price</h4>
              </div>
              <p className={classes.cardCategory}>BTC/USD</p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader>
              <h1>{!currentRound ? <CircularProgress /> : currentRound}</h1>
            </CardHeader>
            <CardBody>
              <div style={{ display: "flex" }}>
                <h4 className={classes.cardTitle}>Current Round</h4>
              </div>
              <p className={classes.cardCategory}>BTC/USD</p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader>
              <h1>{!lastUpdated ? <CircularProgress /> : lastUpdated}</h1>
            </CardHeader>
            <CardBody>
              <div style={{ display: "flex" }}>
                <h4 className={classes.cardTitle}>Round Last Updated</h4>
              </div>
              <p className={classes.cardCategory}>BTC/USD</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="rose">
              <CoinGraphHourly />
            </CardHeader>
            <CardBody>
              <div style={{ display: "flex" }}>
                <img
                  src={btc}
                  style={{ height: "25px", width: "25px", marginRight: "5px" }}
                  alt=""
                />
                <h4 className={classes.cardTitle}>BTC/USD</h4>
              </div>
              <p className={classes.cardCategory}>Hourly Performance</p>
            </CardBody>
            <CardFooter chart></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="rose">
              <CoinGraphDaily />
            </CardHeader>
            <CardBody>
              <div style={{ display: "flex" }}>
                <img
                  src={btc}
                  style={{ height: "25px", width: "25px", marginRight: "5px" }}
                  alt=""
                />
                <h4 className={classes.cardTitle}>BTC/USD</h4>
              </div>
              <p className={classes.cardCategory}>Daily Performance</p>
            </CardBody>
            <CardFooter chart></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="rose">
              <CoinGraphWeekly />
            </CardHeader>
            <CardBody>
              <div style={{ display: "flex" }}>
                <img
                  src={btc}
                  style={{ height: "25px", width: "25px", marginRight: "5px" }}
                  alt=""
                />
                <h4 className={classes.cardTitle}>BTC/USD</h4>
              </div>
              <p className={classes.cardCategory}>Weekly Performance</p>
            </CardBody>
            <CardFooter chart></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Home;
