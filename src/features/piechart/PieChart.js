import React, {useEffect} from 'react';
import {Pie} from 'react-chartjs-2';
import {getPieChart, selectPieChart} from "./pieChartSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFilters} from "../filters/filterSlice";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart() {
    const {pie_chart} = useSelector(selectPieChart);
    const {range} = useSelector(selectFilters);
    const dispatch = useDispatch();
     useEffect(() => {
         let SD = range.startDate ? range.startDate.getFullYear() + '-' + (range.startDate.getMonth() + 1) + '-' + range.startDate.getDate() : '';
         let ED = range.endDate.getFullYear() + '-' + (range.endDate.getMonth() + 1) + '-' + range.endDate.getDate();
         dispatch(getPieChart(SD, ED));
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

