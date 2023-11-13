import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

import Joystick from "./components/joystick"

export default function App() {
  const [pos, setPos] = useState({x:0,y:0})

  function handleMove(x,y){
    setPos({
      x: x,
      y: y
    })
  }

  return (
    <View style={styles.container}>
      <Text>x:{pos.x}, y:{pos.y}</Text>
      <Joystick style={styles.motorControlJoystick} onMove={handleMove}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  motorControlJoystick: {
    margin: "auto auto 10px 10px"
  }
});
