'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "../../../node_modules/next/image";

import AppLogo from "@/assets/logo-placeholder.png";

const TICK_SIZE = 0.8;

const ExplosionSequence = () => {
  const [boxes, setBoxes] = useState<number[]>([]);
  const [maxDimension, setMaxDimension] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showLogo, setShowLogo] = useState(false)

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
          duration: TICK_SIZE,
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
          duration: TICK_SIZE,
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
    }, TICK_SIZE*1000);

    setTimeout(() => {
      setBoxes(b => [...b, 2]);
    }, 2*TICK_SIZE*1000);

    setTimeout(() => {
        setShowLogo(true);
      }, 3*TICK_SIZE*1000);

  }, []);

  return (
    <div className="relative overflow-hidden" style={{ width: "100vw", height: "100vh" }}>
      <AnimatePresence>
        {boxes.map((index) => (
          <motion.div
            key={`explosion${index + 1}`}
            initial="initial"
            animate="animate"
            exit="initial"
            variants={explosionVariants[index]}
            transition={{ delay: index * 0.5 }} // Adjust the delay as needed
            style={{ backgroundColor: explosionColors[index], position: "absolute" , opacity: 0.25}}
          />
        ))}

        <div className="flex items-center justify-center w-full h-full">
            {showLogo && 
                <motion.div 
                    className="relative"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{zIndex:999}}
                >
                <Image src={AppLogo} width={200} height={200} alt="Your Logo"/>
            </motion.div>}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ExplosionSequence;
