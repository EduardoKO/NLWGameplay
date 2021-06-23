import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

import { Avatar } from '../Avatar';
import { theme } from '../../global/styles/theme';

export type MemberProps = {
  id: string;
  username: string;
  avatarUrl: string;
  status: string;
}

type Props = {
  data: MemberProps
}

export default function Member({ data }: Props) {
  const isOnline = data.status === 'online'
  return (
    <View style={styles.container} >
      <Avatar urlImage={data.avatarUrl}/>
      <View>
        <Text style={styles.title}>{data.username}</Text>
        <View style={styles.status}>
          <View style={[styles.bulletStatus, {backgroundColor: isOnline ? theme.colors.on : theme.colors.primary}]} />
          <Text style={styles.memberStatus}>
            {isOnline ? 'Disponível' : 'Ocupado'}
          </Text>
        </View>
      </View>
    </View>
  )
}