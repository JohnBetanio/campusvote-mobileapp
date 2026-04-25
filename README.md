# CampusVote — SNSU Online Voting System

A mobile voting system built with **React Native + Expo Router** (file-based routing).

---

## 📁 Project Structure

```
CampusVote/
├── app/
│   ├── _layout.tsx              ← Root layout + auth guard
│   ├── +not-found.tsx           ← 404 screen
│   ├── (auth)/
│   │   ├── _layout.tsx          ← Auth stack navigator
│   │   ├── student-login.tsx    ← Student login screen
│   │   ├── student-register.tsx ← Student registration screen
│   │   └── admin-login.tsx      ← Admin login screen
│   └── (tabs)/
│       ├── _layout.tsx          ← Tab bar (student OR admin tabs)
│       ├── index.tsx            ← Student: Home
│       ├── elections.tsx        ← Student: Elections
│       ├── results.tsx          ← Student: Results
│       ├── profile.tsx          ← Student: Profile + Logout
│       ├── admin-dashboard.tsx  ← Admin: Dashboard
│       ├── admin-students.tsx   ← Admin: Student management
│       ├── admin-elections.tsx  ← Admin: Election management
│       └── admin-profile.tsx    ← Admin: Profile + Logout
├── context/
│   └── AuthContext.tsx          ← Auth state + AsyncStorage
├── constants/
│   └── Colors.ts                ← Color palette
├── hooks/
│   └── useStoredStudents.ts     ← Students data hook
├── app.json
├── package.json
├── tsconfig.json
└── babel.config.js
```

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start Expo (no spaces in path!)
```bash
npx expo start
```

> ⚠️ **Windows users**: Make sure there are NO spaces in the folder path.
> Move to `C:\Users\USER\Desktop\CampusVote` (not `CampusVote-Mobile app`).

Scan the QR code with **Expo Go** on Android/iOS, or press:
- `a` → Android emulator  
- `i` → iOS simulator  
- `w` → Web browser

---

## 🔐 Authentication

### Default Admin Credentials
| Field    | Value               |
|----------|---------------------|
| Email    | admin@snsu.edu.ph   |
| Password | admin123            |

### Student Registration Rules
- Email **must** end with `@snsu.edu.ph`
- Password minimum 6 characters
- All fields required

---

## 🔄 Auth Flow (Auto-redirect)

The root `app/_layout.tsx` acts as an **auth guard**:

```
Not logged in    → /(auth)/student-login
Logged in student → /(tabs)/          (Home tab)
Logged in admin   → /(tabs)/admin-dashboard
```

Tabs are **conditionally shown** — students see 4 student tabs, admins see 4 admin tabs.

---

## 📱 Screens

### Auth Screens
| File | Route | Description |
|------|-------|-------------|
| `(auth)/student-login.tsx` | `/student-login` | Student login with Gmail option |
| `(auth)/student-register.tsx` | `/student-register` | Registration with password strength |
| `(auth)/admin-login.tsx` | `/admin-login` | Admin login with credential hint |

### Student Tabs
| File | Tab | Description |
|------|-----|-------------|
| `(tabs)/index.tsx` | 🏠 Home | Dashboard, vote status, active election |
| `(tabs)/elections.tsx` | 🗳️ Elections | Browse & vote in elections |
| `(tabs)/results.tsx` | 📊 Results | Live partial results |
| `(tabs)/profile.tsx` | 👤 Profile | Account info + logout |

### Admin Tabs
| File | Tab | Description |
|------|-----|-------------|
| `(tabs)/admin-dashboard.tsx` | 📋 Dashboard | Stats, turnout, active election |
| `(tabs)/admin-students.tsx` | 👥 Students | List, search, filter, delete |
| `(tabs)/admin-elections.tsx` | 🗳️ Elections | Manage elections, end live ones |
| `(tabs)/admin-profile.tsx` | 🛡️ Profile | Admin info, quick actions + logout |

---

## 💾 AsyncStorage Keys

| Key | Contents |
|-----|----------|
| `cv_students` | Array of registered student accounts |
| `cv_admins` | Array of admin accounts |
| `cv_current_user` | Currently logged-in session |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary (Student) | `#1B5E20` dark green |
| Primary Light | `#2E7D32` |
| Admin Primary | `#1a237e` navy |
| Background | `#F5F7F5` |
| Card | `#ffffff` |

---

## ✅ Features

- [x] Functional student registration & login
- [x] Functional admin login (default credentials)
- [x] Session persistence via AsyncStorage
- [x] Auto-redirect auth guard in root layout
- [x] Conditional tab bar (student vs admin)
- [x] Password strength meter
- [x] Show/hide password toggle
- [x] Student search + filter in admin panel
- [x] Delete student from admin panel
- [x] Pull-to-refresh on admin screens
- [x] Voter turnout progress bar
- [x] Profile screens with logout

## 🔮 Next Steps
- [ ] Voting ballot UI with candidate selection
- [ ] Real-time Firebase backend
- [ ] Google Sign-In (expo-auth-session)
- [ ] Push notifications (expo-notifications)
- [ ] Election creation form
- [ ] Candidate management
