import React, { useEffect, useState } from 'react'
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll",[]);
        };
    }, []);


  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img
        className="nav__logo"
        src="https://www.bing.com/th?id=OIP.AVu3t2-rFhHvoVcvkA38kQHaEK&amp;w=192&amp;h=106&amp;c=8&amp;rs=1&amp;qlt=90&amp;o=6&amp;pid=3.1&amp;rm=2-"
        alt='Netflix Logo'
        />

        <img
            className='nav__avatar'
            src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
            alt='Avatar logo'
            />

    </div>
  )
}

export default Nav