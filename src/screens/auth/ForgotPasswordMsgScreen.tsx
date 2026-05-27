import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import { horizontalScale } from '@utils/responsive';
import ForgotPasswordMsgIcon from '@assets/forgotpassword-message.svg';
import { forgotPasswordMsgStyles as styles } from '@styles/auth/forgotPasswordMsgStyles';

const ForgotPasswordMsgScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <ForgotPasswordMsgIcon width={horizontalScale(100)} height={horizontalScale(100)} />
        </View>

        <CustomText variant="bold" size={24} style={styles.title}>
          We sent you an email to reset your password.
        </CustomText>

        <AppButton
          title="Return to Login"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordMsgScreen;
