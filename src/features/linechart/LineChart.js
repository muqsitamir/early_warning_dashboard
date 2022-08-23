import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {getLineChart, selectLineChart} from "./lineChartSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFilters} from "../filters/filterSlice";
import {CategoryScale, LinearScale, Chart, PointElement, LineElement} from 'chart.js';
Chart.register(CategoryScale,LinearScale, PointElement, LineElement);

export function LineChart() {
    const {line_chart} = useSelector(selectLineChart);
    const {range, startTime, endTime} = useSelector(selectFilters);
    const dispatch = useDispatch();
     useEffect(() => {
         let start_date = range.startDate ? range.startDate.getFullYear() + '-' + (range.startDate.getMonth() + 1) + '-' + range.startDate.getDate() : '';
         let start_ts = start_date === "" ? "" : "T" + startTime.getHours() + "%3A" + startTime.getMinutes() + "%3A" + startTime.getSeconds() ;
         let end_date = range.endDate.getFullYear() + '-' + (range.endDate.getMonth() + 1) + '-' + range.endDate.getDate();
         let end_ts =  "T" + endTime.getHours() + "%3A" + endTime.getMinutes() + "%3A" + endTime.getSeconds() ;
         dispatch(getLineChart(start_date+start_ts, end_date+end_ts));
         }, [range])

     return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Line
                height="100px"
                data={line_chart}
                type="line"
                options={{
                    responsive: true,
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

