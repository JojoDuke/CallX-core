import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    NavBtnLink2,
  } from './LandingNavbarElements';
  import logos from '../assets/Xlogo.png'

const LandingNavbar = () => {
    return(
        <>
            <Nav>
                <NavLink to='/'>
                    <img
                        src={logos}
                        width='50px'/>
                </NavLink>
                <Bars />
                <NavBtn>
                    <NavBtnLink to={{ pathname: "https://flutterwave.com/pay/jfkvbp6hvewf" }} target="_blank">Toss a coin...</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default LandingNavbar;