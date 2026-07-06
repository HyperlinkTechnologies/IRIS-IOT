"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export const ContainerScroll = ({

  children,
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 1] : [1.05, 1];
  };

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [20, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleDimensions()
  );

  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -100]
  );

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center px-2 md:px-10"
    >
      <div
        className="relative w-full "
        style={{
          perspective: "750px",
        }}
      >

        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};


export const Card = ({
  rotate,
  scale,
  children,
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-6xl mx-auto mt-10 w-full rounded-[30px] border border-white/20 bg-[#111827] p-2 md:p-4"
    >
      <div className="w-full overflow-hidden rounded-2xl bg-black">
        {children}
      </div>
    </motion.div>
  );
};