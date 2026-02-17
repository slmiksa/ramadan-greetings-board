export interface RamadanMessage {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  approved: boolean;
}

const STORAGE_KEY = "ramadan-messages";

export const getMessages = (): RamadanMessage[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getApprovedMessages = (): RamadanMessage[] => {
  return getMessages().filter((m) => m.approved);
};

export const addMessage = (name: string, message: string): RamadanMessage => {
  const messages = getMessages();
  const newMsg: RamadanMessage = {
    id: crypto.randomUUID(),
    name,
    message,
    timestamp: Date.now(),
    approved: false,
  };
  messages.push(newMsg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  return newMsg;
};

export const approveMessage = (id: string): void => {
  const messages = getMessages();
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.approved = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }
};

export const rejectMessage = (id: string): void => {
  const messages = getMessages().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};
