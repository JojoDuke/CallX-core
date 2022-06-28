import React from 'react';
import KeepAwake from 'react-native-keep-awake';

export const ScreenshareConfigure: React.FC = (props: any) => {
  return (
    <>
      {props.children}
      <KeepAwake />
    </>
  );
};

export default ScreenshareConfigure;
