import { supabase } from "@/integrations/supabase/client";

export interface RamadanMessage {
  id: string;
  name: string;
  message: string;
  created_at: string;
  approved: boolean;
}

export const getApprovedMessages = async (): Promise<RamadanMessage[]> => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as unknown as RamadanMessage[]) || [];
};

export const addMessage = async (name: string, message: string): Promise<void> => {
  const { error } = await supabase
    .from("messages")
    .insert({ name, message });

  if (error) throw error;
};

export const getAdminMessages = async (): Promise<RamadanMessage[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-messages?action=list`,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
};

export const approveMessage = async (id: string): Promise<void> => {
  const { error } = await supabase.functions.invoke("admin-messages", {
    body: { id, action: "approve" },
  });
  if (error) throw error;
};

export const rejectMessage = async (id: string): Promise<void> => {
  const { error } = await supabase.functions.invoke("admin-messages", {
    body: { id, action: "reject" },
  });
  if (error) throw error;
};
