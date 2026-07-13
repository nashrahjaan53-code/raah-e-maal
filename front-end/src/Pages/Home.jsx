import React from "react";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import UspSection from "../Components/UspSection";
import WhyChooseUs from "../Components/Chooseus";
import Testimonials from "../Components/Testimonials";
import { motion } from "framer-motion";

function Home() {
  return (
    <>
    
      <motion.div
      initial={{ opacity: 0, x: 20 }}  // Start invisible and slightly to the right
      animate={{ opacity: 1, x: 0 }}   // Slide into position
      exit={{ opacity: 0, x: -20 }}    // Slide left and fade out on exit
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Features />
      <UspSection />
      <WhyChooseUs />
      <Testimonials />
      </motion.div>
    </>
  );
}

export default Home;