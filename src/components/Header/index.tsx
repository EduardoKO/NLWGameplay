import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { useNavigation } from '@react-navigation/core';

type Props = {
  title: string;
  action?: ReactNode;
}

export default function Header({ title, action}: Props) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack()
  }
  return (
    <LinearGradient style={styles.container} colors={[theme.colors.secondary100, theme.colors.secondary40]}>
      <BorderlessButton onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color={theme.colors.heading}/>
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {
        action ?
        <View>
          {action}
        </View> :
        <View  style={{ width:24 }}/>
      }
    </LinearGradient>
  )
}