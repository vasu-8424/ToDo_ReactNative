import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { colors, commonStyles } from '../styles/commonStyles';

export default function RegisterScreen({ navigation }: any) {
  const { register } = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }
    register(email, password, fullName);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Decorative circles */}
        <View style={commonStyles.topCircleDecoration} />
        <View style={commonStyles.topLeftCircle} />
        
        <View style={styles.content}>
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.welcomeCircle}>
              <View style={styles.checkCircle} />
            </View>
          </View>

          {/* Welcome Text */}
          <Text style={styles.title}>Welcome to Onboard!</Text>
          <Text style={styles.subtitle}>Let's help to meet up your tasks.</Text>

          {/* Input Fields */}
          <View style={styles.inputWrapper}>
            <View style={commonStyles.inputContainer}>
              <TextInput
                style={commonStyles.input}
                placeholder="Enter your full name"
                placeholderTextColor={colors.gray}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={commonStyles.inputContainer}>
              <TextInput
                style={commonStyles.input}
                placeholder="Enter your Email"
                placeholderTextColor={colors.gray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={commonStyles.inputContainer}>
              <TextInput
                style={commonStyles.input}
                placeholder="Enter Password"
                placeholderTextColor={colors.gray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={commonStyles.inputContainer}>
              <TextInput
                style={commonStyles.input}
                placeholder="Confirm password"
                placeholderTextColor={colors.gray}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={commonStyles.button} onPress={handleRegister}>
            <Text style={commonStyles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <Text style={commonStyles.linkText}>
            Already have an account?{' '}
            <Text 
              style={commonStyles.linkTextBold}
              onPress={() => navigation.navigate('Login')}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 30,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 35,
  },
  inputWrapper: {
    marginBottom: 20,
  },
});

