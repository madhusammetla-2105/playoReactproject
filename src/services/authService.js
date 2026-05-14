import { usersData } from '../data/usersData';

// Simulating network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (email, password) => {
    await delay(800);
    
    // Check if email has @ and ends with gmail.com
    if (!email.includes('@') || !email.endsWith('gmail.com')) {
      throw new Error("Invalid email. Must be a valid @gmail.com address.");
    }
    
    // Accept any password, but check if we have a mock user for this email to get their role.
    // If not, we'll create a default user profile dynamically.
    let user = usersData.find(u => u.email === email);
    if (!user) {
      user = {
        id: `mock-${Date.now()}`,
        name: email.split('@')[0], // Use part before @ as name
        email: email,
        role: "user"
      };
    }
    
    // Create a mock token
    const token = `mock-jwt-token-${user.id}`;
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return { user: userData, token };
  },
  
  logout: async () => {
    await delay(300);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  updateUser: async (updatedData) => {
    await delay(500);
    const userStr = localStorage.getItem('user');
    if (!userStr) throw new Error("No user found");
    
    const currentUser = JSON.parse(userStr);
    const newUser = { ...currentUser, ...updatedData };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  }
};
