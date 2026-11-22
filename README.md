# موقع وهمي يشبه SEDD – للتوعية فقط  
# Fake SEDD-Style Website – Educational Demo Only

هذا **موقع وهمي** يقلّد شكل موقع **دائرة التنمية الاقتصادية بالشارقة (SEDD)** [sedd.ae/ar](https://sedd.ae/ar/). الغرض **التوعية فقط** لشرح الفرق بين الموقع الرسمي والموقع الوهمي (الاحتيال).

This is a **fake** website that mimics the look of **Sharjah Economic Development Department (SEDD)** [sedd.ae/ar](https://sedd.ae/ar/). It is for **educational use only**, to show the difference between the real and a fake (phishing) site.

---

## تشغيل العرض التوضيحي | How to Run the Demo

### تحميل الشعارات والصور من SEDD (مرة واحدة) | Download logos and images from SEDD (once)

الموقع يستخدم نفس الشعارات والأيقونات من الموقع الرسمي. شغّل السكربت مرة واحدة لتحميلها:

The site uses the **same logos and icons** from the real SEDD site. Run the download script once to fetch them:

```bash
./download-sedd-assets.sh
```

(يتطلب `curl` | Requires `curl`.)

### فتح الموقع | Open the site

1. افتح المجلد وافتح الملف `index.html` في المتصفح، **أو**
2. استخدم خادم محلي، مثلاً:
   - **Python:** `python3 -m http.server 8000` ثم افتح `http://localhost:8000`
   - **Node:** `npx serve .` ثم افتح الرابط المعروض

1. Open the folder and double-click `index.html`, **or**
2. Use a local server (e.g. `python3 -m http.server 8000` or `npx serve .`).

---

## الفرق بين الموقع الحقيقي والوهمي | Real vs Fake: What to Compare

### 1. الرابط / النطاق | URL / Domain

| الحقيقي (SEDD) | الوهمي (هذا العرض) |
|----------------|---------------------|
| الموقع الرسمي: **https://sedd.ae** (نطاق **.ae** رسمي) | هذا العرض يستخدم نطاقاً وهمياً مثل **sedd-portal.com** (يظهر في أسفل الصفحة) |

**Rule:** تحقق دائماً من شريط العنوان. الموقع الرسمي هو **sedd.ae** فقط.

---

### 2. رسائل الاستعجال و«تحقق الآن» | Urgency and “Verify now”

| الحقيقي | الوهمي |
|---------|--------|
| SEDD لا يضع بانراً أصفر يطلب «تحقق من رخصتك الآن وإلا سيتم إيقاف الخدمة». | هذا الموقع الوهمي يضع رسالة استعجال وزر «تحقق الآن» لخلق ضغط نفسي. |

**Rule:** رسائل مثل «تحقق فوراً وإلا سيُوقف حسابك» أسلوب شائع في الاحتيال. المواقع الرسمية لا تعتمد على هذا الأسلوب.

---

### 3. نماذج تطلب بيانات حساسة | Forms Asking for Sensitive Data

| الحقيقي | الوهمي |
|---------|--------|
| تسجيل الدخول الرسمي عبر **UAE Pass** أو بوابة الدائرة، وليس نموذجاً عشوائياً يطلب رقم الرخصة + الهوية + الجوال + البريد معاً. | هذا الوهمي يعرض نموذج «تسجيل الدخول / التحقق من الرخصة» يطلب رقم الرخصة، الاسم، رقم الهوية، الجوال، والبريد. |

**Rule:** أي صفحة تطلب رقم الرخصة ورقم الهوية والجوال والبريد معاً، خاصة إن وصلت لها عبر رابط بريد أو واتساب، يجب أن تثير الشك.

---

### 4. كيف وصلت للموقع؟ | How You Got to the Site

| الحقيقي | الوهمي (الاحتيال عادة) |
|---------|-------------------------|
| كتبت **sedd.ae** بنفسك في المتصفح، أو استخدمت رابطاً محفوظاً (Bookmark). | ضغطت على رابط في بريد إلكتروني أو رسالة واتساب أو SMS. |

**Rule:** لا تعتمد على الروابط في الرسائل. اكتب **sedd.ae** بنفسك أو استخدم رابطاً محفوظاً.

---

### 5. HTTPS والقفل | HTTPS and Padlock

- الموقع الرسمي **sedd.ae** يعمل عبر **HTTPS** (قفل في المتصفح).
- هذا العرض عند فتحه كـ `file://` أو على سيرفر عشوائي قد لا يظهر بنفس شكل الموقع الرسمي.

**Rule:** استخدم دائماً **https://sedd.ae** وتحقق من أن الاتصال آمن.

---

## الرابط الرسمي للمقارنة | Official Link for Comparison

- **دائرة التنمية الاقتصادية بالشارقة (SEDD):** https://sedd.ae/ar  

استخدمه لمقارنة الشكل، الرابط، والسلوك مع هذا الموقع الوهمي.

---

## ملخص للتوعية | Summary for Your Audience

1. **تحقق من الرابط** – الرسمي هو **sedd.ae** فقط، وليس نطاقات أخرى تشبهه (مثل sedd-portal.com).
2. **لا تنخدع بالاستعجال** – «تحقق الآن أو سنوقف الخدمة» أسلوب احتيال شائع.
3. **لا تضغط روابط من الرسائل** – اكتب **sedd.ae** بنفسك أو استخدم رابطاً محفوظاً.
4. **لا تدخل رقم الرخصة أو الهوية** في أي صفحة لا تثق بها؛ عند الشك ادخل من **sedd.ae** مباشرة.

---

## إخلاء مسؤولية | Disclaimer

هذا المشروع **للتوعية والأغراض التعليمية فقط**. لا يجوز استخدامه لخداع أي شخص أو جمع بيانات حقيقية. استخدمه فقط في إطار تدريبي (ورش، توعية أمنية) لشرح الفرق بين المواقع الوهمية والرسمية.

This project is for **education and awareness only**. It must not be used to deceive anyone or to collect real data. Use it only in controlled settings (e.g. training, awareness sessions) to demonstrate how fake sites can look and how to tell them apart from the real SEDD website.
