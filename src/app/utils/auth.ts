// Authentication utility functions

export interface EmployerData {
  id: string;
  companyName: string;
  industry: string;
  companySize: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  position: string;
  country: string;
  city: string;
  address: string;
  password: string;
  registeredAt: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  city: string;
  address: string;
  category: string;
  skills: string[];
  experience: string;
  bio: string;
  password: string;
  registeredAt: string;
  profileComplete: boolean;
}

// Employer Authentication
export const saveEmployerData = (data: Partial<EmployerData>): void => {
  const employerData = {
    ...data,
    id: data.id || Date.now().toString(),
    registeredAt: data.registeredAt || new Date().toISOString(),
  };
  localStorage.setItem('employerData', JSON.stringify(employerData));
};

export const getEmployerData = (): EmployerData | null => {
  const data = localStorage.getItem('employerData');
  return data ? JSON.parse(data) : null;
};

export const validateEmployerCredentials = (email: string, password: string): boolean => {
  const employerData = getEmployerData();
  if (!employerData) return false;
  return employerData.email === email && employerData.password === password;
};

export const updateEmployerPassword = (email: string, newPassword: string): boolean => {
  const employerData = getEmployerData();
  if (!employerData || employerData.email !== email) return false;

  employerData.password = newPassword;
  saveEmployerData(employerData);
  return true;
};

export const isEmployerLoggedIn = (): boolean => {
  return localStorage.getItem('isEmployerLoggedIn') === 'true';
};

export const setEmployerLoggedIn = (status: boolean): void => {
  localStorage.setItem('isEmployerLoggedIn', status.toString());
};

export const logoutEmployer = (): void => {
  localStorage.setItem('isEmployerLoggedIn', 'false');
  localStorage.removeItem('rememberEmployer');
  localStorage.removeItem('rememberedEmail');
};

// User Authentication
export const saveUserData = (data: Partial<UserData>): void => {
  const userData = {
    ...data,
    id: data.id || Date.now().toString(),
    registeredAt: data.registeredAt || new Date().toISOString(),
    profileComplete: data.profileComplete ?? true,
  };
  localStorage.setItem('userData', JSON.stringify(userData));
};

export const getUserData = (): UserData | null => {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
};

export const validateUserCredentials = (email: string, password: string): boolean => {
  const userData = getUserData();
  if (!userData) return false;
  return userData.email === email && userData.password === password;
};

export const updateUserPassword = (email: string, newPassword: string): boolean => {
  const userData = getUserData();
  if (!userData || userData.email !== email) return false;

  userData.password = newPassword;
  saveUserData(userData);
  return true;
};

export const isUserLoggedIn = (): boolean => {
  return localStorage.getItem('isUserLoggedIn') === 'true';
};

export const setUserLoggedIn = (status: boolean): void => {
  localStorage.setItem('isUserLoggedIn', status.toString());
};

export const logoutUser = (): void => {
  localStorage.setItem('isUserLoggedIn', 'false');
  localStorage.removeItem('rememberUser');
  localStorage.removeItem('rememberedUserEmail');
};

// General utilities
export const clearAllAuthData = (): void => {
  logoutEmployer();
  logoutUser();
  localStorage.removeItem('employerData');
  localStorage.removeItem('userData');
};

// Verification code utilities (for demo purposes)
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Remember me utilities
export const setRememberEmployer = (email: string): void => {
  localStorage.setItem('rememberEmployer', 'true');
  localStorage.setItem('rememberedEmail', email);
};

export const getRememberedEmployerEmail = (): string | null => {
  const remember = localStorage.getItem('rememberEmployer');
  if (remember === 'true') {
    return localStorage.getItem('rememberedEmail');
  }
  return null;
};

export const setRememberUser = (email: string): void => {
  localStorage.setItem('rememberUser', 'true');
  localStorage.setItem('rememberedUserEmail', email);
};

export const getRememberedUserEmail = (): string | null => {
  const remember = localStorage.getItem('rememberUser');
  if (remember === 'true') {
    return localStorage.getItem('rememberedUserEmail');
  }
  return null;
};
