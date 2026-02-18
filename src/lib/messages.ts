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
    .insert({ name, message } as any);

  if (error) throw error;
};

export const getAdminMessages = async (): Promise<RamadanMessage[]> => {
  const { data, error } = await supabase.rpc("get_all_messages") as { data: any; error: any };
  if (error) throw error;
  return (data as RamadanMessage[]) || [];
};

export const approveMessage = async (id: string): Promise<void> => {
  const { error } = await supabase.rpc("approve_message", { message_id: id } as any);
  if (error) throw error;
};

export const rejectMessage = async (id: string): Promise<void> => {
  const { error } = await supabase.rpc("reject_message", { message_id: id } as any);
  if (error) throw error;
};
