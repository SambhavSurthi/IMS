import { useState, useEffect } from "react"
import "./Hero.css"

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="hero">
      <div className={`hero-content ${isVisible ? "visible" : ""}`}>
        <h1>Streamline Your Inventory & Billing</h1>
        <h2>All-in-one solution for complete inventory management</h2>
        <p>
          Manage products, track sales, generate invoices, and analyze business performance with our powerful platform.
        </p>
        <div className="hero-buttons">
          <button className="btn primary">Get Started</button>
          <button className="btn secondary">Watch Demo</button>
        </div>
      </div>
      <div className={`hero-image ${isVisible ? "visible" : ""}`}>
        <div className="dashboard-preview">
          <div className="dashboard-header">
            <div className="circle red"></div>
            <div className="circle yellow"></div>
            <div className="circle green"></div>
          </div>
          <div className="dashboard-content">
            <div className="dashboard-sidebar">
              <div className="sidebar-item active"></div>
              <div className="sidebar-item"></div>
              <div className="sidebar-item"></div>
              <div className="sidebar-item"></div>
            </div>
            <div className="dashboard-main">
              <div className="chart-container">
                <div className="chart-bar" style={{ height: "60%" }}></div>
                <div className="chart-bar" style={{ height: "80%" }}></div>
                <div className="chart-bar" style={{ height: "40%" }}></div>
                <div className="chart-bar" style={{ height: "70%" }}></div>
                <div className="chart-bar" style={{ height: "50%" }}></div>
              </div>
              <div className="data-grid">
                <div className="data-row"></div>
                <div className="data-row"></div>
                <div className="data-row"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
