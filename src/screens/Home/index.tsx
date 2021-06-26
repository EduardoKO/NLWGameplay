import React, {  useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from './styles';

import { Background } from '../../components/Background';

import { Profile } from '../../components/Profile';
import ListHeader from '../../components/ListHeader';
import CategorySelect from '../../components/CategorySelect';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';
import { useNavigation,useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import Load from '../../components/Loading';

export default function Home() {
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [ category, setCategory ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const navigation = useNavigation();


  const handleCategorySelect = (categoryId: string) => {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  const handleAppointmentDetails = (guildSelected: AppointmentProps) => {
    navigation.navigate('AppointmentDetails', { guildSelected })
  }

  const handleAppointmentCreate = () => {
    navigation.navigate('AppointmentCreate')
  }

  const loadAppointments = async () => {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if(category) {
      setAppointments(storage.filter(item => item.category === category));
    } else {
      setAppointments(storage)
    }

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]));

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect categorySelected={category} setCategory={handleCategorySelect}/>
      {loading ? <Load /> :
        <>
          <ListHeader title="Partidas Agendadas" subtitle={`Total de ${appointments.length}`}/>
          <FlatList data={appointments} keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Appointment onPress={() => handleAppointmentDetails(item)} data={item}/>
            )}
            showsVerticalScrollIndicator={false}
            style={styles.matches}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{paddingBottom: 69}}
          />
        </>
      }
    </Background>
  )
}