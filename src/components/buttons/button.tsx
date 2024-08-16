import React from 'react';
import { COLORS, FONTS } from '../../constants';
import { Button as MaterialButton } from 'react-native-paper';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DisplayType = 'bottom' | 'default';
type ModeType = "text" | "outlined" | "contained" | "elevated" | "contained-tonal";

interface ButtonProps {
  name?: string;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
  containerStyle?: object;
  style?: object;
  contentStyle?: object;
  mode?: ModeType;
  display?: DisplayType;
}

export const Button: React.FC<ButtonProps> = ({
  name,
  //backgroundColor = COLORS.SECONDARY,=====================
  backgroundColor = COLORS.SECONDARY,
  //textColor = COLORS.BLACK,================
  textColor = COLORS.WHITE,
  onPress,
  containerStyle,
  style,
  contentStyle,
  mode = 'elevated',
  display = 'default'
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ ...containerStyle, paddingBottom: display === 'bottom' ? insets.bottom : 0 }}>
      <MaterialButton
        style={style}
        textColor={textColor}
        mode={mode}
        onPress={onPress}
        labelStyle={{ fontFamily: FONTS.BOLD, fontSize: 16, top: 1 }}
        contentStyle={[contentStyle, { paddingVertical: 6, backgroundColor }]}
      >
        {name}
      </MaterialButton>
    </View>
  );
};
