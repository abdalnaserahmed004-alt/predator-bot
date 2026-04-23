-- Bot developers table (extra owner phone numbers managed from admin UI)
CREATE TABLE public.bot_developers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL UNIQUE,
  display_name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bot_developers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage bot_developers"
ON public.bot_developers
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_bot_developers_updated_at
BEFORE UPDATE ON public.bot_developers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with main developer
INSERT INTO public.bot_developers (phone_number, display_name, notes)
VALUES ('201210155616', 'Ahmed_wek7', 'المطور الرئيسي')
ON CONFLICT (phone_number) DO NOTHING;