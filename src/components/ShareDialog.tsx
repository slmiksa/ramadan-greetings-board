import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addMessage } from "@/lib/messages";
import { toast } from "sonner";

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
}

const ShareDialog = ({ open, onClose }: ShareDialogProps) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    setTimeout(() => {
      addMessage(name.trim(), message.trim());
      toast.success("تم إرسال رسالتك بنجاح! ✨");
      setName("");
      setMessage("");
      setSending(false);
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-background rounded-2xl p-8 card-float border border-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-center mb-2 text-gold-gradient">
              شاركنا مشاعرك 🌙
            </h2>
            <p className="text-muted-foreground text-center text-sm mb-6">
              عبّر عن فرحتك بقدوم شهر رمضان المبارك
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">الاسم</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتب اسمك هنا..."
                  className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">عبّر عن مشاعرك</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك الرمضانية..."
                  rows={4}
                  className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 rounded-xl bg-primary py-3 font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {sending ? "جاري الإرسال..." : "إرسال ✨"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-border px-6 py-3 text-muted-foreground hover:bg-muted transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareDialog;
