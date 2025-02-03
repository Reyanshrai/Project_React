import { useRef } from 'react';
import { Carosoul } from '../components';
import { About, Contact, Timetable, Trainer, Pricing, Services } from './index';
import Navbar from '../components/Navbar';  // Ensure the Navbar import is correct

const Home = () => {
  // Initialize refs properly
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const timetableRef = useRef(null);
  const trainerRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  // Create sections object
  const sections = {
    home: homeRef,
    about: aboutRef,
    services: servicesRef,
    timetable: timetableRef,
    trainer: trainerRef,
    pricing: pricingRef,
    contact: contactRef,
  };

  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Navbar scrollToSection={scrollToSection} sections={sections} />
      <div ref ={homeRef}><Carosoul /></div>
      <div ref={aboutRef}><About /></div>
      <div ref={servicesRef}><Services /></div>
      <div ref={timetableRef}><Timetable /></div>
      <div ref={trainerRef}><Trainer /></div>
      <div ref={pricingRef}><Pricing /></div>
      <div ref={contactRef}><Contact /></div>
    </>
  );
};

export default Home;
