import React, { useState } from 'react';
import {
  webViewRender,
  useNativeMessage,
  emit,
} from 'react-native-react-bridge/lib/web';
import { PrivateKey } from "o1js"
const Root = () => {
  const [data, setData] = useState('This is Web');

  useNativeMessage(message => {
    if (message.type === 'hello') {
      console.log('hello from React Native')
      setData(message.data);
    }
  });

  function createPrivateKey() {
    console.log("createPrivateKey")
    const privateKey = PrivateKey.random()
    console.log(privateKey)
  }
  return (
    <div>
      <p>{data}</p>
    </div>
  );
};

export default webViewRender(<Root />);