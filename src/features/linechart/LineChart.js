import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {getLineChart, selectLineChart} from "./lineChartSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFilters} from "../filters/filterSlice";
import {CategoryScale, LinearScale, Chart, PointElement, LineElement} from 'chart.js';
Chart.register(CategoryScale,LinearScale, PointElement, LineElement);

export function LineChart() {
    const {line_chart} = useSelector(selectLineChart);
    const {range} = useSelector(selectFilters);
    const dispatch = useDispatch();
     useEffect(() => {
         let StartD = range.startDate ? range.startDate.getFullYear() + '-' + (range.startDate.getMonth() + 1) + '-' + range.startDate.getDate() : '';
         let EndD = range.endDate.getFullYear() + '-' + (range.endDate.getMonth() + 1) + '-' + range.endDate.getDate();
         dispatch(getLineChart(StartD, EndD));
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

