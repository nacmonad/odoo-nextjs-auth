'use client';

import React from "react";

import { motion } from "framer-motion";

const ViewBasedAnimation = () => {
    return (
        <>
            <div style={{height:"150vh"}}></div>
            <motion.div 
                style={{height:"100vh", background: 'black'}}
                initial={{opacity:0}}
                whileInView={{opacity:1}}
                trasnsition={{duration:1}}
                >

                </motion.div>
        </>)
}

export default ViewBasedAnimation;