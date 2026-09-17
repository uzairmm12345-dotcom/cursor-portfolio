"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Photo = () => {
  return (
    <div
      className="relative"
      style={{
        width: "clamp(200px, 22vw, 360px)",
        height: "clamp(200px, 22vw, 360px)",
      }}
    >
      <div className="absolute inset-0 rounded-full bg-accent/10 blur-[36px] scale-105 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full"
      >
        <div className="absolute inset-[-4%] rounded-full border border-accent/20 pointer-events-none" />

        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent/35 bg-secondary">
          <Image
            src="/Assets/My_Photo.png"
            alt="Uzair Riasat"
            fill
            sizes="(max-width: 1024px) 220px, 360px"
            priority
            quality={95}
            className="object-cover object-center"
          />
        </div>

        <div className="absolute -bottom-1 -right-1 glass-card px-3 py-2 rounded-xl">
          <p className="font-primary text-[9px] uppercase tracking-widest text-accent/70">Focus</p>
          <p className="font-display text-xs font-semibold text-white">Backend & Full-Stack</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Photo;
