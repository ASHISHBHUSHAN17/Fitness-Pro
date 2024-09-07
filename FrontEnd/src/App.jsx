import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { BrowserRouter as Router } from 'react-router-dom';
  import "./App.css";
import WorkoutSessions from './components/WorkoutSessions';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import BMICalculator from './components/BMICalculator';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
        <Navbar/>
        <Hero/>
        <Pricing/>
        <WorkoutSessions/>
        <Gallery/>
        <Contact/>
        <BMICalculator/>
        <Footer/>
        <ToastContainer theme ='dark' position='top-center'/>
      
    </Router>
  )
}

export default App
