import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URL;

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    connection.on("error", (err) => {
      console.log("MongoDB Connection Error", err);
      process.exit();
    });
  } catch (err) {
    console.log(err);
  }
}

/*

Seedhi baat: **code basic level pe kaam karega**, lekin production-grade Next.js app ke liye yeh incomplete hai aur kuch jagah galat pattern follow kar raha hai. Agar tum 100x level pe soch rahe ho, to hume reliability, performance, scalability, serverless behavior aur hot-reload issues sab consider karne padenge.

Chalo breakdown karte hain.

---

## 🔍 1. Tumhara Current Code – Kya Sahi Hai?

### ✅ Sahi Cheezein

* `mongoose.connect()` use kiya — correct.
* Event listeners (`connected`, `error`) lagaye — good for debugging.
* `process.env.DB_URL` use kiya — environment variable usage correct.

Lekin yeh sirf beginner-level implementation hai.

---

## ❌ 2. Problems in Production Context

### ❌ 1. Har Request Pe Dubara Connection Banega (Big Problem in Next.js)

Next.js (especially in App Router / serverless mode) me:

* Har API route invocation me function re-run hota hai.
* Tumhara `connectDB()` agar har request me call hoga, to **multiple connections create karega**.
* MongoDB Atlas me connection limit hota hai (free tier ~500).
* Result → connection leak + performance drop.

Production me yeh unacceptable hai.

---

### ❌ 2. `process.exit()` Serverless Environment Me Galat

```
process.exit();
```

Yeh bilkul galat approach hai Next.js me.

* Agar Vercel pe ho → serverless function crash ho jayega.
* Better: error throw karo, process kill mat karo.

---

### ❌ 3. MONGODB_URI Null Ho Sakta Hai
Tumne `MONGODB_URI!` use kiya (non-null assertion).
TypeScript ko chup kara diya, lekin runtime pe agar undefined hua to crash hoga.

Production code defensive hota hai.

---

### ❌ 4. Event Listeners Har Call Pe Add Ho Rahe
Agar `connectDB()` multiple baar call hua:

```
connection.on("connected", ...)
```

Har baar naya listener add hoga → memory leak warning.

---

## 🚀 Production-Grade Pattern (Correct Way)

Next.js + Mongoose ke liye recommended pattern hota hai:

* Global caching of connection
* Singleton pattern
* Avoid multiple connections
* No process.exit()

---

### ✅ Production Ready Code

```ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URL;

if (!MONGODB_URI) {
  throw new Error("Please define the DB_URL environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
```

---

## 💡 Yeh Pattern Kyun Best Hai?

### 🔥 1. Global Cache Use Kar Raha Hai
Server reload ya hot reload me:

* Multiple connections nahi banenge
* Same connection reuse hogi

---

### 🔥 2. Promise Reuse Pattern
Agar 5 requests same time pe aaye:

* 5 connections nahi banenge
* Sab same promise ka wait karenge

This is senior-level optimization.

---

### 🔥 3. Safe for:
* Vercel
* Serverless
* Edge cases
* Dev hot reload

---

## 🧠 100x Developer Thinking

Ab sun carefully.

Real production standards me tumhe yeh bhi sochna chahiye:

### 1️⃣ Connection Pooling
MongoDB already internally manage karta hai, but ensure:

```
mongoose.connect(uri, {
  bufferCommands: false,
});
```

---

### 2️⃣ Logging Strategy
Production me `console.log()` use nahi karte.
Use:
* Winston
* Pino
* Structured logging

---

### 3️⃣ Retry Logic
Agar connection fail ho?
* Retry mechanism hona chahiye
* Backoff strategy

---

### 4️⃣ Dev vs Prod Behavior
Dev me:
* More logs

Prod me:
* Minimal logs
* Error monitoring (Use tools like Sentry)

---

### 5️⃣ Folder Structure Best Practice

```
  lib/
    db.ts
  models/
  app/api/
```

Never connect DB inside models file.

---

## 🧨 Brutal Truth

Tumhara current code:

* Works in small test project ✅
* Not production safe ❌
* Not scalable ❌
* Can cause connection explosion ❌

Agar tum interview me yeh code dikhaoge:

* Junior level acceptable
* Senior level reject

---


*/
