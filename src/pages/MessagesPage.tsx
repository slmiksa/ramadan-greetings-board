import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMessages, RamadanMessage } from "@/lib/messages";

const pastelColors = [
"from-primary/20 to-gold-light/10 border-primary/30",
"from-gold-light/20 to-primary/10 border-gold-light/30",
"from-primary/15 to-gold-dark/10 border-primary/25",
"from-gold-dark/15 to-primary/10 border-gold-dark/25"];


const MessageCard = ({ msg, index }: {msg: RamadanMessage;index: number;}) => {
  const colorClass = pastelColors[index % pastelColors.length];
  const floatDuration = 4 + index % 3 * 1.5;
  const floatDelay = index % 5 * 0.6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", damping: 20 }}
      className={`rounded-2xl bg-gradient-to-br ${colorClass} border p-5 card-float backdrop-blur-sm`}>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay
        }}>

        <p className="text-foreground text-base leading-relaxed mb-3">
          "{msg.message}"
        </p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
            {msg.name.charAt(0)}
          </div>
          <span className="text-sm font-semibold text-foreground/80">{msg.name}</span>
          <span className="text-xs text-muted-foreground mr-auto">🌙</span>
        </div>
      </motion.div>
    </motion.div>);

};

const MessagesPage = () => {
  const [messages, setMessages] = useState<RamadanMessage[]>([]);

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      





























      {/* Messages Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {messages.length === 0 ?
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>

            <p className="text-6xl mb-4">🌙</p>
            <p className="text-xl text-muted-foreground font-medium">
              لا توجد رسائل بعد
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              كن أول من يشارك مشاعره!
            </p>
            <Link
            to="/"
            className="inline-block mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground hover:opacity-90 transition-opacity">

              شاركنا مشاعرك
            </Link>
          </motion.div> :

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {messages.map((msg, i) =>
          <MessageCard key={msg.id} msg={msg} index={i} />
          )}
          </div>
        }
      </div>
    </div>);

};

export default MessagesPage;