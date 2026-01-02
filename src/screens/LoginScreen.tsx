import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView 
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { colors, commonStyles } from '../styles/commonStyles';

export default function LoginScreen({ navigation }: any) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      return;
    }
    login(email, password);
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
            <View style={styles.coupleContainer}>
              <View style={styles.person1}>
                <View style={styles.personHead} />
                <View style={[styles.personBody, { backgroundColor: colors.primary }]} />
              </View>
              <View style={styles.person2}>
                <View style={styles.personHead} />
                <View style={[styles.personBody, { backgroundColor: '#FF6B9D' }]} />
              </View>
              <View style={styles.heartIcon} />
            </View>
          </View>

          {/* Welcome Text */}
          <Text style={styles.title}>Welcome back</Text>
          
          {/* Input Fields */}
          <View style={styles.inputWrapper}>
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

            {/* Forgot Password Link */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forget password ?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
            <Text style={commonStyles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <Text style={commonStyles.linkText}>
            Don't have an account?{' '}
            <Text 
              style={commonStyles.linkTextBold}
              onPress={() => navigation.navigate('Register')}
            >
              Sign Up
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
    marginBottom: 40,
    height: 200,
    justifyContent: 'center',
  },
  coupleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
  },
  person1: {
    alignItems: 'center',
    marginRight: 20,
  },
  person2: {
    alignItems: 'center',
  },
  personHead: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD7BE',
    marginBottom: 5,
  },
  personBody: {
    width: 50,
    height: 75,
    borderRadius: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: -10,
    left: '45%',
    width: 20,
    height: 20,
    backgroundColor: '#FF6B9D',
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 35,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
  },
});

