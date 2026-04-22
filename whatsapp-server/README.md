# Predator WhatsApp — External Server (Railway/VPS)

هذا المجلد يحتوي على **كود السيرفر الخارجي** الذي يتصل بواتساب باستخدام مكتبة **Baileys**.
**لا يعمل داخل Lovable** — يجب تشغيله على Railway أو Render أو VPS.

## 🎯 ما يفعله هذا السيرفر

1. يستقبل طلبات `/pair` من Lovable (تحتوي على رقم الهاتف).
2. يتصل بواتساب عبر Baileys ويُولِّد **Pairing Code من 8 خانات**.
3. يُرجع الكود لـ Lovable ليبعته بوت التلجرام للمستخدم.
4. بعد ما المستخدم يُدخل الكود في واتساب، Baileys يُبلّغ السيرفر بالنجاح.
5. السيرفر يُنبّه Lovable عبر webhook → Lovable يُرسِل رسالة تأكيد للمستخدم في تلجرام.
6. يحفظ جلسات Baileys على القرص لكل رقم (كل رقم له فولدر).

## 📦 المتغيرات البيئية المطلوبة (Environment Variables)

على Railway أضف هذه المتغيرات في **Variables tab**:

| المتغير | القيمة |
|---------|--------|
| `PORT` | `3000` (Railway يحدده تلقائياً غالباً) |
| `API_SECRET` | **نفس قيمة** `WHATSAPP_SERVER_SECRET` في Lovable |
| `LOVABLE_WEBHOOK_URL` | `https://mzyghqssnfjxtzdreurl.supabase.co/functions/v1/whatsapp-webhook` |

## 🚀 خطوات النشر على Railway

1. اذهب إلى https://railway.app وسجل دخول بـ GitHub.
2. **New Project → Deploy from GitHub repo** واختر ريبو `predator-bot` (أو ارفع هذا المجلد كريبو جديد).
3. في الريبو، ضع `package.json` و `server.js` المرفقين تحت.
4. في Railway أضف الـ Variables المذكورة فوق.
5. بعد النشر، انسخ الـ URL العام (مثل `https://predator-bot-production.up.railway.app`).
6. **في Lovable**: حدِّث الـ secret `WHATSAPP_SERVER_URL` بهذا الـ URL.

## 🔌 API المطلوب من السيرفر

### `POST /pair`
Lovable يبعت:
```json
{
  "phone_number": "201012345678",
  "telegram_chat_id": 123456789,
  "full_name": "أحمد علي",
  "governorate": "القاهرة"
}
```
السيرفر يرجّع:
```json
{
  "pairing_code": "1234ABCD",
  "session_id": "session_201012345678"
}
```

### `POST /logout`
Lovable يبعت:
```json
{ "phone_number": "201012345678" }
```
السيرفر يفصل الجهاز.

### Webhook → Lovable
لما يحصل event مهم (connected / disconnected / failed)، السيرفر يبعت `POST` لـ `LOVABLE_WEBHOOK_URL` بـ header:
```
X-Api-Key: <API_SECRET>
Content-Type: application/json
```
Body:
```json
{
  "phone_number": "201012345678",
  "event": "connected",
  "session_id": "session_201012345678"
}
```

## 📝 كود جاهز للنسخ

راجع الملفات التالية في نفس المجلد:
- `package.json`
- `server.js`
- `Dockerfile` (اختياري، Railway يشتغل بدونه)

---

## ⚠️ ملاحظات مهمة

- **Baileys لازم يفضّل شغال 24/7** — لو السيرفر نام، كل الأجهزة هتتفصل.
- **استخدم Railway Volume** لحفظ فولدر `sessions/` بشكل دائم (مش في RAM).
- لا تُشارك `API_SECRET` علنياً.
- واتساب بيعتبر كل رقم "جهاز مصاحب" إضافي، فيه حد أقصى 4 أجهزة لكل حساب.
