import React from 'react';
import bci from './images/bc.png'; 
import excel from './images/excel.png'; 
import graph1 from './images/graph1.png'
import graph2 from './images/graph2.png'
import graph3 from './images/graph3.png'
import graph4 from './images/graph4.png'
import graph5 from './images/graph5.png'
import graph6 from './images/graph6.png'
import Header from './component/header';
import pdf from './images/pdf.png';
import Menu from './component/menu';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';




function MultipleGraph ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/inflationRateGraphView`)
    const onClickHandler1 = () => navigate(`/operatingIncomeMoM`)
    const onClickHandler2 = () => navigate(`/expensesMoM`)
    const onClickHandler3 = () => navigate(`/profitPageMoM`)
    const onClickHandler4 = () => navigate(`/customerInfluxMoM`)
    const onClickHandler5 = () => navigate(`/customerGrowthMoM`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
        <div className='centerC'>
            <div className='text-center'>
            <p className='centerH'>Graphs</p>

                
        
        <div className='wrapper3'>
            <div className='columns'>
               <div className='columnGraph'>
                    <img src={graph6} className='imgX'onClick={onClickHandler}></img>
                    <p className='graphName'>Inflation Rate</p>
               </div> 

               <div className='columnGraph'>
                    <img src={graph5} className='imgX'onClick={onClickHandler1}></img>
                    <p className='graphName'>Operating Income</p>
               </div> 

               <div className='columnGraph'>
                    <img src={graph3} className='imgX'onClick={onClickHandler2}></img>
                    <p className='graphName'>Expensses</p>
               </div> 

               <div className='columnGraph'>
                    <img src={graph2} className='imgX'onClick={onClickHandler3}></img>
                    <p className='graphName'>Net Profit</p>
               </div> 

               <div className='columnGraph'>
                    <img src={graph4} className='imgX'onClick={onClickHandler4}></img>
                    <p className='graphName'>Customer Influx</p>
               </div> 

               <div className='columnGraph'>
                    <img src={graph1} className='imgX'onClick={onClickHandler5}></img>
                    <p className='graphName'>Company Growth Rate</p>
               </div> 
             

            </div>
        </div>
            
            </div>
           
        </div> 
        {/*<button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>*/}
   
  </div>
  </div>
  </div>
  </>
    );
}

export default MultipleGraph
