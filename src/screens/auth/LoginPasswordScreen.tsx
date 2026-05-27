import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LoginPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Password Screen</Text>
    </View>
  );
};

export default LoginPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});
