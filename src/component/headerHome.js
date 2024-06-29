import React from 'react';
import p1 from './../images/p1.jpeg';
import p2 from './../images/p2.jpeg';
import p3 from './../images/p3.jpeg';
import p4 from './../images/p4.jpeg';
import p5 from './../images/p5.jpeg';
import p6 from './../images/p6.jpeg';
import { CiBellOn ,CiUser} from 'react-icons/ci';

const HeaderHome = () => {
    return(
        
    <div className="headerH">
        <div className='row'>
            <div className='col-md-2'>
                <p className='pName'>The Quest</p>
                <p className='pSlogan'>Just Do It</p>


                <div class="proH">
                    <img src={p1} alt="Circular Image" className="circular-image"/>
                </div>

                <p className='weName1'>Hi, <span className='weName'>Seyi</span></p>
            

            </div>

            <div className='col-md-7'>
                <div class="proTop">
                    <img src={p2} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p3} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p4} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p5} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p6} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p3} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p2} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p6} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p5} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div>
                    <p className='we1'>Welcome To Your Craddle</p>
                    <p className='we2'>Continue your Journey</p>
                </div>
            </div>

            <div className='col-md-3'>
                <div className='fll'>
                    <span className='iconS2 mr'><CiUser /></span>
                    <span className='iconS2'><CiBellOn /></span>
                </div>
            </div>
        </div>
       
    </div>
    )
}

export default HeaderHome