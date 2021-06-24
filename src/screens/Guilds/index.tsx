import React from 'react';
import { FlatList, View } from 'react-native';
import { GuildProps } from '../../components/Appointment';
import Guild from '../../components/Guild';
import ListDivider from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
  handleGuildSelected: (guild: GuildProps) => void
}

export default function Guilds({ handleGuildSelected }: Props) {
  const guild = [{id: '1', name: 'Lendários', icon: null, owner: true}]

  return (
    <View style={styles.container}>
      <FlatList
        data={guild}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelected(item)}/>
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
        contentContainerStyle={{ paddingBottom: 68, paddingTop:104 }}
        ListHeaderComponent={() => <ListDivider isCentered /> }
      />
    </View>
  )
}