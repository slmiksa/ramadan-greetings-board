import { motion } from "framer-motion";

const Lantern = ({ side, delay = 0, top = "10%" }: { side: "left" | "right"; delay?: number; top?: string }) => {
  const x = side === "left" ? "5%" : "95%";
  
  return (
    <motion.div
      className="absolute z-10 pointer-events-none"
      style={{ left: side === "left" ? "2%" : undefined, right: side === "right" ? "2%" : undefined, top }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
    >
      <motion.div
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="origin-top"
      >
        {/* Rope */}
        <div className="w-[2px] h-6 bg-[#977C3C]/60 mx-auto" />
        {/* Lantern body */}
        <svg width="40" height="70" viewBox="0 0 40 70" fill="none" className="drop-shadow-lg">
          {/* Top cap */}
          <rect x="14" y="0" width="12" height="6" rx="2" fill="#977C3C" />
          {/* Top ring */}
          <ellipse cx="20" cy="8" rx="10" ry="3" fill="#977C3C" />
          {/* Body */}
          <path d="M10 11 C10 11, 6 25, 6 35 C6 45, 10 55, 20 58 C30 55, 34 45, 34 35 C34 25, 30 11, 30 11 Z" fill="#977C3C" opacity="0.85" />
          {/* Glass panels */}
          <path d="M12 14 C12 14, 9 26, 9 35 C9 44, 12 52, 20 55 C20 55, 14 48, 14 35 C14 22, 18 14, 18 14 Z" fill="#c4a84d" opacity="0.5" />
          <path d="M28 14 C28 14, 31 26, 31 35 C31 44, 28 52, 20 55 C20 55, 26 48, 26 35 C26 22, 22 14, 22 14 Z" fill="#c4a84d" opacity="0.5" />
          {/* Glow */}
          <ellipse cx="20" cy="35" rx="8" ry="12" fill="#f5e6b8" opacity="0.6" />
          {/* Bottom */}
          <ellipse cx="20" cy="58" rx="6" ry="2" fill="#977C3C" />
          <path d="M17 60 L20 68 L23 60" fill="#977C3C" />
        </svg>
        {/* Glow effect */}
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-12 rounded-full bg-[#f5e6b8]/30 blur-md"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

const FloatingStar = ({ delay, left, size = 12 }: { delay: number; left: string; size?: number }) => (
  <motion.div
    className="absolute pointer-events-none text-[#977C3C]/30"
    style={{ left }}
    initial={{ top: "100%", opacity: 0 }}
    animate={{ top: "-5%", opacity: [0, 0.6, 0] }}
    transition={{ delay, duration: 8 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  </motion.div>
);

const FloatingCrescent = ({ delay, left }: { delay: number; left: string }) => (
  <motion.div
    className="absolute pointer-events-none text-[#977C3C]/20"
    style={{ left }}
    initial={{ top: "100%", opacity: 0, rotate: 0 }}
    animate={{ top: "-5%", opacity: [0, 0.5, 0], rotate: 360 }}
    transition={{ delay, duration: 12 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </motion.div>
);

const RamadanDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Lanterns */}
      <Lantern side="left" delay={0.3} top="5%" />
      <Lantern side="right" delay={0.6} top="5%" />
      <Lantern side="left" delay={0.9} top="35%" />
      <Lantern side="right" delay={1.2} top="35%" />

      {/* Floating stars */}
      <FloatingStar delay={0} left="10%" size={10} />
      <FloatingStar delay={2} left="25%" size={14} />
      <FloatingStar delay={4} left="50%" size={8} />
      <FloatingStar delay={1} left="75%" size={12} />
      <FloatingStar delay={3} left="90%" size={10} />
      <FloatingStar delay={5} left="40%" size={6} />
      <FloatingStar delay={6} left="60%" size={10} />

      {/* Floating crescents */}
      <FloatingCrescent delay={1.5} left="15%" />
      <FloatingCrescent delay={3.5} left="85%" />
      <FloatingCrescent delay={5.5} left="45%" />
    </div>
  );
};

export default RamadanDecorations;
