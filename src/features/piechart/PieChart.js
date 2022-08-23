import React, {useEffect} from 'react';
import {Pie} from 'react-chartjs-2';
import {getPieChart, selectPieChart} from "./pieChartSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFilters} from "../filters/filterSlice";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart() {
    const {pie_chart} = useSelector(selectPieChart);
    const {range, startTime, endTime} = useSelector(selectFilters);
    const dispatch = useDispatch();
     useEffect(() => {
         let start_date = range.startDate ? range.startDate.getFullYear() + '-' + (range.startDate.getMonth() + 1) + '-' + range.startDate.getDate() : '';
         let start_ts = start_date === "" ? "" : "T" + startTime.getHours() + "%3A" + startTime.getMinutes() + "%3A" + startTime.getSeconds() ;
         let end_date = range.endDate.getFullYear() + '-' + (range.endDate.getMonth() + 1) + '-' + range.endDate.getDate();
         let end_ts =  "T" + endTime.getHours() + "%3A" + endTime.getMinutes() + "%3A" + endTime.getSeconds() ;
         dispatch(getPieChart(start_date+start_ts, end_date+end_ts));
         }, [range])

     return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Pie
                height="300px"
                data={pie_chart}
                type="pie"
                options={{
                    responsive: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: false,
                            text: 'Chart.js Line Chart'
                        }
                    }
                }}
            />
        </div>);
}

