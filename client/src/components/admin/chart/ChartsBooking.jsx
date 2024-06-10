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

const ChartBooking = (props) => {
    const { order } = props;
    const mintwo = order.filter((ord) => ord.bookingamount <= 200).length
    const maxtwo = order.filter((ord) => ord.bookingamount > 200 && ord.bookingamount < 500).length
    const maxten = order.filter((ord) => ord.bookingamount > 500 && ord.bookingamount <= 1000).length
    const maxfifteen = order.filter((ord) => ord.bookingamount > 1000 && ord.bookingamount <= 1500).length
    const maxtwenty = order.filter((ord) => ord.bookingamount > 1500 && ord.bookingamount <= 2000).length

    const data = {
        labels: ["2000order>0", "500>order>200", "1000>order>500", "1500>order>1000", "2000>order>1500",],
        datasets: [
            {
                label: "Order earn",
                data: [mintwo, maxtwo, maxten, maxfifteen, maxtwenty],
                backgroundColor: ["orangered", "#ff7722", "#1f93ff", "#9d0191", "#ff7722"],
            },
        ],
    }
    return (
        <div>
            <Bar data={data} />
        </div>
    )
}
export default ChartBooking;