import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import splashLogo from "@/assets/splash-logo.png";
import ShareDialog from "@/components/ShareDialog";
import RamadanDecorations from "@/components/RamadanDecorations";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={splashLogo}
              alt="شركة الوصل الوطنية"
              className="w-64 md:w-80 object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <RamadanDecorations />
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 text-center relative">
        {/* Top center Ramadan header decoration */}
        <motion.div
          className="fixed top-4 left-0 right-0 flex items-center justify-center gap-3 z-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        >
          {/* Left star */}
          <motion.svg
            width="18" height="18" viewBox="0 0 24 24" fill="#977C3C" opacity={0.5}
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>

          {/* Small star */}
          <motion.svg
            width="10" height="10" viewBox="0 0 24 24" fill="#c4a84d" opacity={0.4}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>

          {/* Crescent moon */}
          <motion.svg
            width="36" height="36" viewBox="0 0 24 24" fill="#977C3C"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>

          {/* Small star */}
          <motion.svg
            width="10" height="10" viewBox="0 0 24 24" fill="#c4a84d" opacity={0.4}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>

          {/* Right star */}
          <motion.svg
            width="18" height="18" viewBox="0 0 24 24" fill="#977C3C" opacity={0.5}
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, delay: 1.5 } }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        </motion.div>

        {/* Glow under crescent */}
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full bg-[#977C3C]/10 blur-xl z-10"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Logo */}
        <motion.img
          alt="شركة الوصل الوطنية"
          className="w-56 h-56 md:w-72 md:h-72 object-contain -mb-2"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.2 }}
          src="/lovable-uploads/ed1f8f12-08d8-4ab8-a787-1527f15b4a6a.png"
        />

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-black mb-3 bg-transparent text-[#ab9154]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          رمضان كريم
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-sm md:text-base mb-10 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          نهنئكم بحلول شهر رمضان المبارك، أعاده الله عليكم بالخير واليمن والبركات
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <button
            onClick={() => setDialogOpen(true)}
            className="rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground gold-glow hover:scale-105 transition-transform"
          >
            شاركنا مشاعرك 🌙
          </button>

          <Link
            to="/messages"
            className="rounded-2xl border-2 border-gold/30 bg-gold/10 px-8 py-4 text-lg font-bold text-gold-dark hover:bg-gold/20 transition-colors"
          >
            لوحة المشاعر
          </Link>
        </motion.div>

        <ShareDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      </div>
    </>
  );
};

export default Index;
