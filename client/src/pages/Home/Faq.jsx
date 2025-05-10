import { useState, useRef, useEffect } from "react"
import "./Faq.css"

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null)

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <div className="faq-question" onClick={onClick}>
        <h3>{question}</h3>
        <div className="faq-icon">
          <span className="vertical"></span>
          <span className="horizontal"></span>
        </div>
      </div>
      <div
        className="faq-answer"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div ref={contentRef}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)

  const faqData = [
    {
      question: "What is InventoPro and how does it work?",
      answer:
        "InventoPro is a comprehensive inventory management system with integrated billing. It allows businesses to track inventory, manage products, generate invoices, and analyze sales data. The system works by providing a centralized platform where you can add products, categorize them, track stock levels, process orders, and generate reports.",
    },
    {
      question: "What's the difference between admin and user roles?",
      answer:
        "Admins have full access to the system, including the ability to add products, manage inventory, create invoices, and add/manage other users. Regular users have limited access and can only create invoices and process sales. This role-based access ensures proper security and workflow management.",
    },
    {
      question: "Can I export my data from the system?",
      answer:
        "Yes, InventoPro allows you to export various data in CSV format, including order information, inventory reports, sales analytics, and supplier details. This makes it easy to use your data in other applications or for backup purposes.",
    },
    {
      question: "Is the system cloud-based or does it require installation?",
      answer:
        "InventoPro is a cloud-based solution, which means you can access it from any device with an internet connection. There's no need for complex installations or maintenance on your local systems. We handle all updates and backups automatically.",
    },
    {
      question: "How secure is my business data in InventoPro?",
      answer:
        "We take security very seriously. InventoPro uses industry-standard encryption for all data, both in transit and at rest. We implement regular security audits, maintain secure backups, and provide role-based access control to ensure that only authorized personnel can access sensitive information.",
    },
  ]

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="faq" className="faq" ref={sectionRef}>
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
