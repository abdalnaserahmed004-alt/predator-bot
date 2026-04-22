import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Shield, Zap, Smartphone, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5" dir="rtl">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">Predator WhatsApp</span>
        </div>
        <div className="flex gap-2">
          <a href="https://t.me/DevAhmed_ZDA" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm">فتح البوت على تلجرام</Button>
          </a>
          <Link to={user ? '/dashboard' : '/auth'}>
            <Button size="sm">{user ? 'لوحة التحكم' : 'دخول الأدمن'}</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            اربط جهازك في أقل من دقيقة
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            اربط بوت الواتساب بتاعك<br />بكل سهولة عبر تلجرام
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            ادخل على بوت التلجرام، اكتب بياناتك، استلم كود الربط الرقمي، وادخله في الواتساب بتاعك — بدون QR code.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://t.me/DevAhmed_ZDA" target="_blank" rel="noreferrer">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <MessageCircle className="w-5 h-5" />
                ابدأ من تلجرام الآن
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </a>
            <Link to={user ? '/dashboard' : '/auth'}>
              <Button size="lg" variant="outline">لوحة تحكم الأدمن</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <Step
            number="1"
            icon={MessageCircle}
            title="افتح بوت التلجرام"
            desc="اضغط زر 'ابدأ من تلجرام' وابدأ المحادثة مع البوت."
          />
          <Step
            number="2"
            icon={Smartphone}
            title="اكتب بياناتك"
            desc="اسمك الكامل، رقم الواتساب، والمحافظة بتاعتك."
          />
          <Step
            number="3"
            icon={Shield}
            title="استلم الكود"
            desc="هيوصلك كود ربط من 8 خانات. ادخله في الواتساب → الأجهزة المرتبطة."
          />
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-card p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">مميزات الخدمة</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Feature title="ربط برقم فقط" desc="بدون QR code — كود رقمي بسيط تدخله في واتساب." />
              <Feature title="سيرفر مستقر 24/7" desc="جهازك يفضل مربوط بدون انقطاع." />
              <Feature title="حماية بيانات" desc="بياناتك محفوظة بشكل آمن ومش بتتشارك." />
              <Feature title="دعم مصري" desc="كل المحافظات مدعومة، ودعم باللهجة المصرية." />
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground border-t mt-12">
        © {new Date().getFullYear()} Predator WhatsApp — جميع الحقوق محفوظة
      </footer>
    </div>
  );
};

const Step = ({ number, icon: Icon, title, desc }: any) => (
  <div className="relative rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow">
    <div className="absolute -top-4 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold flex items-center justify-center shadow-lg">
      {number}
    </div>
    <Icon className="w-10 h-10 text-primary mb-4 mt-2" />
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </div>
);

const Feature = ({ title, desc }: any) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
      <div className="w-2 h-2 rounded-full bg-primary" />
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

export default Index;
