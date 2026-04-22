import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Bot } from 'lucide-react';

export default function Auth() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!loading && user) nav('/dashboard'); }, [user, loading, nav]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message); else nav('/dashboard');
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard`, data: { display_name: displayName } },
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success('تم إنشاء الحساب! سجّل الدخول الآن.');
  };

  const google = async () => {
    const res = await lovable.auth.signInWithOAuth('google', { redirect_uri: `${window.location.origin}/dashboard` });
    if (res.error) toast.error('فشل تسجيل الدخول بجوجل');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Bot</CardTitle>
          <CardDescription>لوحة تحكم بوت تلجرام</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full mb-4" onClick={google}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            الدخول بجوجل
          </Button>
          <Tabs defaultValue="in">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="in">دخول</TabsTrigger>
              <TabsTrigger value="up">تسجيل</TabsTrigger>
            </TabsList>
            <TabsContent value="in">
              <form onSubmit={signIn} className="space-y-3 pt-3">
                <div><Label>الإيميل</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><Label>كلمة السر</Label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <Button type="submit" className="w-full" disabled={busy}>دخول</Button>
              </form>
            </TabsContent>
            <TabsContent value="up">
              <form onSubmit={signUp} className="space-y-3 pt-3">
                <div><Label>الاسم</Label><Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} /></div>
                <div><Label>الإيميل</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><Label>كلمة السر</Label><Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <Button type="submit" className="w-full" disabled={busy}>إنشاء حساب</Button>
                <p className="text-xs text-muted-foreground text-center">أول حساب يتسجّل يصبح Admin تلقائياً</p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
