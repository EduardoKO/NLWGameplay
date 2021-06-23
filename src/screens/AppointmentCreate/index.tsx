import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Background } from '../../components/Background'
import Header from '../../components/Header';
import CategorySelect from '../../components/CategorySelect';
import GuildIcon from '../../components/GuildIcon';
import SmallInput from '../../components/SmallInput';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { RectButton } from 'react-native-gesture-handler';
import TextArea from '../../components/TextArea';
import { Button } from '../../components/Button';
import Guilds from '../Guilds';
import ModalView from '../../components/ModalView';
import { GuildProps } from '../../components/Appointment';

export default function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  const handleOpenGuilds = () => {
    setOpenGuildsModal(true)
  }

  const handleGuildSelect = (guildSelected: GuildProps) => {
    setGuild(guildSelected);
    setOpenGuildsModal(false)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <Background>
          <Header title="Agendar Partida" />
          <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18}]}>Categoria</Text>
          <CategorySelect hasChecked setCategory={setCategory} categorySelected={category}/>
          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon ? 
                  <GuildIcon /> : <View style={styles.image}/>
                }
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                  {
                    guild.name ? guild.name : 'Selecione o Servidor'
                  }</Text>
                </View>
                <Feather name="chevron-right" size={18} color={theme.colors.heading}/>
              </View>
            </RectButton>
            <View style={styles.field}>
              <View>
                <Text style={styles.label}>Dia e mês</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2}/>
                  <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2}/>
              </View>
              </View>
              <View>
                <Text style={styles.label}>Hora e minuto</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2}/>
                  <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2}/>
              </View>
              </View>
            </View>
            <View style={[styles.field, {marginBottom: 12}]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>
            <TextArea multiline maxLength={100} numberOfLines={5} autoCorrect={false}/>
            <View style={styles.footer}>
              <Button title="Agendar"/>
            </View>
          </View>
        </Background>
      </ScrollView>
      <ModalView visible={openGuildsModal}>
        <Guilds handleGuildSelected={handleGuildSelect}/>
      </ModalView>
    </KeyboardAvoidingView>
  )
}