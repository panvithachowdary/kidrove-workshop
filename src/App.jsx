import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, Brain, Code2, Rocket, Sparkles, Trophy } from "lucide-react";
import axios from "axios";
import "./index.css";

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [burst, setBurst] = useState(false);

  const { scrollY } = useScroll();
  const robotY = useTransform(scrollY, [0, 500], [0, -80]);
  const blobY = useTransform(scrollY, [0, 500], [0, 120]);

  useEffect(() => {
    const move = e => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("https://kidrove-workshop-glr1.onrender.com/api/enquiry", form);
      setMessage("Thank you! Your enquiry has been submitted.");
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Please try again.");
    }

    setLoading(false);
  };

  const handleBurst = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 900);
  };

  return (
    <div className="page">
      <div className="cursorGlow" style={{ left: cursor.x, top: cursor.y }}></div>

      <nav className="navbar">
        <div className="logoWrap">
          <img src="/kidrove.png" alt="Kidrove Logo" />
          <h2 className="brandName">Kidrove</h2>
        </div>

        <div className="navLinks">
          <a href="#details">Details</a>
          <a href="#outcomes">Outcomes</a>
          <a href="#faq">FAQ</a>
          <a href="#query">Ask Query</a>
        </div>

        <a href="#register" className="navBtn">Enroll Now</a>
      </nav>

      <section className="hero">
        <motion.div style={{ y: blobY }} className="blob blobOne"></motion.div>
        <motion.div style={{ y: robotY }} className="blob blobTwo"></motion.div>

        <div className="particleField">
          {[...Array(45)].map((_, i) => (
            <span key={i} className={`dotParticle d${i + 1}`}></span>
          ))}
        </div>

        <div className="heroLeft">
          <motion.div className="badge" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            Summer Workshop 2026
          </motion.div>

          <motion.h1 initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
            AI & Robotics <br />
            <span>Summer Workshop</span>
          </motion.h1>

          <motion.p className="heroText" initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
            Learn, build, code and create smart robots through colorful,
            interactive, hands-on technology activities designed for kids.
          </motion.p>

          <div className="heroActions">
            <a href="#register" onClick={handleBurst} className="primaryBtn">
              Enroll Now
            </a>
            <a href="#details" className="secondaryBtn">Explore Details</a>
          </div>

          {burst && (
            <div className="confetti">
              <span>✨</span><span>🎉</span><span>🤖</span><span>⚡</span><span>🌈</span>
            </div>
          )}

          <div className="miniCards">
            <div><Brain /> AI Basics</div>
            <div><Bot /> Robotics</div>
            <div><Code2 /> Coding</div>
            <div><Trophy /> Certificate</div>
          </div>
        </div>

       
      </section>

      <section className="detailsStrip" id="details">
      <Info label="Age Group" value="8–14 Years" />
<Info label="Duration" value="4 Weeks" />
<Info label="Mode" value="Online" />
<Info label="Fee" value="₹2,999" />
<Info label="Start Date" value="15 July 2026" />
      </section>

      <motion.section className="section light" id="outcomes" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2>Learning Outcomes</h2>
        <div className="outcomes">
          <p>Understand the basics of Artificial Intelligence</p>
          <p>Learn robotics concepts using real-life examples</p>
          <p>Build coding logic through fun activities</p>
          <p>Create mini AI and automation-based projects</p>
          <p>Improve problem-solving and creative thinking</p>
          <p>Gain confidence in using technology</p>
        </div>
      </motion.section>

      <motion.section className="section" id="faq" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2>Frequently Asked Questions</h2>
        <div className="faqGrid">
          <FAQ q="Is this workshop beginner-friendly?" a="Yes, no prior coding or robotics knowledge is required." />
          <FAQ q="Is the workshop online?" a="Yes, the complete workshop will be conducted online." />
          <FAQ q="Will students get a certificate?" a="Yes, students will receive a completion certificate." />
        </div>
      </motion.section>
      <motion.section
  className="section querySection"
  id="query"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <div className="queryCard">
    <h2>Have a Question?</h2>
    <p>
      Not sure if this workshop is right for your child? Ask us anything about
      schedule, classes, certificate, or learning activities.
    </p>

    <textarea placeholder="Type your question here..."></textarea>

    <a href="#register" className="queryBtn">
      Continue to Registration
    </a>
  </div>
</motion.section>

      <motion.section className="section formSection" id="register" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <div className="formCard">
          <h2>Register Your Child</h2>
          <p>Fill the form and our team will contact you soon.</p>

          <form onSubmit={submitForm}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
            <button disabled={loading}>{loading ? "Submitting..." : "Submit Enquiry"}</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </motion.section>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="infoCard">
      <span>{label}</span>
      <h3>{value}</h3>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div className="faq">
      <h3>{q}</h3>
      <p>{a}</p>
    </div>
  );
}