import React from 'react'
import Section from './section'
import logoSvg from '../../static/site-logo.svg'

import './nav.css'

const Nav = () => {
  return (
    <Section
      centered
      containerStyle={{
        position: 'fixed',
        top: 0,
        backgroundColor: '#FFF',
        width: '100vw',
        height: '75px',
        zIndex: 9999,
      }}
    >
      <div className="nav-container">
        <img src={logoSvg} alt="logo" className="site-logo" />
        <div className="item-container">
          {/* <span className="item">photography</span>
          <span className="separator">|</span> */}
          <span className="item">travel</span>
          <span className="separator">|</span>
          <span className="item">tech</span>
          <span className="separator">|</span>
          <span className="item">about</span>
        </div>
      </div>
    </Section>
  )
}

export default Nav
