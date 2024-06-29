import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';






    class Time extends Component {
        constructor(props) {
            super(props);

            this.state = {
            
              series: [{
                name: 'On Time',
                data: [0.4, 0.65, 0.76, 0.88, 
                ]
              },
              {
                name: 'Behind',
                data: [-0.8, -1.05, -1.06, -1.18,
                ]
              },
              {
                name: 'Time',
                data: [
                ]
              }
              ],
              options: {
                chart: {
                  type: 'bar',
                  height: 440,
                  width: 100,
                  stacked: true
                },
                colors: ['#008FFB', '#FF4560'],
                plotOptions: {
                  bar: {
                    borderRadius: 5,
                    borderRadiusApplication: 'end', // 'around', 'end'
                    borderRadiusWhenStacked: 'all', // 'all', 'last'
                    horizontal: true,
                    barHeight: '80%',
                    barWidth: '0%',
                  },
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  width: 1,
                  colors: ["#fff"]
                },
                
                grid: {
                  xaxis: {
                    lines: {
                      show: false
                    }
                  }
                },
                yaxis: {
                  stepSize: 1
                },
                tooltip: {
                  shared: false,
                  x: {
                    formatter: function (val) {
                      return val
                    }
                  },
                  y: {
                    formatter: function (val) {
                      return Math.abs(val) + "%"
                    }
                  }
                },
            
                xaxis: {
                  categories: ['85+', '80-84', '75-79'
                  ],
               
                  labels: {
                    formatter: function (val) {
                      return Math.abs(Math.round(val)) + "%"
                    }
                  }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                  }
              },
            
            
            };
        }
        
      
        render() {
          return (

            <div className='progressGraph'>
                   <div className="graphNam">Time</div>
                  <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={120} width={480} />
              </div>
              <div id="html-dist"></div>
                  
                  </div>
    
          );
        }
      }
      


  export default Time;