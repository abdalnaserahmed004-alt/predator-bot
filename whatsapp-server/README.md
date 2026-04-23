# 亗 WEKA_7_BOT — External WhatsApp Server 亗

بوت واتساب كامل مبني على **meowsab** (Baileys framework) مع 80+ plugin جاهز.
يربط مع Lovable عشان مستخدمين تلجرام يقدروا يربطوا أرقامهم كـ sub-bots.

## 🚀 النشر على Railway

### 1. ارفع الفولدر ده على GitHub
ضيف فولدر `whatsapp-server/` كـ ريبو منفصل أو ضمن نفس الريبو.

### 2. اعمل New Project على Railway
- اختار **Deploy from GitHub repo**
- لو رفعت الفولدر داخل نفس الريبو، حدد **Root Directory** = `whatsapp-server`

### 3. اضبط Environment Variables

| المتغير | القيمة |
|---------|--------|
| `PORT` | يُحدّد تلقائياً |
| `API_SECRET` | **نفس قيمة** `WHATSAPP_SERVER_SECRET` في Lovable |
| `LOVABLE_WEBHOOK_URL` | `https://mzyghqssnfjxtzdreurl.supabase.co/functions/v1/whatsapp-webhook` |
| `MAIN_PHONE` | `201210155616` (رقم البوت الرئيسي) |

### 4. ضيف Volume (مهم!)
Railway → Settings → Volumes → Add Volume → Mount path: `/app/sessions`
ده بيخلّي الجلسات تتحفظ ومتتلغيش لما السيرفر يـ restart.

### 5. خد الـ URL العام
بعد النشر هيطلعلك URL زي:
`https://weka-7-bot-production.up.railway.app`

ارجع لـ Lovable → Connectors → Settings وحدّث الـ secret `WHATSAPP_SERVER_URL` بالـ URL ده.

## 🔌 API Endpoints

### `GET /`
Health check.
```json
{ "ok": true, "service": "weka-7-bot", "subBotsReady": true }
```

### `POST /pair` — يحتاج `x-api-key` header
```json
// Request
{ "phone_number": "201012345678", "telegram_chat_id": 123456789, "full_name": "أحمد" }

// Response
{ "pairing_code": "1234ABCD", "session_id": "session_201012345678" }
```

### `POST /logout` — يحتاج `x-api-key` header
```json
{ "phone_number": "201012345678" }
```

### `GET /status/:phone` — يحتاج `x-api-key` header
```json
{ "active": true }
```

## 📂 هيكل الكود

```
whatsapp-server/
├── server.js          ← Entry point (HTTP + bot startup)
├── index.js           ← (احتياطي) تشغيل البوت بدون HTTP
├── sub.js             ← منطق SubBots القديم (للمرجع)
├── package.json
├── system/
│   ├── UltraDB.js     ← قاعدة بيانات JSON محلية
│   ├── control.js     ← نظام الترحيب والصلاحيات
│   ├── utils.js       ← stickers, GIF, AI, إلخ
│   └── database.json  ← البيانات
└── plugins/           ← 80 أمر جاهز (admins, ai, games, downloads...)
```

## ⚠️ ملاحظات مهمة

- **الجلسات لازم تتحفظ على Volume** عشان متتلغيش.
- البوت الرئيسي (`MAIN_PHONE`) لازم يتربط أول مرة عبر QR/pair code يدوياً من اللوجز.
- بعدها أي sub-bot من تلجرام بيتربط تلقائياً.
- السيرفر **لازم يفضّل شغال 24/7** (Railway hobby plan كافي للبداية).
