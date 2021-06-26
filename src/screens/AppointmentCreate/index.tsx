import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

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
import { GuildProps } from '../../components/Guild';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { useNavigation } from '@react-navigation/core';

export default function AppointmentCreate() {
  const navigation = useNavigation();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const handleOpenGuilds = () => {
    setOpenGuildsModal(true)
  }

  const handleCategorySelect = (categoryId: string) => {
    setCategory(category)
  }

  const handleCloseGuilds = () => {
    setOpenGuildsModal(false)
  }

  const handleGuildSelect = (guildSelected: GuildProps) => {
    setGuild(guildSelected);
    setOpenGuildsModal(false)
  }

  const handleSave = async () => {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ?JSON.parse(storage) : [];

    await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify([...appointments, newAppointment]));

    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <Background>
          <Header title="Agendar Partida" />
          <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18}]}>Categoria</Text>
          <CategorySelect hasChecked setCategory={handleCategorySelect} categorySelected={category}/>
          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon ? 
                  <GuildIcon guildId={guild.id} iconId={guild.icon}/> : <View style={styles.image}/>
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
                <Text style={[styles.label, { marginBottom:12 }]}>Dia e mês</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} value={day} onChangeText={setDay}/>
                  <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2} value={month} onChangeText={setMonth}/>
              </View>
              </View>
              <View>
                <Text style={[styles.label, { marginBottom:12 }]}>Hora e minuto</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} value={hour} onChangeText={setHour}/>
                  <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2} value={minute} onChangeText={setMinute}/>
              </View>
              </View>
            </View>
            <View style={[styles.field, {marginBottom: 12}]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>
            <TextArea value={description} onChangeText={setDescription} multiline maxLength={100} numberOfLines={5} autoCorrect={false}/>
            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave}/>
            </View>
          </View>
        </Background>
      </ScrollView>
      <ModalView closeModal={handleCloseGuilds} visible={openGuildsModal}>
        <Guilds handleGuildSelected={handleGuildSelect}/>
      </ModalView>
    </KeyboardAvoidingView>
  )
}