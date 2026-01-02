import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast, ErrorToast, InfoToast, ToastConfigParams } from 'react-native-toast-message';
import { colors } from './commonStyles';

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: colors.primary,
    borderLeftWidth: 5,
    backgroundColor: colors.white,
    height: 70,
  },
  errorToast: {
    borderLeftColor: colors.error,
    borderLeftWidth: 5,
    backgroundColor: colors.white,
    height: 70,
  },
  infoToast: {
    borderLeftColor: '#4A90E2',
    borderLeftWidth: 5,
    backgroundColor: colors.white,
    height: 70,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: colors.black,
  },
  text2: {
    fontSize: 14,
    color: colors.gray,
  },
});

export const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  ),
  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  ),
  info: (props: ToastConfigParams<any>) => (
    <InfoToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  ),
};
