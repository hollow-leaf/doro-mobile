import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, ActivityIndicator, Modal, Pressable, Alert, StyleSheet, TouchableWithoutFeedback } from "react-native"
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
  const [isRevealVisible, setRevealVisible] = useState(false)
  
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
    console.log("OK Open")
    setRevealVisible(!isRevealVisible);
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={isRevealVisible}
        onRequestClose={() => {
          setRevealVisible(!isRevealVisible);
        }}>
          <TouchableWithoutFeedback onPress={() => setRevealVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sure ?</Text>
            <Button
              testID="main-modal-reveal-button"
              tx="common.yes"
              style={$buttonAdjust}
              preset="default"
              onPress={() => reveal()}
            />
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
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
          setRevealVisible(true)
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
  borderRadius: 20,
  elevation: 2,
  marginBottom: spacing.lg,
  width: '80%', // Adjust the width as needed
}

const $buttonAdjust: ViewStyle = {
  alignItems: 'center',
  backgroundColor: colors.palette.neutral100,
  borderRadius: 20,
  elevation: 2,
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

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: colors.palette.neutral100,
  },
  buttonOpen: {
    backgroundColor: colors.palette.neutral100,
  },
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalText: {
    fontSize:spacing.lg,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.palette.neutral800,
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    shadowColor: colors.palette.neutral900,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  textStyle: {
    color: colors.palette.primary100,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});