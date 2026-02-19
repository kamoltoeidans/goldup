<<<<<<< HEAD
# Gold Mini App

LINE LIFF Mini App – ราคาทองคำ, คำนวณกำไร/ขาดทุน, วิเคราะห์ย้อนหลัง, ตั้งค่าการแจ้งเตือน

---

## ทำให้เป็น LINE Mini App

### 1. สร้าง LINE Login channel

- ไปที่ [LINE Developers Console](https://developers.line.biz/console/)
- Create new provider → **Create a LINE Login channel**
- กรอกข้อมูลตามขั้นตอน

### 2. เพิ่ม LIFF app

- ใน LINE Login channel → แท็บ **LIFF** → Add
- **LIFF app name:** Gold Mini App
- **Size:** Full
- **Endpoint URL:** `https://your-frontend-url.vercel.app` (URL หลัง deploy frontend)
- **Scope:** profile, openid
- กด Add → ได้ **LIFF ID**

### 3. Deploy Frontend

- Deploy บน Vercel / Netlify / หรือ hosting อื่น
- ตั้งค่า **Environment variable:** `VITE_LIFF_ID` = LIFF ID ที่ได้
- ตั้งค่า `VITE_API_URL` = URL ของ backend (เช่น `https://your-backend.railway.app/api`)

### 4. Deploy Backend

- Deploy backend (Railway, Render, Fly.io ฯลฯ)
- ตั้งค่า `LINE_CHANNEL_ACCESS_TOKEN` (จาก Messaging API channel)

### 5. ลิงก์ Mini App

เปิดแอปผ่าน: **`https://liff.line.me/{LIFF_ID}`**

- ส่งลิงก์ให้ตัวเองใน LINE แล้วกดเปิด
- หรือใส่ใน Rich Menu / ข้อความจาก Messaging API bot

---

## รัน local

### Frontend

```bash
cd frontend
npm install
# สร้าง .env แล้วใส่ VITE_LIFF_ID= (ว่างได้ถ้าเทสใน browser ธรรมดา)
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### ทดสอบ Frontend + Backend

1. รัน backend ก่อน (พอร์ต 4000)
2. รัน frontend (พอร์ต 5173)
3. เปิด http://localhost:5173 – frontend จะ proxy `/api` ไปที่ backend

=======
# goldup
a gold trader helpers line miniapp
>>>>>>> 1f51ac4fc81743ace10a6aa52ec828d1139795ea
