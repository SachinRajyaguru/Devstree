import React from 'react';
import {
  PressableProps,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export type Props = {
  label: string;
  isSelected?: boolean;
  onPress?: PressableProps['onPress'];
};

const Chip: React.FC<Props> = ({ label, isSelected, onPress }) => {
  return (
    <Pressable style={styles.chip} onPress={onPress}>
      <Text style={isSelected ? styles.selectedLabel : styles.label}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  selectedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chip;
