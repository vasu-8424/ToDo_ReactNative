import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

type AuthContextType = {
  user: string | null;
  userName: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, fullName: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on app start
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('currentUser');
      const savedUserName = await AsyncStorage.getItem('currentUserName');
      if (savedUser) {
        setUser(savedUser);
        setUserName(savedUserName);
      }
    } catch (error) {
      console.log('Error checking session:', error);
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    if (!email || !password || !fullName) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'Please fill in all fields',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'Password must be at least 6 characters',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    try {
      // Check if user already exists
      const existingPassword = await AsyncStorage.getItem(`user_${email}`);
      if (existingPassword) {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: 'Email already registered',
          position: 'top',
          visibilityTime: 3000,
        });
        return;
      }

      // Save user data
      await AsyncStorage.setItem(`user_${email}`, password);
      await AsyncStorage.setItem(`userName_${email}`, fullName);
      await AsyncStorage.setItem('currentUser', email);
      await AsyncStorage.setItem('currentUserName', fullName);
      
      setUser(email);
      setUserName(fullName);

      Toast.show({
        type: 'success',
        text1: 'Registration Successful!',
        text2: `Welcome ${fullName}! 🎉`,
        position: 'top',
        visibilityTime: 3000,
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'An error occurred. Please try again.',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please enter email and password',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    try {
      const storedPassword = await AsyncStorage.getItem(`user_${email}`);
      const storedUserName = await AsyncStorage.getItem(`userName_${email}`);
      
      if (storedPassword === password) {
        await AsyncStorage.setItem('currentUser', email);
        await AsyncStorage.setItem('currentUserName', storedUserName || email);
        
        setUser(email);
        setUserName(storedUserName);

        Toast.show({
          type: 'success',
          text1: 'Login Successful!',
          text2: `Welcome back! 👋`,
          position: 'top',
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid email or password',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'An error occurred. Please try again.',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      await AsyncStorage.removeItem('currentUserName');
      setUser(null);
      setUserName(null);

      Toast.show({
        type: 'info',
        text1: 'Logged Out',
        text2: 'See you soon! 👋',
        position: 'top',
        visibilityTime: 2000,
      });
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userName, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
