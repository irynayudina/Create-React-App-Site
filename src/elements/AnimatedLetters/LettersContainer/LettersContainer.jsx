import React from "react";
import { motion } from "framer-motion";
import "./LettersContainer.scss";

const LettersContainer = (props) => {
  const lines = props.lines || [];
  lines.forEach(line => {
    console.log(line);
  });

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div>
      <motion.h3
        className="onload-animated-text"
        variants={sentence}
        initial="hidden"
        animate="visible"
      >
        {lines.map((line, index) => {
          return (
            <div key={index}>
              {line.split("").map((char, index) => {
                return (
                  <motion.span key={char + "-" + index} variants={letter}>
                    {char}
                  </motion.span>
                );
              })}
            </div>
          );
        })}
      </motion.h3>
    </div>
  );
};

export default LettersContainer;
