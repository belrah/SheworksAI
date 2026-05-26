# Authentication System Documentation

This document explains how the authentication system works for both **Employers** and **Job Seekers (Users)** in the SheWorks Africa platform.

## Overview

The platform has two separate authentication systems:
1. **Employer Authentication** - For companies posting jobs
2. **User Authentication** - For job seekers looking for work

Both systems use localStorage for demo purposes. In production, these would connect to a backend API.

---

## Employer Authentication Flow

### 1. Employer Signup (`/employer/signup`)

**File**: `src/app/components/EmployerOnboarding.tsx`

**Process**:
- 4-step registration form with validation
- **Step 1**: Company Information (name, industry, size)
- **Step 2**: Contact Person Details (name, position, email, phone)
- **Step 3**: Location Information (country, city, address)
- **Step 4**: Account Security (password creation)

**Data Storage**:
```javascript
const employerData = {
  id: Date.now().toString(),
  companyName: string,
  industry: string,
  companySize: string,
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  position: string,
  country: string,
  city: string,
  address: string,
  password: string,
  registeredAt: new Date().toISOString()
}

localStorage.setItem('employerData', JSON.stringify(employerData));
localStorage.setItem('isEmployerLoggedIn', 'false');
```

**After Signup**: User is redirected to `/employer/login`

### 2. Employer Login (`/employer/login`)

**File**: `src/app/components/EmployerLogin.tsx`

**Process**:
1. User enters email and password
2. System validates credentials against stored data
3. If valid, sets login state and redirects to dashboard
4. Supports "Remember Me" functionality

**Login Logic**:
```javascript
const storedData = localStorage.getItem('employerData');
const employerData = JSON.parse(storedData);

if (email === employerData.email && password === employerData.password) {
  localStorage.setItem('isEmployerLoggedIn', 'true');
  navigate('/employer/dashboard');
}
```

**Features**:
- Password visibility toggle
- Remember me checkbox
- Social login options (Google, LinkedIn)
- Link to forgot password
- Link to signup for new users

### 3. Employer Forgot Password (`/employer/forgot-password`)

**File**: `src/app/components/ForgotPassword.tsx`

**Process**:
1. **Request Reset**: User enters email
   - System checks if email exists in stored data
   - Sends verification code (demo code: `123456`)
   
2. **Verify & Reset**: User enters code and new password
   - Validates verification code
   - Validates password match
   - Updates password in localStorage

3. **Success**: User is redirected to login page

**Password Reset Logic**:
```javascript
const storedData = localStorage.getItem('employerData');
const employerData = JSON.parse(storedData);

if (code === verificationCode && email === employerData.email) {
  employerData.password = newPassword;
  localStorage.setItem('employerData', JSON.stringify(employerData));
}
```

### 4. Employer Dashboard Access

**File**: `src/app/components/EmployerDashboard.tsx`

**Protection**:
```javascript
useEffect(() => {
  const isLoggedIn = localStorage.getItem('isEmployerLoggedIn');
  if (isLoggedIn !== 'true') {
    navigate('/employer/login');
  }
}, [navigate]);
```

**Logout**:
```javascript
const handleLogout = () => {
  localStorage.setItem('isEmployerLoggedIn', 'false');
  navigate('/employer/login');
};
```

---

## User (Job Seeker) Authentication Flow

### 1. User Signup (`/user/signup`)

**File**: `src/app/components/UserSignup.tsx`

**Process**:
- 4-step registration form with validation
- **Step 1**: Personal Information (name, DOB, gender)
- **Step 2**: Contact & Location (email, phone, address)
- **Step 3**: Skills & Experience (category, skills selection, bio)
- **Step 4**: Account Security (password creation)

**Data Storage**:
```javascript
const userData = {
  id: Date.now().toString(),
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  dateOfBirth: string,
  gender: string,
  country: string,
  city: string,
  address: string,
  category: string,
  skills: string[],
  experience: string,
  bio: string,
  password: string,
  registeredAt: new Date().toISOString(),
  profileComplete: true
}

localStorage.setItem('userData', JSON.stringify(userData));
localStorage.setItem('isUserLoggedIn', 'false');
```

**After Signup**: User is redirected to `/user/login`

### 2. User Login (`/user/login`)

**File**: `src/app/components/UserLogin.tsx`

**Process**:
1. User enters email and password
2. System validates credentials against stored data
3. If valid, sets login state and redirects to dashboard
4. Supports "Remember Me" functionality

**Login Logic**:
```javascript
const storedData = localStorage.getItem('userData');
const userData = JSON.parse(storedData);

if (email === userData.email && password === userData.password) {
  localStorage.setItem('isUserLoggedIn', 'true');
  navigate('/user/dashboard');
}
```

**Features**:
- Password visibility toggle
- Remember me checkbox
- Social login options (Google, Facebook)
- Link to forgot password
- Link to signup for new users
- Quick switch to employer login

### 3. User Forgot Password (`/user/forgot-password`)

**File**: `src/app/components/UserForgotPassword.tsx`

**Process**:
1. **Request Reset**: User enters email
   - System checks if email exists in stored data
   - Sends verification code (demo code: `123456`)
   
2. **Verify & Reset**: User enters code and new password
   - Validates verification code
   - Validates password match
   - Updates password in localStorage

