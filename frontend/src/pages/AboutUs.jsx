import React from 'react'
import Header from '../components/header_user/Header'
import Section from '../components/section/Section'
import bg from '../assets/physci1.png';

function AboutUs() {
    return (
        <div style = {{
            backgroundImage: `url(${bg})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundPositionY: '-2.5cm'}}>
            <Header></Header>
            <Section />
        </div>
    )
}

export default AboutUs
