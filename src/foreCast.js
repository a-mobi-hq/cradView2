import React, { Component } from "react";
import Chart from "react-apexcharts";
import Header from './component/header';
import Menu from './component/menu';
import bci from './images/bc.png';
import { BiBorderAll } from "react-icons/bi";
import { BsBorderWidth } from "react-icons/bs";

class ForeCast extends Component {
  constructor(props) {
    super(props);
    const  colors = ['#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03'];
    this.state = {
      series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30,21, 22, 10, 28]
      },
      {
        data: [31, 52, 60, 48, 26, 11, 3, 60,21, 22, 10, 28]
      },
      {
        data: [21, 22, 10, 28, 16, 21, 13, 70,21, 22, 10, 28]
      }
    ],
     
     
      options: {
        chart: {
          height: 350,
          type: 'bar',
          stacked:false,
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '80%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ['Jan'],
            ['Feb'],
            ['Mar'],
            ['Apr'],
            ['May'],
            ['Jun'],
            ['Jul'],
            ['Aug'],
            ['Sep'],
            ['Oct'],
            ['Nov'],
            ['Dec']
          ],
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            }
          }
        }
      },
    
    
    };
  }
  render() {
    return (
      <div className="container-fluid">
         <Header />
        <div className="row">
        <Menu />    

        <div className='col-md-9'>
                    <p className='centerH'>Comparative Analaysis</p>
                    <p className='centerHp'>Make sure you answer all question</p>
                    <img src={bci} className='bcA' type='button'></img>
            <div className='centerS'>
              <p className="topText">Fancial Forcast by Year</p>
             <div className="graph1">
              <div className="container-centerGraph1">
              <div className="smallBox1"> 
              <p className='graphTxt'>Revenue</p>
              </div>
              <div className="smallBox2"> 
              <p className='graphTxt'>Expenses and Cost</p>
              </div>  
              <div className="smallBox2"> 
              <p className='graphTxt'>Net Profit</p>
              </div>           
    </div>
                <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="500"
                />
            </div>
            </div>
            <button className="btn btn-primary curveNext" >Next</button>
        </div>
          

          
        </div>
      </div>
    );
  }
}

export default ForeCast;