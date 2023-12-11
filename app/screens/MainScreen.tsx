import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, ActivityIndicator } from "react-native"
import { Button, Screen, Text } from "../components"
import { useAccount } from 'wagmi'
import { colors, spacing } from "../theme"
import { W3mButton } from "@web3modal/wagmi-react-native"
import { AppStackScreenProps } from "../navigators"

interface MainScreenProps extends AppStackScreenProps<"Main"> {}

export const MainScreen: FC<MainScreenProps> = observer(function MainScreen(_props) {
  console.log("Main Screen")
  
  const { address, isConnected } = useAccount()
  const { navigation } = _props

  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [gameState, setGameState] = useState()
  const [userState, setUserState] = useState()
  const [joinDialog, setJoinDialog] = useState(false)
  const [drawDialog, setDrawDialog] = useState(false)

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

  function goWelcome() {
    navigation.navigate("Welcome")
  }

  const draw = async() => {
    navigation.navigate("Draw")
  }

  const reveal = async() => {
    setJoinDialog(false)
  }

  useEffect( () => {
    const fetchData = async () => {
      setGameState(await getGameState());
      if (address) setUserState(await getUserState(address));
    };
    setIsLoading(true)
    console.log(isLoading)
    fetchData()
    setIsLoading(false)
    console.log(isLoading)
  }, [])

  useEffect(() => {
    if (!isConnected) {
      // Perform the navigation to go back if not connected
      console.log("Not connected, navigating back to Welcome screen");
      goWelcome()
    }
  }, [isConnected]);

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
        <Text style={$title}>Doro</Text>
        <Text style={$textContent}>JOINED 3 / 10</Text>
      <W3mButton/>
      <Button
        testID="main-draw-button"
        tx="MainScreen.draw"
        style={$button}
        preset="default"
        onPress={() => draw()}
      />
      <Button
        testID="main-reveal-button"
        tx="MainScreen.reveal"
        style={$button}
        preset="default"
        onPress={() => {
          setDrawDialog(true)
          console.log('Open Prize')
        }}
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

const $textContent: TextStyle = {
  marginBottom: spacing.lg,
  fontSize: spacing.md,
  fontWeight: 'bold',
}