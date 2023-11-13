import React, {ReactNode} from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';

interface AppTextProps {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

const AppText = ({style, children}: AppTextProps) => {
  return (
    <Text style={[{fontFamily: 'NPSfont_regular', color: 'black'}, style]}>
      {children}
    </Text>
  );
};

export default AppText;
