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

const LandingNavbar = () => {
    return(
        <>
            <Nav>
                <NavLink to='/'>
                    <h3>Logo</h3>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to='/' activeStyle>
                        Home
                    </NavLink>
                    <NavLink to='/about' activeStyle>
                        About
                    </NavLink>
                    <NavLink to='/features' activeStyle>
                        Features
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink2 to='/login'>Login</NavBtnLink2>
                    <NavBtnLink to='/register'>Get Started</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default LandingNavbar;