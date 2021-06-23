import React from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { styles } from './styles'

import illustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';

export function SignIn() {
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Image resizeMode="stretch" style={styles.image} source={illustrationImg}/>
      
      <View style={styles.content}>
        <Text style={styles.title}>
          Conecte-se{`\n`}
          e organize suas{`\n`}
          jogatinas{`\n`}
        </Text>
        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games{`\n`}
          favoritos com seus amigos{`\n`}
        </Text>

        <ButtonIcon onPress={handleSignIn} title="Entrar com Discord" />
      </View>
    </View>
  );
}
