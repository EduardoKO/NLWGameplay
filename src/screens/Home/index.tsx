import React, {  useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from './styles';

import { Profile } from '../../components/Profile';
import ListHeader from '../../components/ListHeader';
import CategorySelect from '../../components/CategorySelect';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Appointment } from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';

export default function Home() {
  const [ category, setCategory ] = useState('');
  const appointments = [
    { id: '1', guild: { id: '2', name: 'Lendários', icon: null, owner: true }, category: '1', date: '22/06 às 20:40h', description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'}
  ]

  const handleCategorySelect = (categoryId: string) => {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd />
      </View>
      <CategorySelect categorySelected={category} setCategory={handleCategorySelect}/>
      <View style={styles.content}>
        <ListHeader title="Partidas Agendadas" subtitle="Total 6"/>
        <FlatList data={appointments} keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Appointment data={item}/>
          )}
          showsVerticalScrollIndicator={false}
          style={styles.matches}
          ItemSeparatorComponent={() => <ListDivider />}
        />
      </View>
    </View>
  )
}