import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import moment from "moment";

export default class CoinGraphWeekly extends Component {
  state = {
    options: {
      chart: {
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 5000,
        },
      },
      colors: ["#ffffff"],
      xaxis: {
        categories: Array.from({ length: 50 }, (_, i) => ""),
        title: {
          text: "Daily",
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
          opacityFrom: 0.8,
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
          highlightDataSeries: true,
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
        width: 3,
        dashArray: 0,
      },
      markers: {
        size: 0,
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
    },
    series: [
      {
        name: "Price BTC/USD",
        data: [],
      },
    ],
  };
  async componentDidMount() {
    const url = `https://${process.env.REACT_APP_URL}/api/getLastX/100`;
    const response = await axios.get(url);
    const data = await response;
    let new_data = data.data.data.reverse();
    let date1 = parseInt(new_data[0].time);
    let date2 = parseInt(new_data[new_data.length - 1].time);
    let priceData = [];
    for (let i of new_data) {
      priceData.push(i.amount.slice(0, 7));
    }

    this.setState({
      series: [{ data: priceData }],
      options: {
        xaxis: {
          categories: Array.from({ length: 100 }, (_, i) => ""),
          title: {
            text: `${moment
              .unix(date1)
              .format("dddd, MMMM, Do, YYYY")} - ${moment
              .unix(date2)
              .format("dddd, MMMM, Do, YYYY")}`,
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