3. **Success**: User is redirected to login page

**Password Reset Logic**:
```javascript
const storedData = localStorage.getItem('userData');
const userData = JSON.parse(storedData);

if (code === verificationCode && email === userData.email) {
  userData.password = newPassword;
  localStorage.setItem('userData', JSON.stringify(userData));
}
```

### 4. User Dashboard Access

**File**: `src/app/components/UserDashboard.tsx`

**Protection**:
```javascript
useEffect(() => {
  const isLoggedIn = localStorage.getItem('isUserLoggedIn');
  if (isLoggedIn !== 'true') {
    navigate('/user/login');
  }
}, [navigate]);
```

**Logout**:
```javascript
const handleLogout = () => {
  localStorage.setItem('isUserLoggedIn', 'false');
  navigate('/user/login');
};
```

---

## Authentication Utilities

**File**: `src/app/utils/auth.ts`

Reusable functions for authentication:

### Employer Functions
- `saveEmployerData(data)` - Save employer data to localStorage
- `getEmployerData()` - Retrieve employer data
- `validateEmployerCredentials(email, password)` - Validate login
- `updateEmployerPassword(email, newPassword)` - Update password
- `isEmployerLoggedIn()` - Check login status
- `setEmployerLoggedIn(status)` - Set login status
- `logoutEmployer()` - Logout and clear session

### User Functions
- `saveUserData(data)` - Save user data to localStorage
- `getUserData()` - Retrieve user data
- `validateUserCredentials(email, password)` - Validate login
- `updateUserPassword(email, newPassword)` - Update password
- `isUserLoggedIn()` - Check login status
- `setUserLoggedIn(status)` - Set login status
- `logoutUser()` - Logout and clear session

### General Utilities
- `clearAllAuthData()` - Clear all authentication data
- `generateVerificationCode()` - Generate 6-digit code
- `setRememberEmployer(email)` - Save employer email for remember me
- `getRememberedEmployerEmail()` - Get remembered employer email
- `setRememberUser(email)` - Save user email for remember me
- `getRememberedUserEmail()` - Get remembered user email

---

## Testing the Authentication System

### Test Employer Flow:

1. **Signup**:
   - Go to `/employer/signup`
   - Fill out all 4 steps
   - Use email: `employer@example.com`, password: `password123`
   - Complete registration

2. **Login**:
   - Go to `/employer/login`
   - Enter: `employer@example.com` / `password123`
   - Check "Remember me" (optional)
   - Click Sign In

3. **Forgot Password**:
   - Go to `/employer/forgot-password`
   - Enter: `employer@example.com`
   - Use code: `123456`
   - Set new password
   - Login with new password

4. **Dashboard**:
   - Access at `/employer/dashboard`
   - Navigate through Jobs, Candidates, Messages, Analytics, Settings
   - Test logout

### Test User Flow:

1. **Signup**:
   - Go to `/user/signup`
   - Fill out all 4 steps
   - Select skills (click to add/remove)
   - Use email: `user@example.com`, password: `password123`
   - Complete registration

2. **Login**:
   - Go to `/user/login`
   - Enter: `user@example.com` / `password123`
   - Check "Remember me" (optional)
   - Click Sign In

3. **Forgot Password**:
   - Go to `/user/forgot-password`
   - Enter: `user@example.com`
   - Use code: `123456`
   - Set new password
   - Login with new password

4. **Dashboard**:
   - Access at `/user/dashboard`
   - Navigate through Find Jobs, Applications, Messages, Profile, Settings
   - Test logout

---

## Security Notes

### Current Implementation (Demo)
- Uses localStorage for data storage
- Passwords stored in plain text
- No encryption
- No backend validation
- Demo verification codes

### Production Requirements
- Backend API integration
- Password hashing (bcrypt, argon2)
- JWT tokens for session management
- HTTPS only
- Email verification service
- SMS verification for phone
- Rate limiting on login attempts
- Password strength requirements
- 2FA support
- Secure session management
- CSRF protection
- XSS prevention

---

## Routes Summary

### Employer Routes
- `/employer/signup` - Registration
- `/employer/login` - Login
- `/employer/forgot-password` - Password recovery
- `/employer/dashboard/*` - Dashboard (protected)

### User Routes
- `/user/signup` - Registration
- `/user/login` - Login
- `/user/forgot-password` - Password recovery
- `/user/dashboard/*` - Dashboard (protected)

### Public Routes
- `/` - Landing page

---

## localStorage Keys

### Employer
- `employerData` - Employer account data
- `isEmployerLoggedIn` - Login status ("true"/"false")
- `rememberEmployer` - Remember me status
- `rememberedEmail` - Remembered email

### User
- `userData` - User account data
- `isUserLoggedIn` - Login status ("true"/"false")
- `rememberUser` - Remember me status
- `rememberedUserEmail` - Remembered email

---

## Error Handling

All authentication flows include:
- Form validation with react-hook-form
- Real-time error messages
- Toast notifications for success/error states
- Redirect on unauthorized access
- Clear error states for invalid credentials
- Password mismatch validation
- Email format validation
- Required field validation

---

## Responsive Design

All authentication pages are fully responsive:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly buttons and inputs
- Optimized layouts for all screen sizes
- Mobile menu for dashboards
