import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import moment from "moment";

export default class CoinGraphHourly extends Component {
  state = {
    options: {
      chart: {
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 5000,
        },
        foreColor: "#ccc",
      },
      colors: ["#ffffff"],
      xaxis: {
        categories: Array.from({ length: 7 }, (_, i) => ""),
        title: {
          text: "Hourly",
        },
      },
      yaxis: {
        title: {
          text: "$ USD",
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        strokeDashArray: 2,
        borderColor: "#90A4AE",
      },
      fill: {
        type: "gradient",
        gradient: {
          enabled: true,
          opacityFrom: 0.75,
          opacityTo: 0,
        },
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        theme: false,
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        x: {
          show: true,
          format: "dd MMM",
          formatter: undefined,
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName) => seriesName,
          },
        },
        z: {
          formatter: undefined,
          title: "Size: ",
        },

        fixed: {
          enabled: false,
          position: "topRight",
          offsetX: 0,
          offsetY: 0,
        },
      },
      marker: {
        show: true,
      },

      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 4,
        dashArray: 0,
      },
      markers: {
        size: 1,
        colors: undefined,
        strokeColors: "#fff",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        hover: {
          size: undefined,
          sizeOffset: 3,
        },
      },
      chart: {
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: "#515151",
          opacity: 0.35,
        },
      },
    },
    series: [
      {
        name: "Price BTC/USD",
        data: [],
      },
    ],
  };
  async componentDidMount() {
    const url = `https://${process.env.REACT_APP_URL}/api/getLastX/7`;
    const response = await axios.get(url);
    const data = await response;
    let new_data = data.data.data.reverse();
    let date1 = parseInt(new_data[0].time);
    let date2 = parseInt(new_data[new_data.length - 1].time);
    let priceData = [];
    for (let i of new_data) {
      console.log(i);
      priceData.push(i.amount.slice(0, 7));
    }

    this.setState({
      series: [{ data: priceData }],
      options: {
        xaxis: {
          categories: Array.from({ length: 20 }, (_, i) => ""),
          title: {
            text: `${moment.unix(date1).format("h:mm:ss A")} - ${moment
              .unix(date2)
              .format("h:mm:ss A")}`,
          },
        },
      },
    });
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"
        />
      </div>
    );
  }
}
