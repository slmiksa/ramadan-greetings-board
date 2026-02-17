import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "@/assets/logo.png";
import ShareDialog from "@/components/ShareDialog";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <motion.img
        src={logo}
        alt="شركة الوصل الوطنية"
        className="w-28 h-28 md:w-36 md:h-36 object-contain mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.2 }} />


      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-black text-gold-dark mb-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}>

        رمضان كريم
      </motion.h1>

      








      <motion.p
        className="text-muted-foreground text-sm md:text-base mb-10 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}>

        نهنئكم بحلول شهر رمضان المبارك، أعاده الله عليكم بالخير واليمن والبركات
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}>

        <button
          onClick={() => setDialogOpen(true)}
          className="rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground gold-glow hover:scale-105 transition-transform">

          شاركنا مشاعرك 🌙
        </button>

        <Link
          to="/messages"
          className="rounded-2xl border-2 border-gold/30 bg-gold/10 px-8 py-4 text-lg font-bold text-gold-dark hover:bg-gold/20 transition-colors">

          بورد المشاعر ✨
        </Link>
      </motion.div>

      <ShareDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>);

};

export default Index;