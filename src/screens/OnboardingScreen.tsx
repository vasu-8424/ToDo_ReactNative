import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Decorative circles */}
      <View style={commonStyles.topCircleDecoration} />
      <View style={commonStyles.topLeftCircle} />
      
      <View style={styles.content}>
        {/* Illustration area */}
        <View style={styles.illustrationContainer}>
          <View style={styles.personContainer}>
            <View style={styles.person}>
              <View style={styles.personHead} />
              <View style={styles.personBody} />
            </View>
          </View>
          
          {/* Document cards */}
          <View style={styles.documentCards}>
            <View style={[styles.card, styles.card1]}>
              <View style={styles.cardLines} />
              <View style={[styles.cardLines, { width: 40 }]} />
              <View style={styles.checkmark} />
            </View>
            <View style={[styles.card, styles.card2]}>
              <View style={styles.cardLines} />
              <View style={[styles.cardLines, { width: 35 }]} />
              <View style={styles.checkmark} />
            </View>
            <View style={[styles.card, styles.card3]}>
              <View style={styles.cardLines} />
              <View style={[styles.cardLines, { width: 30 }]} />
              <View style={styles.highlightBar} />
            </View>
          </View>
        </View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Gets things with TODs</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Eget sit nec et euismod. 
            Consequat urna quam felis interdum quisque. Malesuada adipiscing 
            tristique ut eget sed.
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  illustrationContainer: {
    height: 320,
    marginBottom: 40,
    position: 'relative',
    alignItems: 'center',
  },
  personContainer: {
    position: 'absolute',
    bottom: 0,
    left: 20,
  },
  person: {
    alignItems: 'center',
  },
  personHead: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#333',
    marginBottom: 5,
  },
  personBody: {
    width: 45,
    height: 70,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  documentCards: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card1: {
    width: 140,
    height: 100,
    top: 40,
    right: 20,
    transform: [{ rotate: '5deg' }],
  },
  card2: {
    width: 130,
    height: 95,
    top: 100,
    left: width / 2 - 15,
    transform: [{ rotate: '-3deg' }],
  },
  card3: {
    width: 120,
    height: 90,
    top: 180,
    right: 50,
    transform: [{ rotate: '8deg' }],
  },
  cardLines: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginBottom: 6,
    width: 50,
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  highlightBar: {
    position: 'absolute',
    top: 15,
    right: 10,
    width: 30,
    height: 20,
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
