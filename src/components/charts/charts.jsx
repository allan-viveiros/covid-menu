import React, {useState, useEffect} from 'react';
import {Line, Bar} from 'react-chartjs-2';

import {fetchDailyData} from '../../api'
import styles from './charts.module.css';


const Chart = ({data: {confirmed, recovered, deaths}, country}) => {

    const[dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        }

        //console.log(dailyData);

        fetchApi(); 
    });

    const lineChart = (
        dailyData.length 
            ? (
                <Line
                    data={{
                    labels: dailyData.map(({date}) => date),
                    datasets: [
                        { 
                            data: dailyData.map(({confirmed}) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true
                        }, 
                        {
                            data: dailyData.map(({deaths}) => deaths),
                            label: 'Infected',
                            borderColor: '#ff000a',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true   
                        }
                    ]
                    }} 
                />
            ) : null        
    );

    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(255, 207, 102, 0.7)',
                                'rgba(30, 187, 215, 0.7)',
                                'rgba(244, 67, 54, 0.7)'
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false},
                        title: {display: true, text:`Current state in ${country}`}
                    }}
                />

            ) : null
    )
   
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );

}

export default Chart;