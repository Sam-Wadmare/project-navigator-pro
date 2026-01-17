// Authentication utility functions and types for SOOO CURA

export type UserRole = 'doctor' | 'patient';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const USERS_KEY = 'sooo_cura_users';
const CURRENT_USER_KEY = 'sooo_cura_current_user';

// Get all registered users from localStorage
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Get current authenticated user
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Set current user (login)
const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

// Clear current user (logout)
export const clearCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Generate a simple unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Signup function
export const signup = (
  fullName: string,
  email: string,
  password: string,
  role: UserRole
): { success: boolean; message: string; user?: User } => {
  const users = getUsers();
  
  // Check if email already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return { success: false, message: 'An account with this email already exists' };
  }

  // Create new user (password stored separately for demo)
  const newUser: User = {
    id: generateId(),
    fullName,
    email: email.toLowerCase(),
    role,
    createdAt: new Date().toISOString(),
  };

  // Store user with password (in real app, this would be hashed on backend)
  const usersWithPasswords = JSON.parse(localStorage.getItem(USERS_KEY + '_passwords') || '{}');
  usersWithPasswords[newUser.id] = password;
  localStorage.setItem(USERS_KEY + '_passwords', JSON.stringify(usersWithPasswords));

  // Save user
  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return { success: true, message: 'Account created successfully', user: newUser };
};

// Login function
export const login = (
  email: string,
  password: string
): { success: boolean; message: string; user?: User } => {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, message: 'No account found with this email' };
  }

  // Check password
  const usersWithPasswords = JSON.parse(localStorage.getItem(USERS_KEY + '_passwords') || '{}');
  if (usersWithPasswords[user.id] !== password) {
    return { success: false, message: 'Incorrect password' };
  }

  setCurrentUser(user);
  return { success: true, message: 'Login successful', user };
};

// Logout function
export const logout = (): void => {
  clearCurrentUser();
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Get redirect path based on role
export const getRedirectPath = (role: UserRole): string => {
  return role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard';
};
