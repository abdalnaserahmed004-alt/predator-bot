-- Status enum for WhatsApp linking
CREATE TYPE public.whatsapp_link_status AS ENUM ('pending', 'awaiting_code', 'connected', 'disconnected', 'failed');

-- Step enum for the onboarding conversation
CREATE TYPE public.whatsapp_session_step AS ENUM ('name', 'phone', 'governorate', 'awaiting_code', 'completed');

-- Egyptian governorates reference table
CREATE TABLE public.governorates (
  id SERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.governorates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read governorates"
  ON public.governorates FOR SELECT
  USING (true);

CREATE POLICY "Admins manage governorates"
  ON public.governorates FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

INSERT INTO public.governorates (name_ar, name_en, sort_order) VALUES
  ('القاهرة', 'Cairo', 1),
  ('الجيزة', 'Giza', 2),
  ('الإسكندرية', 'Alexandria', 3),
  ('الدقهلية', 'Dakahlia', 4),
  ('الشرقية', 'Sharqia', 5),
  ('القليوبية', 'Qalyubia', 6),
  ('كفر الشيخ', 'Kafr El Sheikh', 7),
  ('الغربية', 'Gharbia', 8),
  ('المنوفية', 'Menoufia', 9),
  ('البحيرة', 'Beheira', 10),
  ('الإسماعيلية', 'Ismailia', 11),
  ('بورسعيد', 'Port Said', 12),
  ('السويس', 'Suez', 13),
  ('شمال سيناء', 'North Sinai', 14),
  ('جنوب سيناء', 'South Sinai', 15),
  ('الفيوم', 'Fayoum', 16),
  ('بني سويف', 'Beni Suef', 17),
  ('المنيا', 'Minya', 18),
  ('أسيوط', 'Asyut', 19),
  ('سوهاج', 'Sohag', 20),
  ('قنا', 'Qena', 21),
  ('الأقصر', 'Luxor', 22),
  ('أسوان', 'Aswan', 23),
  ('البحر الأحمر', 'Red Sea', 24),
  ('الوادي الجديد', 'New Valley', 25),
  ('مطروح', 'Matrouh', 26),
  ('دمياط', 'Damietta', 27);

-- Linked WhatsApp users
CREATE TABLE public.whatsapp_linked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_chat_id BIGINT NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  governorate TEXT NOT NULL,
  status whatsapp_link_status NOT NULL DEFAULT 'pending',
  pairing_code TEXT,
  pairing_code_expires_at TIMESTAMPTZ,
  session_id TEXT,
  last_connected_at TIMESTAMPTZ,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_whatsapp_linked_users_chat ON public.whatsapp_linked_users(telegram_chat_id);
CREATE INDEX idx_whatsapp_linked_users_phone ON public.whatsapp_linked_users(phone_number);
CREATE INDEX idx_whatsapp_linked_users_status ON public.whatsapp_linked_users(status);

ALTER TABLE public.whatsapp_linked_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage whatsapp_linked_users"
  ON public.whatsapp_linked_users FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_whatsapp_linked_users_updated_at
  BEFORE UPDATE ON public.whatsapp_linked_users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Active link sessions (tracks conversation state per telegram chat)
CREATE TABLE public.whatsapp_link_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_chat_id BIGINT NOT NULL UNIQUE,
  step whatsapp_session_step NOT NULL DEFAULT 'name',
  full_name TEXT,
  phone_number TEXT,
  governorate TEXT,
  linked_user_id UUID REFERENCES public.whatsapp_linked_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_whatsapp_link_sessions_chat ON public.whatsapp_link_sessions(telegram_chat_id);

ALTER TABLE public.whatsapp_link_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage whatsapp_link_sessions"
  ON public.whatsapp_link_sessions FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_whatsapp_link_sessions_updated_at
  BEFORE UPDATE ON public.whatsapp_link_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for admin panel
ALTER PUBLICATION supabase_realtime ADD TABLE public.whatsapp_linked_users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.whatsapp_link_sessions;