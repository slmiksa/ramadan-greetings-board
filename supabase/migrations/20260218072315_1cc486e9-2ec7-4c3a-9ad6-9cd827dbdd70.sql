
-- Database function to get all messages (bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_all_messages()
RETURNS SETOF public.messages
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.messages ORDER BY created_at DESC;
$$;

-- Database function to approve a message
CREATE OR REPLACE FUNCTION public.approve_message(message_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.messages SET approved = true WHERE id = message_id;
$$;

-- Database function to reject (delete) a message
CREATE OR REPLACE FUNCTION public.reject_message(message_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.messages WHERE id = message_id;
$$;
