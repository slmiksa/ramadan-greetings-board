export interface RamadanMessage {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

const STORAGE_KEY = "ramadan-messages";

export const getMessages = (): RamadanMessage[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addMessage = (name: string, message: string): RamadanMessage => {
  const messages = getMessages();
  const newMsg: RamadanMessage = {
    id: crypto.randomUUID(),
    name,
    message,
    timestamp: Date.now(),
  };
  messages.push(newMsg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  return newMsg;
};
