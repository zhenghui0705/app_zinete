import React from 'react';
import {View} from 'react-native';

const IconWithBadge = ({children, badgeCount, ...props}) => {
  return <View style={{width: 24, height: 24, margin: 5}}>{children}</View>;
};

export default IconWithBadge;
