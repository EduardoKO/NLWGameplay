import React, { useEffect, useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons'
import { ImageBackground, Text, View, FlatList, Alert, Platform, Share } from 'react-native';
import * as Linking from 'expo-linking';

import BannerImg from '../../assets/banner.png'

import { styles } from './styles';

import { Background } from '../../components/Background'
import ListHeader from '../../components/ListHeader'
import Header from '../../components/Header';

import { theme } from '../../global/styles/theme';
import Member, { MemberProps } from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useRoute } from '@react-navigation/core';
import { AppointmentProps } from '../../components/Appointment';
import api from '../../services/api';
import Load from '../../components/Loading';

type Params = {
  guildSelected: AppointmentProps
}

type GuildWiget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export default function AppointmentDetails() {
  const [ widget, setWidget ] = useState<GuildWiget>({} as GuildWiget);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const fetchGuildWidget = async () => {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  const handleSharedInvitation = () => {
    const message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  const handleOpenGuild = async () => {
    Linking.openURL(widget.instant_invite);
  }
  
  return (
    <Background>
      <Header title="Detalhes" action={guildSelected.guild.owner &&
        <BorderlessButton onPress={handleSharedInvitation}>
          <Fontisto size={24} name="share" color={theme.colors.primary}/>
        </BorderlessButton>
      }/>
      <ImageBackground style={styles.banner} source={BannerImg}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>
      {loading ? <Load /> :
        <>
          <ListHeader title="Jogadores" subtitle={`Total de ${widget.members.length}`}/>
          <FlatList 
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Member data={item}/>
            )}
            ItemSeparatorComponent={() => <ListDivider isCentered/>}
            style={styles.members}
          />
        </> 
      }
      <View style={styles.footer}>
        <ButtonIcon onPress={handleOpenGuild} title="Entrar na partida"/>
      </View>
    </Background>
  )
}