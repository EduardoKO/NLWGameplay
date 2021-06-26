import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons'
import { ImageBackground, Text, View, FlatList } from 'react-native';

import BannerImg from '../../assets/banner.png'

import { styles } from './styles';

import { Background } from '../../components/Background'
import ListHeader from '../../components/ListHeader'
import Header from '../../components/Header';

import { theme } from '../../global/styles/theme';
import Member from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

export default function AppointmentDetails() {
  const members = [{id: '1', username: 'Eduardo', avatarUrl: 'https://github.com/eduardoko.png', status: 'online'},{id: '2', username: 'Eduardo', avatarUrl: 'https://github.com/eduardoko.png', status: 'offline'},{id: '3', username: 'Eduardo', avatarUrl: 'https://github.com/eduardoko.png', status: 'online'}]
  return (
    <Background>
      <Header title="Detalhes" action={
        <BorderlessButton>
          <Fontisto size={24} name="share" color={theme.colors.primary}/>
        </BorderlessButton>
      }/>
      <ImageBackground style={styles.banner} source={BannerImg}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>É hoje que vamos chegar ao challenger sem perder uma partida da md10</Text>
        </View>
      </ImageBackground>
      <ListHeader title="Jogadores" subtitle="Total 3"/>
      <FlatList 
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Member data={item}/>
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered/>}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida"/>
      </View>
    </Background>
  )
}