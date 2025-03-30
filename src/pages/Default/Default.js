import './Default.css';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import advertiseImg from '../../assets/img/advertise.png';

import banner1Img from '../../assets/img/banner1.jpg';
import banner2Img from '../../assets/img/banner2.jpg';
import banner3Img from '../../assets/img/banner3.jpg';
import banner4Img from '../../assets/img/banner4.jpg';

import Promoted from '../../components/PromotedCoins/Promoted';

import Filter from '../../components/Filter/Filter';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const Default = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 5; // advertiseImg + 4 banner images

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded(prev => prev + 1);
          resolve();
        };
        img.onerror = reject;
      });
    };

    Promise.all([
      loadImage(advertiseImg),
      loadImage(banner1Img),
      loadImage(banner2Img),
      loadImage(banner3Img),
      loadImage(banner4Img)
    ]).then(() => {
      setIsLoaded(true);
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        className="defaultMainDiv"
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        variants={stagger}
      >
        {/* Loading Progress */}
        {!isLoaded && (
          <motion.div 
            className="loading-progress"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading" style={{ width: `${(imagesLoaded / totalImages) * 100}%` }} />
          </motion.div>
        )}

        <motion.div 
          className="headerImgDiv"
          variants={fadeIn}
        >
          <img src={advertiseImg} alt="Advertisement banner" />
        </motion.div>

        <motion.div 
          className="bannerAreaDiv"
          variants={fadeIn}
        >
          <div className="banner1Div">
            <img src={banner1Img} className="first" alt="Promotional banner 1" />
            <img src={banner4Img} className="second" alt="Promotional banner 4" />
          </div>
          <div className="banner2Div">
            <img src={banner2Img} className="first" alt="Promotional banner 2" />
            <img src={banner3Img} className="second" alt="Promotional banner 3" />
          </div>
          <div className="banner3Div">
            <img src={banner1Img} className="first" alt="Promotional banner 1" />
            <img src={banner3Img} className="second" alt="Promotional banner 3" />
          </div>
        </motion.div>

        <motion.div 
          className="promotedCoinDiv"
          variants={fadeIn}
        >
          <h2>Promoted Coins</h2>
          <Promoted title="Promoted" filter="promoted" caption="" />
        </motion.div>

        <motion.div 
          className="filterSection"
          variants={fadeIn}
        >
          <Filter />
        </motion.div>

        <motion.div 
          className="allCoinDiv"
          variants={fadeIn}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Default;
