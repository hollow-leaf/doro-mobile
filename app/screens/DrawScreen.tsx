import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, ActivityIndicator } from "react-native"
import { Button, Text, TextField, Screen } from "../components"
import { useAccount } from 'wagmi'
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface DrawScreenProps extends AppStackScreenProps<"Draw"> {}

export const DrawScreen: FC<DrawScreenProps> = observer(function DrawScreen(_props) {
  console.log("Draw Screen")
  
  const { address, isConnected } = useAccount()
  const { navigation } = _props

  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [gameState, setGameState] = useState()
  const [userState, setUserState] = useState()
  const [value, onChangeText] = useState('Useless Placeholder');

  const getGameState = async () => {
    try {
      const response = await fetch(
        'https://reactnative.dev/movies.json',
      );
      const json = await response.json();
      return json.gameState;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserState = async (address : string) => {
    try {
      const response = await fetch(
        `https://reactnative.dev/${address}`,
      );
      const json = await response.json();
      return json.userState;
    } catch (error) {
      console.error(error);
    }
  };

  function goBack() {
    navigation.navigate("Main")
  }

  const draw = async() => {
    console.log(`draw ${ value }!!`)
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      {isLoading 
      ? <ActivityIndicator />
      : <>
      <View style={$container}>
      <Text style={$title}>Doro Info</Text>
      </View>
        <TextField
        keyboardType="number-pad"
        onChangeText={onChangeText}
        placeholder="Input Shuffle Number"
        />
      <View style={$container}>

      <Button
        testID="draw-draw-button"
        tx="DrawScreen.draw"
        style={$button}
        preset="default"
        onPress={() => draw()}
      />
      <Button
        testID="draw-cancel-button"
        tx="DrawScreen.cancel"
        style={$button}
        preset="default"
        onPress={() => goBack()}
      />
      </View>

      </>
      }
    </Screen>
  );
});

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  backgroundColor: colors.palette.neutral900,
  flex: 1,
  justifyContent:"center"
}

const $container: ViewStyle = {
  alignItems:"center",
}

const $button: ViewStyle = {
  alignItems: 'center',
  backgroundColor: colors.palette.neutral100,
  borderRadius: 5,
  marginBottom: spacing.lg,
  width: '80%', // Adjust the width as needed
}

const $title: TextStyle = {
  marginBottom: spacing.lg,
  fontSize: spacing.lg,
  fontWeight: 'bold',
}



