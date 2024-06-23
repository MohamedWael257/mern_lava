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
    const mintwo = order.filter((ord) => ord.bookingamount <= 110).length
    const maxtwo = order.filter((ord) => ord.bookingamount > 110 && ord.bookingamount < 120).length
    const maxten = order.filter((ord) => ord.bookingamount > 120 && ord.bookingamount <= 130).length
    const maxfifteen = order.filter((ord) => ord.bookingamount > 130 && ord.bookingamount <= 140).length
    const maxtwenty = order.filter((ord) => ord.bookingamount > 140 && ord.bookingamount <= 150).length

    const data = {
        labels: ["110>order>0", "120>order>110", "130>order>120", "140>order>130", "150>order>140",],
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