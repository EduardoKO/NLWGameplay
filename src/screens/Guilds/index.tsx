import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { GuildProps } from '../../components/Guild';
import Guild from '../../components/Guild';
import ListDivider from '../../components/ListDivider';

import { styles } from './styles';
import Load from '../../components/Loading';
import api from '../../services/api';

type Props = {
  handleGuildSelected: (guild: GuildProps) => void
}

export default function Guilds({ handleGuildSelected }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuilds = async () => {
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);
    setLoading(false);
  }
  
  useEffect(() => {
    fetchGuilds();
  },[])

  return (
    <View style={styles.container}>
      {loading ? <Load /> :
        <FlatList
          data={guilds}
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
      }
    </View>
  )
}