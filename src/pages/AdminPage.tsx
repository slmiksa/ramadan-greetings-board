import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAdminMessages, approveMessage, rejectMessage, RamadanMessage } from "@/lib/messages";
import { toast } from "sonner";

const AdminPage = () => {
  const [messages, setMessages] = useState<RamadanMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const data = await getAdminMessages();
      setMessages(data);
    } catch (e) {
      console.error(e);
      toast.error("خطأ في تحميل الرسائل");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const pending = messages.filter((m) => !m.approved);
  const approved = messages.filter((m) => m.approved);

  const handleApprove = async (id: string) => {
    try {
      await approveMessage(id);
      toast.success("تم قبول الرسالة ✅");
      refresh();
    } catch {
      toast.error("خطأ في قبول الرسالة");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectMessage(id);
      toast.success("تم حذف الرسالة 🗑️");
      refresh();
    } catch {
      toast.error("خطأ في حذف الرسالة");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream" dir="rtl">
      <div className="bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gold-dark">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground">إدارة رسائل الموظفين</p>
          </div>
          <Link to="/" className="text-sm text-primary hover:underline">
            العودة للرئيسية ←
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">
            بانتظار الموافقة ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <p className="text-muted-foreground text-sm py-6 text-center">لا توجد رسائل بانتظار الموافقة</p>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {pending.map((msg) => (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-background rounded-xl border border-border p-4 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">{msg.name}</p>
                      <p className="text-foreground/80 text-sm mt-1 leading-relaxed">"{msg.message}"</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(msg.created_at).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleApprove(msg.id)}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                      >
                        قبول ✅
                      </button>
                      <button
                        onClick={() => handleReject(msg.id)}
                        className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:opacity-90 transition-opacity"
                      >
                        حذف 🗑️
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">
            الرسائل المقبولة ({approved.length})
          </h2>
          {approved.length === 0 ? (
            <p className="text-muted-foreground text-sm py-6 text-center">لا توجد رسائل مقبولة بعد</p>
          ) : (
            <div className="space-y-3">
              {approved.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-background rounded-xl border border-gold/20 p-4 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{msg.name}</p>
                    <p className="text-foreground/80 text-sm mt-1 leading-relaxed">"{msg.message}"</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium shrink-0">مقبولة ✅</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
