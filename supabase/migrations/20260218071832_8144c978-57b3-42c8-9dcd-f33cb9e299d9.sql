
-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a message
CREATE POLICY "Anyone can insert messages"
  ON public.messages FOR INSERT
  WITH CHECK (true);

-- Anyone can read approved messages
CREATE POLICY "Anyone can read approved messages"
  ON public.messages FOR SELECT
  USING (approved = true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
