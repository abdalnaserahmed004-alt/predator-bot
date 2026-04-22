import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, Send, Users, Terminal, MessageSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Bot className="w-5 h-5 text-primary" /></div>
          <span className="font-bold">Admin Bot</span>
        </div>
        <Link to={user ? '/dashboard' : '/auth'}>
          <Button size="sm">{user ? 'لوحة التحكم' : 'دخول'}</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
          لوحة تحكم بوت تلجرام
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          سيرفر + لوحة إدارة لبوتك. استقبل الرسائل، ابعت ردود، احظر مستخدمين، وضيف أوامر تلقائية.
        </p>
        <Link to={user ? '/dashboard' : '/auth'}>
          <Button size="lg">ابدأ الآن</Button>
        </Link>

        <div className="grid md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto text-right">
          <Feature icon={MessageSquare} title="رسائل مباشرة" desc="استقبل رسائل بوتك لحظة بلحظة" />
          <Feature icon={Send} title="إرسال وبث" desc="ابعت لمستخدم معين أو بث للجميع" />
          <Feature icon={Users} title="إدارة مستخدمين" desc="حظر/سماح وعرض كل المتفاعلين" />
          <Feature icon={Terminal} title="ردود تلقائية" desc="أوامر مخصصة مثل /start و /help" />
        </div>
      </main>
    </div>
  );
};

const Feature = ({ icon: Icon, title, desc }: any) => (
  <div className="p-5 rounded-xl border bg-card">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3"><Icon className="w-5 h-5 text-primary" /></div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </div>
);

export default Index;
