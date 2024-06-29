import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';






    class Cost extends Component {
        constructor(props) {
          super(props);
      
          this.state = {
            options: {
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: [1991, 1992, 1993, 1994],
                labels:{
                    show: false, // Display labels on x-axis
                    rotate: -100, // Rotate labels for better readability if needed
                    offsetY: 5, // Offset to adjust the position of the labels vertically
                  }
              }
            },
            series: [
              {
                name: "series-1",
                data: [20, 10, 20]
              }
            ]
          };
        }
        
      
        render() {
          return (     
      
            <div className='progressGraph'>
                   <div className="graphNam">Cost</div>
                      <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="bar"
                      height={120} width={450}
                      />      
      
              </div>
      
                

          );
        }
      }
      


  export default Cost;