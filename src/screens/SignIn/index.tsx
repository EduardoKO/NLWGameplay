import React from 'react';
import { Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles'

import { useAuth } from '../../hooks/auth';
import illustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';
import { theme } from '../../global/styles/theme';

export function SignIn() {

  const handleSignIn = async () => {
    try {
      await signIn()
    } catch (error) {
      Alert.alert(error)
    }
  }

  const { signIn, loading } = useAuth();

  return (
    <Background>
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

          { loading ? <ActivityIndicator color={theme.colors.primary}/> :
            <ButtonIcon onPress={handleSignIn} title="Entrar com Discord" />
          }
        </View>
      </View>
    </Background>
  );
}
