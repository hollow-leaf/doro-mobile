import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, ActivityIndicator, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Button, Screen, Text } from "../components"
import { useAccount } from 'wagmi'
import { colors, spacing } from "../theme"
import { W3mButton } from "@web3modal/wagmi-react-native"
import { AppStackScreenProps } from "../navigators"
import { baseUrl } from '../app'
import { RouteProp, useRoute } from "@react-navigation/native"
import { DoroParamList } from "../navigators/DoroNavigator"
import axios from 'axios'

interface MainScreenProps extends AppStackScreenProps<"Main"> {}

export const MainScreen: FC<MainScreenProps> = observer(function MainScreen(_props) {
  const { address, isConnected } = useAccount()
  const { navigation } = _props

  const route = useRoute<RouteProp<DoroParamList, "Main">>()
  const params = route.params

  const [isLoading, setIsLoading] = useState(false)
  const [gameState, setGameState] = useState<any>()
  const [userState, setUserState] = useState()
  const [isRevealVisible, setRevealVisible] = useState(false)
  
  const getGameState = async (gameId : string) => {
    setIsLoading(true);
    try {
      fetch(`${baseUrl}/get_game/${gameId}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setGameState(myJson)
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getUserState = async (gameId : string, address : string) => {
    try {
      setIsLoading(true);
      axios.post(`${baseUrl}/get_game_user/${gameId}`, {
        user_address: address
      })
      .then(function (response) {
        console.log(response.data)
        setUserState(response.data)
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const goDoro = () => {
    navigation.navigate("Doro")
  }

  const goDraw = () => {
    navigation.navigate("Draw", { gameId: params.gameId })
  }

  const reveal = async() => {
    setIsLoading(true);
    console.log("OK Open")
    axios.post(`${baseUrl}/reveal/${params.gameId}`, {
      user_address: address
    })
    .then(function (response) {
      console.log(response.data)
      setUserState(response.data)
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
    });
    setRevealVisible(!isRevealVisible);
  }

  useEffect( () => {
    const fetchData = async () => {
      await getGameState(params.gameId as string)
      if (address) await getUserState(params.gameId as string, address)
    };
    fetchData()
  }, [params.gameId])

  useEffect(() => {
    console.log(gameState)
  }, [gameState])

  useEffect(() => {
    if (!isConnected) {
      // Perform the navigation to go back if not connected
      console.log("Not connected, navigating back to Welcome screen");
      goDoro()
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
        <Text style={$title} tx={"common.appName"}/>
        {
          gameState
        ?<>
          <Text style={$textContent}>GAME ID : {gameState.game_id}</Text>
          <Text style={$textContent}>JOINED {gameState.draw_count} / {gameState.max}</Text>
        </>
        :<Text style={$textContent}>JOINED 0 / 0</Text>
        }
        <View style={styles.wrappW3Button}>
          <W3mButton/>
        </View>
      <Button
        testID="main-draw-button"
        tx="mainScreen.draw"
        style={$button}
        preset="default"
        onPress={() => goDraw()}
      />
      <Button
        testID="main-reveal-button"
        tx="mainScreen.reveal"
        style={$button}
        preset="default"
        onPress={() => {
          setRevealVisible(true)
          console.log('Open Prize')
        }}
      />
      <Button
        testID="main-leave-button"
        tx="mainScreen.leave"
        style={$button}
        preset="default"
        onPress={() => {
          goDoro() 
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
  width: '60%', // Adjust the width as needed
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
  wrappW3Button: {
    marginBottom: spacing.lg,
  },
});