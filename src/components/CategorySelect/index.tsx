import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

import { styles } from './styles';
import { categories } from '../../utils/categories';
import Category from '../Category';

type Props = {
  categorySelected: string;
  setCategory: (categoryId: string) => void
}

export default function CategorySelect ({ categorySelected, setCategory }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingRight: 40}} style={styles.container}>
      {categories.map(category => (
        <Category key={category.id} title={category.title} onPress={() => setCategory(category.id)} icon={category.icon} checked={category.id === categorySelected}/>
      ))}
    </ScrollView>
  )
}
