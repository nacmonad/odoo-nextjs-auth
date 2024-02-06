'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import AppLogo from "@/assets/logo-placeholder.png";

const TICK_SIZE = 0.7;

const Transition = ({children}: {children:React.ReactNode}) => {
  const [boxes, setBoxes] = useState<number[]>([]);
  const [maxDimension, setMaxDimension] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showChildren, setShowChildren] = useState(false);

  const explosionVariants = [
    {
      initial: {
        width: `${maxDimension * 3}px`,
        height: `${maxDimension * 3}px`,
        left: `${maxDimension * 1}px`,
        top: `${maxDimension * 1}px`,
        rotate: rotationAngle,
      },
      animate: {
        width: `${maxDimension * 3}px`,
        height: `${maxDimension * 3}px`,
        left: `-${maxDimension }px`,
        top: `-${maxDimension }px`,
        opacity: 1,
        transition: {
          duration: 0.5*TICK_SIZE,
          ease: "easeInOut",
        },
      },
    },
    {
      initial: {
        width: `${maxDimension * 3}px`,
        height: `${maxDimension * 3}px`,
        left: `-${maxDimension * 3}px`,
        top: `${maxDimension * 2}px`,
        rotate: 180-rotationAngle,
      },
      animate: {
        width: `${maxDimension * 3}px`,
        height: `${maxDimension * 3}px`,
        left: `-${maxDimension * 1}px`,
        top: `-${maxDimension * 1}px`,
        opacity: 1,
        transition: {
          duration: 0.5*TICK_SIZE,
          ease: "easeInOut",
        },
      },
    },
    {
      initial: {
        width: `${maxDimension}px`,
        height: `${maxDimension}px`,
        left: '0',
        top: "-250%",
      },
      animate: {
        width: `${maxDimension}px`,
        height: `${maxDimension}px`,
        left: 0,
        top: 0,
        opacity: 1,
        transition: {
          duration: TICK_SIZE,
          ease: "easeInOut",
        },
      },
    },
  ];
  //"theme_color": "#fca127",
  //"background_color": "#ca382a",
  const explosionColors = ["#676732", "#fca127", "#ca382a"]; // Add more colors as needed

  useEffect(() => {
    if(window) {
        setMaxDimension(Math.max(window.innerWidth, window.innerHeight));
        setRotationAngle(Math.atan(window.innerHeight / window.innerWidth) * (180 / Math.PI));
    }
    setTimeout(() => {
        setBoxes([0]);
      }, 0);
    setTimeout(() => {
      setBoxes(b => [...b, 1]);
    }, 0.5*TICK_SIZE*1000);

    setTimeout(() => {
      setBoxes(b => [...b, 2]);
    }, 1*TICK_SIZE*1000);

    setTimeout(() => {
        setShowLogo(true);
      }, 2*TICK_SIZE*1000);

      setTimeout(() => {
        setShowLogo(false);
        setShowChildren(true);
      }, 4*TICK_SIZE*1000);

  }, []);

  return (
    <div className="relative overflow-hidden" style={{ width: "100vw", height: "100vh" }}>
      <AnimatePresence>
        {!showChildren && boxes.map((index) => (
          <motion.div
            key={`explosion${index + 1}`}
            initial="initial"
            animate="animate"
            exit={{opacity:0}}
            variants={explosionVariants[index]}
            style={{ backgroundColor: explosionColors[index], position: "absolute" , opacity: 0.25}}
          />
        ))}

        {!showChildren && showLogo && <div className="flex items-center justify-center w-full h-full"> 
                <motion.div 
                    className="relative"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{ duration: TICK_SIZE/2, ease: "easeOut" }}
                    style={{zIndex:999}}
                >
                <Image src={AppLogo} width={200} height={200} alt="Your Logo"/>
            </motion.div>
        </div>}
      </AnimatePresence>
      {showChildren && <>{children}</>}

    </div>
  );

};

export default Transition;
