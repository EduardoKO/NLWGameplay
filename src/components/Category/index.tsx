import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { View, Text, Image } from 'react-native';
import { SvgProps } from 'react-native-svg'

import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  checked?: boolean;
}

export default function Category ({ title, icon: Icon, checked = true, ...rest }: Props) {
  return (
    <RectButton {...rest}>
      <LinearGradient colors={[theme.colors.secondary50, theme.colors.secondary70]} style={styles.container}>
        <View style={[styles.content, { opacity: checked ? 1 : 0.4}]}>
          <View style={checked ? styles.checked : styles.check} />
          <Icon width={48} height={48}/>
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </RectButton>
  )
}
