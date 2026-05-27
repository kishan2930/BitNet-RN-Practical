import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CategoryProductsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category Products Screen</Text>
    </View>
  );
};

export default CategoryProductsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  text: { fontSize: 20, fontWeight: 'bold', color: '#272727' },
});
