import React, { useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';

export default function SmartScrollVIew({ children }) {
  const [screenHeight, setScreenHeight] = useState(0);
  const { height } = Dimensions.get('window');

  const scrollEnabled = screenHeight > height;
  const onContentSizeChange = (contentWidth, contentHeight) => {
    console.log('🚀 ~ file: index.js ~ line 12 ~ onContentSizeChange ~ e', contentHeight);
    setScreenHeight(contentHeight);
  };
  return (
    <ScrollView scrollEnabled={scrollEnabled} onContentSizeChange={onContentSizeChange}>
      {children}
    </ScrollView>
  );
}
