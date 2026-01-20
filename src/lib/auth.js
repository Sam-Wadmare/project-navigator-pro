// auth.js - Authentication helper functions for CURADOCS

const USERS_KEY = 'curadocs_users';
const CURRENT_USER_KEY = 'curadocs_current_user';

// get all users from localStorage
export function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  if (users) {
    return JSON.parse(users);
  }
  return [];
}

// save users array to localStorage
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// get the currently logged in user
export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

// set current user when logging in
function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// clear current user when logging out
export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// generate simple unique id
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// signup function - creates new user
export function signup(fullName, email, password, role) {
  const users = getUsers();
  
  // check if email already exists
  const existingUser = users.find(function(u) {
    return u.email.toLowerCase() === email.toLowerCase();
  });
  
  if (existingUser) {
    return { success: false, message: 'An account with this email already exists' };
  }

  // create new user object
  const newUser = {
    id: generateId(),
    fullName: fullName,
    email: email.toLowerCase(),
    role: role,
    createdAt: new Date().toISOString(),
  };

  // store password separately (not secure but ok for demo)
  const passwords = JSON.parse(localStorage.getItem(USERS_KEY + '_passwords') || '{}');
  passwords[newUser.id] = password;
  localStorage.setItem(USERS_KEY + '_passwords', JSON.stringify(passwords));

  // save user to users array
  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return { success: true, message: 'Account created successfully', user: newUser };
}

// login function - authenticates user
export function login(email, password) {
  const users = getUsers();
  
  // find user by email
  const user = users.find(function(u) {
    return u.email.toLowerCase() === email.toLowerCase();
  });

  if (!user) {
    return { success: false, message: 'No account found with this email' };
  }

  // check password
  const passwords = JSON.parse(localStorage.getItem(USERS_KEY + '_passwords') || '{}');
  if (passwords[user.id] !== password) {
    return { success: false, message: 'Incorrect password' };
  }

  setCurrentUser(user);
  return { success: true, message: 'Login successful', user: user };
}

// logout function
export function logout() {
  clearCurrentUser();
}

// check if user is logged in
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

// get dashboard path based on user role
export function getRedirectPath(role) {
  if (role === 'doctor') {
    return '/doctor-dashboard';
  }
  return '/patient-dashboard';
}
