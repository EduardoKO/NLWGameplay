import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { styles } from './styles';

import PlayerSvg from '../../assets/player.svg';
import Calendar from '../../assets/calendar.svg';

import GuildIcon from '../GuildIcon';

import { categories } from '../../utils/categories';
import { theme } from '../../global/styles/theme';
import { GuildProps } from '../Guild';
import { LinearGradient } from 'expo-linear-gradient';

export type AppointmentProps = {
  id: string;
  guild:GuildProps;
  category: string;
  date: string;
  description: string;
}

type Props = RectButtonProps & {
  data: AppointmentProps
}

export function Appointment({ data, ...rest }: Props) {
  const [ category ] = categories.filter(item => item.id === data.category);
  const { owner } = data.guild;

  return (
    <RectButton { ...rest }>
      <View style={styles.container}>
        <LinearGradient colors={[theme.colors.secondary50, theme.colors.secondary70]} style={styles.guildIconContainer}>
          <GuildIcon guildId={data.guild.id} iconId={data.guild.icon}/>
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{ data.guild.name }</Text>
            <Text style={styles.category}>{category.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Calendar />
              <Text style={styles.date}>{data.date}</Text>
            </View>
            <View style={styles.playersInfo}>
              <PlayerSvg fill={owner ? theme.colors.primary : theme.colors.on}/>

              <Text style={[styles.player, { color: owner ? theme.colors.primary : theme.colors.on}]}>Anfitrião</Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton> 
  )
}