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
                    <NavBtnLink2 to='/login'>Login</NavBtnLink2>
                    <NavBtnLink to='/register'>Get Started</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default LandingNavbar;