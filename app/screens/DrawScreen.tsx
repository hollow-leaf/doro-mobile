import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, ActivityIndicator, Pressable, Modal, StyleSheet } from "react-native"
import { Button, Text, TextField, Screen } from "../components"
import { useAccount } from 'wagmi'
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { baseUrl } from '../app'
import { RouteProp, useRoute } from "@react-navigation/native"
import { DoroParamList } from "../navigators/DoroNavigator"
import axios from 'axios'


interface DrawScreenProps extends AppStackScreenProps<"Draw"> { }

export const DrawScreen: FC<DrawScreenProps> = observer(function DrawScreen(_props) {
  const { address, isConnected } = useAccount()
  const { navigation } = _props

  const [isLoading, setIsLoading] = useState(false)
  const [gameState, setGameState] = useState()
  const [userState, setUserState] = useState()
  const [value, onChangeText] = useState<string | undefined>();
  const [isInvalidVisible, setInvalidVisible] = useState(false)
  const [isSuccessVisible, setSuccessVisible] = useState(false)
  const [luckyNumber, setLuckyNumber] = useState()

  const route = useRoute<RouteProp<DoroParamList, "Draw">>()
  const params = route.params

  function goMain() {
    navigation.navigate("Main", { gameId: params.gameId })
  }

  const draw = async () => {
    setIsLoading(true)
    if (value) {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 0 && num <= 1000) {
        console.log(`draw ${value}!!`)
        axios.post(`${baseUrl}/draw/${params.gameId}`, {
          user_address: address,
          shuffle_number: value
        })
          .then(function (response) {
            console.log(response.data);
            setLuckyNumber(response.data.draw_count)
            setSuccessVisible(true)
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setInvalidVisible(true)
      }
    } else {
      setInvalidVisible(true)
    }
    setIsLoading(false)

  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={isInvalidVisible}
        onRequestClose={() => {
          setInvalidVisible(!isInvalidVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText} tx="common.invalid" />
            <Button
              testID="draw-invalid-button"
              tx="common.retry"
              style={$buttonAdjust}
              preset="default"
              onPress={() => setInvalidVisible(!isInvalidVisible)}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessVisible}
        onRequestClose={() => {
          setSuccessVisible(!isSuccessVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText} tx="common.success" />
            <Text style={styles.modalContent}>Got the No.{luckyNumber} KUJI</Text>
            <Button
              testID="draw-success-button"
              tx="common.ok"
              style={$buttonAdjust}
              preset="default"
              onPress={() => goMain()}
            />
          </View>
        </View>
      </Modal>
      {isLoading
        ? <ActivityIndicator />
        : <>
          <View style={$container}>
            <Text style={$title}>Doro Info</Text>
          </View>
          <TextField
            keyboardType="number-pad"
            onChangeText={onChangeText}
            placeholder="Input Shuffle Number 0 - 1000"
          />
          <View style={$container}>
            <Button
              testID="draw-draw-button"
              tx="drawScreen.draw"
              style={$button}
              preset="default"
              onPress={() => draw()}
            />
            <Button
              testID="draw-cancel-button"
              tx="drawScreen.cancel"
              style={$button}
              preset="default"
              onPress={() => goMain()}
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
  justifyContent: "center"
}

const $container: ViewStyle = {
  alignItems: "center",
}

const $button: ViewStyle = {
  alignItems: 'center',
  alignContent: 'center',
  borderRadius: 20,
  backgroundColor: colors.palette.neutral100,
  marginBottom: spacing.lg,
  width: '60%',
}

const $buttonAdjust: ViewStyle = {
  alignItems: 'center',
  alignContent: 'center',
  borderRadius: 20,
  backgroundColor: colors.palette.neutral100,
}

const $title: TextStyle = {
  marginBottom: spacing.lg,
  fontSize: spacing.lg,
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
  modalContent: {
    fontSize: spacing.md,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: spacing.lg,
    marginBottom: 10,
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



