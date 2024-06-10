import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Chart = (props) => {
    const { order } = props;
    const mintwo = order.filter((ord) => ord.orderamount <= 1600).length
    const maxtwo = order.filter((ord) => ord.orderamount > 1600 && ord.orderamount < 3000).length
    const minten = order.filter((ord) => ord.orderamount > 260000 && ord.orderamount <= 3600000).length
    const maxten = order.filter((ord) => ord.orderamount > 360000 && ord.orderamount <= 720000).length
    const maxfifteen = order.filter((ord) => ord.orderamount > 720000 && ord.orderamount <= 1080000).length
    const mintwenty = order.filter((ord) => ord.orderamount > 1080000 && ord.orderamount <= 1440000).length
    const maxtwenty = order.filter((ord) => ord.orderamount > 1440000 && ord.orderamount <= 1800000).length

    const data = {
        labels: ["1600>order>0", "2800>order>1600", "360000>order>260000", "720000>order>360000", "1080000>order>720000", "1440000>order>1080000", "1800000>order>1440000",],
        datasets: [
            {
                label: "Order earn",
                data: [mintwo, maxtwo, minten, maxten, maxfifteen, mintwenty, maxtwenty],
                backgroundColor: ["orangered", "#ff7722", "#02e72c", "#1f93ff", "#9d0191", "#02e72c", "#e9d605"],
            },
        ],
    }
    return (
        <div>
            <Bar data={data} />
        </div>
    )
}
export default Chart;