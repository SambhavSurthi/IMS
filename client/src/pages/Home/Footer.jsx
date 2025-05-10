import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <div className="footer-logo">
              <h2>InventoPro</h2>
            </div>
            <p className="footer-description">
              A complete inventory management system with integrated billing for businesses of all sizes.
            </p>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Features</h3>
            <ul className="footer-links">
              <li>
                <a href="#features">Category Management</a>
              </li>
              <li>
                <a href="#features">Analytics Dashboard</a>
              </li>
              <li>
                <a href="#features">Order Management</a>
              </li>
              <li>
                <a href="#features">Supplier Management</a>
              </li>
              <li>
                <a href="#features">Role-Based Access</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <ul className="footer-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>
                  123 Business Ave, Suite 100
                  <br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6L12 13L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>support@inventopro.com</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 16.92V19.92C22 20.4704 21.7893 20.9991 21.4142 21.3742C21.0391 21.7493 20.5104 21.96 19.96 21.96C18.4536 21.8577 16.9782 21.5215 15.59 20.96C14.2892 20.4319 13.1123 19.6914 12.1 18.77C11.1779 17.7618 10.4373 16.5878 9.91 15.29C9.34038 13.8889 9.00265 12.4 8.9 10.88C8.89925 10.3309 9.10761 9.80356 9.48112 9.42747C9.85463 9.05138 10.3798 8.83691 10.93 8.83H13.93C14.4066 8.82993 14.8659 9.00217 15.2286 9.31434C15.5913 9.62651 15.8338 10.0603 15.91 10.53C16.0172 11.2541 16.2021 11.9615 16.46 12.64C16.5843 12.9338 16.6245 13.2554 16.5761 13.5693C16.5277 13.8832 16.3928 14.1769 16.19 14.42L15.13 15.48C15.9773 16.8101 17.1023 17.9352 18.43 18.78L19.49 17.72C19.7331 17.5172 20.0268 17.3823 20.3407 17.3339C20.6546 17.2855 20.9762 17.3257 21.27 17.45C21.9485 17.7079 22.6559 17.8928 23.38 18C23.8542 18.0769 24.2912 18.3244 24.6033 18.6935C24.9153 19.0626 25.0836 19.5297 25.08 20.01L22 16.92Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} InventoPro. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
