import React, {  useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from './styles';

import { Background } from '../../components/Background';

import { Profile } from '../../components/Profile';
import ListHeader from '../../components/ListHeader';
import CategorySelect from '../../components/CategorySelect';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Appointment } from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';
import { useNavigation } from '@react-navigation/core';

export default function Home() {
  const [ category, setCategory ] = useState('');
  const navigation = useNavigation();

  const appointments = [
    { id: '1', guild: { id: '2', name: 'Lendários', icon: null, owner: true }, category: '1', date: '22/06 às 20:40h', description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'}
  ]

  const handleCategorySelect = (categoryId: string) => {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  const handleAppointmentDetails = () => {
    navigation.navigate('AppointmentDetails')
  }

  const handleAppointmentCreate = () => {
    navigation.navigate('AppointmentCreate')
  }

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect categorySelected={category} setCategory={handleCategorySelect}/>
      <ListHeader title="Partidas Agendadas" subtitle="Total 6"/>
      <FlatList data={appointments} keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Appointment onPress={handleAppointmentDetails} data={item}/>
        )}
        showsVerticalScrollIndicator={false}
        style={styles.matches}
        ItemSeparatorComponent={() => <ListDivider />}
        contentContainerStyle={{paddingBottom: 69}}
      />
    </Background>
  )
}