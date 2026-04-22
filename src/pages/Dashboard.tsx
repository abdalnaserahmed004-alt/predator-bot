import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Bot, LogOut, Send, MessageSquare, Users, Terminal, Ban, CheckCircle2, Trash2 } from 'lucide-react';

interface Msg { id: string; chat_id: number; direction: 'in' | 'out'; text: string | null; created_at: string; }
interface TUser { id: string; chat_id: number; username: string | null; first_name: string | null; is_blocked: boolean; last_seen_at: string; }
interface Cmd { id: string; command: string; response: string; enabled: boolean; }

export default function Dashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);
  const [commands, setCommands] = useState<Cmd[]>([]);

  const [sendChatId, setSendChatId] = useState('');
  const [sendText, setSendText] = useState('');
  const [broadcastText, setBroadcastText] = useState('');

  const [newCmd, setNewCmd] = useState('');
  const [newResp, setNewResp] = useState('');

  useEffect(() => {
    if (!loading && !user) nav('/auth');
    if (!loading && user && !isAdmin) toast.error('ليس لديك صلاحيات Admin');
  }, [user, loading, isAdmin, nav]);

  const loadAll = async () => {
    const [m, u, c] = await Promise.all([
      supabase.from('telegram_messages').select('*').order('created_at', { ascending: false }).limit(100),
      supabase.from('telegram_users').select('*').order('last_seen_at', { ascending: false }),
      supabase.from('bot_commands').select('*').order('created_at', { ascending: false }),
    ]);
    if (m.data) setMessages(m.data as any);
    if (u.data) setUsers(u.data as any);
    if (c.data) setCommands(c.data as any);
  };

  useEffect(() => {
    if (!isAdmin) return;
    loadAll();
    const ch = supabase.channel('msgs').on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'telegram_messages' },
      (p) => setMessages((prev) => [p.new as any, ...prev].slice(0, 100))
    ).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  if (!user) return null;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <p className="text-muted-foreground">هذا الحساب ليس Admin.</p>
      <Button onClick={signOut}>تسجيل خروج</Button>
    </div>
  );

  const sendMsg = async () => {
    if (!sendChatId || !sendText) return toast.error('املأ البيانات');
    const { data, error } = await supabase.functions.invoke('telegram-send', {
      body: { chat_id: parseInt(sendChatId), text: sendText },
    });
    if (error || !data?.ok) return toast.error('فشل الإرسال');
    toast.success('تم الإرسال'); setSendText('');
  };

  const broadcast = async () => {
    if (!broadcastText) return;
    const { data, error } = await supabase.functions.invoke('telegram-send', {
      body: { broadcast: true, text: broadcastText },
    });
    if (error) return toast.error('فشل البث');
    toast.success(`تم الإرسال لـ ${data.sent} مستخدم`); setBroadcastText('');
  };

  const toggleBlock = async (u: TUser) => {
    await supabase.from('telegram_users').update({ is_blocked: !u.is_blocked }).eq('id', u.id);
    loadAll();
  };

  const addCmd = async () => {
    if (!newCmd || !newResp) return;
    const { error } = await supabase.from('bot_commands').insert({ command: newCmd.trim(), response: newResp });
    if (error) return toast.error(error.message);
    setNewCmd(''); setNewResp(''); loadAll();
  };

  const toggleCmd = async (c: Cmd) => {
    await supabase.from('bot_commands').update({ enabled: !c.enabled }).eq('id', c.id); loadAll();
  };

  const delCmd = async (id: string) => {
    await supabase.from('bot_commands').delete().eq('id', id); loadAll();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Bot className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="font-bold">Admin Bot</h1>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-1" />خروج</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">المستخدمون</p><p className="text-2xl font-bold">{users.length}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">الرسائل</p><p className="text-2xl font-bold">{messages.length}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">المحظورون</p><p className="text-2xl font-bold">{users.filter(u => u.is_blocked).length}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">الأوامر</p><p className="text-2xl font-bold">{commands.length}</p></CardContent></Card>
        </div>

        <Tabs defaultValue="messages">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="messages"><MessageSquare className="w-4 h-4 mr-1" />الرسائل</TabsTrigger>
            <TabsTrigger value="send"><Send className="w-4 h-4 mr-1" />إرسال</TabsTrigger>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-1" />المستخدمون</TabsTrigger>
            <TabsTrigger value="commands"><Terminal className="w-4 h-4 mr-1" />أوامر</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <Card><CardHeader><CardTitle>آخر الرسائل (مباشر)</CardTitle></CardHeader><CardContent>
              <div className="space-y-2 max-h-[60vh] overflow-auto">
                {messages.map(m => (
                  <div key={m.id} className={`p-3 rounded-lg border ${m.direction === 'in' ? 'bg-muted' : 'bg-primary/5'}`}>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{m.direction === 'in' ? '⬇️ وارد' : '⬆️ صادر'} — chat {m.chat_id}</span>
                      <span>{new Date(m.created_at).toLocaleString('ar')}</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                  </div>
                ))}
                {messages.length === 0 && <p className="text-center text-muted-foreground py-8">لا رسائل بعد</p>}
              </div>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="send">
            <div className="grid md:grid-cols-2 gap-4">
              <Card><CardHeader><CardTitle>رسالة لمستخدم</CardTitle></CardHeader><CardContent className="space-y-3">
                <div><Label>Chat ID</Label><Input type="number" value={sendChatId} onChange={(e) => setSendChatId(e.target.value)} /></div>
                <div><Label>النص</Label><Textarea rows={4} value={sendText} onChange={(e) => setSendText(e.target.value)} /></div>
                <Button onClick={sendMsg} className="w-full"><Send className="w-4 h-4 mr-1" />إرسال</Button>
              </CardContent></Card>
              <Card><CardHeader><CardTitle>بث للجميع</CardTitle></CardHeader><CardContent className="space-y-3">
                <div><Label>النص</Label><Textarea rows={4} value={broadcastText} onChange={(e) => setBroadcastText(e.target.value)} /></div>
                <Button onClick={broadcast} variant="default" className="w-full">بث لكل المستخدمين ({users.filter(u => !u.is_blocked).length})</Button>
              </CardContent></Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card><CardContent className="pt-6">
              <Table>
                <TableHeader><TableRow><TableHead>Chat ID</TableHead><TableHead>الاسم</TableHead><TableHead>Username</TableHead><TableHead>آخر نشاط</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {users.map(u => (
                    <TableRow key={u.id}>
                      <TableCell className="font-mono">{u.chat_id}</TableCell>
                      <TableCell>{u.first_name ?? '—'}</TableCell>
                      <TableCell>{u.username ? `@${u.username}` : '—'}</TableCell>
                      <TableCell className="text-xs">{new Date(u.last_seen_at).toLocaleString('ar')}</TableCell>
                      <TableCell>
                        {u.is_blocked
                          ? <Badge variant="destructive" className="cursor-pointer" onClick={() => toggleBlock(u)}><Ban className="w-3 h-3 mr-1" />محظور</Badge>
                          : <Badge variant="secondary" className="cursor-pointer" onClick={() => toggleBlock(u)}><CheckCircle2 className="w-3 h-3 mr-1" />نشط</Badge>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {users.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد مستخدمون بعد</p>}
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="commands">
            <Card><CardHeader><CardTitle>إضافة أمر/رد تلقائي</CardTitle></CardHeader><CardContent>
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <div><Label>الأمر (مثل /start)</Label><Input value={newCmd} onChange={(e) => setNewCmd(e.target.value)} /></div>
                <div><Label>الرد</Label><Input value={newResp} onChange={(e) => setNewResp(e.target.value)} /></div>
              </div>
              <Button onClick={addCmd}>إضافة</Button>
              <div className="mt-6 space-y-2">
                {commands.map(c => (
                  <div key={c.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Switch checked={c.enabled} onCheckedChange={() => toggleCmd(c)} />
                    <code className="text-sm font-semibold">{c.command}</code>
                    <span className="text-sm text-muted-foreground flex-1 truncate">→ {c.response}</span>
                    <Button size="sm" variant="ghost" onClick={() => delCmd(c.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
