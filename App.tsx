import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import { TaskProvider } from './src/contexts/TaskContext';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/styles/toastConfig.tsx';

const Root = () => {
  const { user } = useContext(AuthContext);
  return user ? <AppStack /> : <AuthStack />;
};

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </TaskProvider>
    </AuthProvider>
  );
}
