import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getApprovedMessages, RamadanMessage } from "@/lib/messages";

const ITEMS_PER_PAGE = 12;
const AUTO_ADVANCE_MS = 20000;

const pastelColors = [
  "from-primary/20 to-gold-light/10 border-primary/30",
  "from-gold-light/20 to-primary/10 border-gold-light/30",
  "from-primary/15 to-gold-dark/10 border-primary/25",
  "from-gold-dark/15 to-primary/10 border-gold-dark/25",
];

const MessageCard = ({ msg, index }: { msg: RamadanMessage; index: number }) => {
  const colorClass = pastelColors[index % pastelColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", damping: 20 }}
      className="break-inside-avoid mb-4"
    >
      <div
        className={`rounded-2xl bg-gradient-to-br ${colorClass} border p-5 backdrop-blur-sm`}
      >
        <p className="text-foreground leading-relaxed mb-3 text-2xl" dir="rtl">
          "{msg.message}"
        </p>
        <div className="flex items-center gap-2 justify-end" dir="rtl">
          <span className="text-sm font-semibold text-foreground/80">{msg.name}</span>
          <span className="text-xs text-muted-foreground">🌙</span>
        </div>
      </div>
    </motion.div>
  );
};

const MessagesPage = () => {
  const [messages, setMessages] = useState<RamadanMessage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getApprovedMessages().then(setMessages).catch(console.error);
  }, []);

  const totalPages = Math.max(1, Math.ceil(messages.length / ITEMS_PER_PAGE));

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  // Auto-advance every 20 seconds, looping infinitely
  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(goToNextPage, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [totalPages, goToNextPage]);

  // Reset page if messages change and current page is out of bounds
  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(0);
  }, [totalPages, currentPage]);

  const pagedMessages = messages.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Progress bar percentage for current page timer
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (totalPages <= 1) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (AUTO_ADVANCE_MS / 100), 100));
    }, 100);
    return () => clearInterval(interval);
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gold-dark mb-2">لوحة المشاعر</h1>
        <p className="text-muted-foreground text-sm">
          شاركنا مشاعرك في قدوم شهر الخير والبركة
        </p>
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-3" dir="rtl">
            <span className="text-sm text-muted-foreground">
              صفحة {currentPage + 1} من {totalPages}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentPage
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        {/* Progress bar */}
        {totalPages > 1 && (
          <div className="max-w-xs mx-auto mt-2 h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Messages Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        {messages.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-6xl mb-4"> </p>
            <p className="text-xl text-muted-foreground font-medium"> </p>
            <p className="text-sm text-muted-foreground mt-2">
              كن أول من يشارك مشاعره!
            </p>
            <Link
              to="/"
              className="inline-block mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              شاركنا مشاعرك
            </Link>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4"
            >
              {pagedMessages.map((msg, i) => (
                <MessageCard key={msg.id} msg={msg} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;