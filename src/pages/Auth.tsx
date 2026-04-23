import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Auth() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [busy, setBusy] = useState(false);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading && user) nav('/dashboard');
  }, [user, loading, nav]);

  // Check if an admin already exists; if yes — hide the signup tab.
  useEffect(() => {
    (supabase.rpc as any)('has_any_admin')
      .then(({ data }: { data: boolean | null }) => {
        setAdminExists(!!data);
      })
      .catch(() => setAdminExists(false));
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error('بيانات الدخول غلط', { description: error.message });
    } else {
      nav('/dashboard');
    }
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminExists) {
      toast.error('التسجيل مقفول. الأدمن متعيّن بالفعل.');
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { display_name: displayName },
      },
    });
    setBusy(false);
    if (error) {
      toast.error('فشل إنشاء الحساب', { description: error.message });
    } else {
      toast.success('تم إنشاء حساب الأدمن! سجّل الدخول دلوقتي.');
      setAdminExists(true);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">لوحة تحكم الأدمن</CardTitle>
          <CardDescription>
            دخول مقصور على الأدمن فقط — Weka_7_BOT
          </CardDescription>
        </CardHeader>
        <CardContent>
          {adminExists ? (
            // Admin already exists → only show sign-in form
            <form onSubmit={signIn} className="space-y-3 pt-2">
              <div>
                <Label>الإيميل</Label>
                <Input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>كلمة السر</Label>
                <Input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={busy}>
                <Lock className="w-4 h-4 ml-2" />
                دخول
              </Button>
              <p className="text-xs text-muted-foreground text-center pt-2">
                التسجيل مقفول. لو نسيت بياناتك، تواصل مع المطور.
              </p>
            </form>
          ) : (
            // No admin yet → first signup creates the admin
            <Tabs defaultValue="up">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="in">دخول</TabsTrigger>
                <TabsTrigger value="up">تسجيل أول أدمن</TabsTrigger>
              </TabsList>
              <TabsContent value="in">
                <form onSubmit={signIn} className="space-y-3 pt-3">
                  <div>
                    <Label>الإيميل</Label>
                    <Input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>كلمة السر</Label>
                    <Input
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={busy}>
                    دخول
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="up">
                <form onSubmit={signUp} className="space-y-3 pt-3">
                  <div>
                    <Label>الاسم</Label>
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>الإيميل</Label>
                    <Input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>كلمة السر (8 حروف على الأقل)</Label>
                    <Input
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={busy}>
                    إنشاء حساب الأدمن
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    أول حساب يتسجّل يبقى Admin. بعد كده التسجيل بيتقفل تلقائياً.
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
