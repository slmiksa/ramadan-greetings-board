import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/ramadan-hero.jpg";
import logo from "@/assets/logo.png";
import ShareDialog from "@/components/ShareDialog";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="رمضان كريم"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-night/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="شركة الوصل الوطنية"
          className="w-28 h-28 md:w-36 md:h-36 object-contain mb-6 drop-shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.2 }}
        />

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-black text-cream mb-3 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          رمضان كريم
        </motion.h1>

        <motion.p
          className="text-gold-light text-lg md:text-xl mb-2 font-medium drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          شركة الوصل الوطنية
        </motion.p>

        <motion.p
          className="text-cream/70 text-sm md:text-base mb-10 max-w-md"
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
            className="rounded-2xl border-2 border-cream/30 bg-cream/10 backdrop-blur-sm px-8 py-4 text-lg font-bold text-cream hover:bg-cream/20 transition-colors"
          >
            بورد المشاعر ✨
          </Link>
        </motion.div>

        {/* Decorative floating stars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-gold-light"
            style={{
              top: `${15 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <ShareDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
};

export default Index;
