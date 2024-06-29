import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';






    class Progress extends Component {
        constructor(props) {
            super(props);

          this.state = {
          
            series: [{
              data: [400, 430, 448, 470, 540, 580]

            }],
            options: {
              chart: {
                type: 'bar',
                height: 350
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  borderRadiusApplication: 'end',
                  horizontal: true,
             
                }
              },
              dataLabels: {
                enabled: true,
              },
              xaxis: {
                categories: ['Progress', 'Design', 'Procurement', 'Construction', 'Post Construction', 'Project Closure', 
                ],
                labels:{
                  show: false, // Display labels on x-axis
                  rotate: -100, // Rotate labels for better readability if needed
                  offsetY: 5, // Offset to adjust the position of the labels vertically
                }
              },
              

            },
          
          
          };
        }
        
      
        render() {
          return (
                <div className='progressGraph'>
                  <div className="graphNam">Progress</div>
                <Chart 
                options={this.state.options} series={this.state.series} type="bar" height={120} width={520}/>
  </div>

          );
        }
      }
      


  export default Progress;