import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './styles'

import illustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';

export function SignIn() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent/>
      <Image resizeMode="stretch" style={styles.image} source={illustrationImg}/>
      
      <View style={styles.content}>
        <Text style={styles.title}>
          Organize{`\n`}
          suas jogatinas{`\n`}
          facilmente{`\n`}
        </Text>
        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games{`\n`}
          favoritos com seus amigos{`\n`}
        </Text>

        <ButtonIcon title="Entrar com Discord" activeOpacity={0.7} />
      </View>
    </View>
  );
}
