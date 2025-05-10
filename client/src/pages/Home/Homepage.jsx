import React from 'react'
import { useState, useEffect } from "react"
import Hero from './Hero'
import AboutUs from './AboutUs'
import Faq from './Faq'
import ContactUs from './Contactus'
import Footer from './Footer'
import Navbar from './Navbar'

const Homepage = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="app">
      <Navbar scrollY={scrollY} />
      <main>
        <Hero />
        <AboutUs />
        <Faq />
        <ContactUs />
      </main>
      <Footer />
    </div>
  )
}

export default Homepage