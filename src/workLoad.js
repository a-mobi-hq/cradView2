import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';






    class WorkLoad extends Component {
        constructor(props) {
            super(props);

          this.state = {
          
            series: [{
              data: [1, 5, 20, 10]
            }],
            options: {
              chart: {
                type: 'bar',
                height: 500,
                width: 200,
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  borderRadiusApplication: 'end',
                  horizontal: true,
                  barWidth: '1%'
                }
              },
              dataLabels: {
                enabled: false
              },
              xaxis: {
                categories: ['Alex', 'James', 'Aisha', 'Fawaz', 'Ife'],
              }
            },
          
          
          };
        }
        
      
        render() {
          return (
    
      
            <div className='progressGraph1'>
                   <div className="graphNam">WorkLoad</div>
                  <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={120} width={520}/>
              </div>
              <div id="html-dist"></div>
                  
                  </div>
    
          
          );
        }
      }
      


  export default WorkLoad;