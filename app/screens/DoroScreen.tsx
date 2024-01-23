import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, StyleSheet, Modal, ActivityIndicator, SafeAreaView, TextInput, Pressable } from "react-native"
import {
  Text,
  Button,
  TextField
} from "app/components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAccount } from 'wagmi'
import { baseUrl } from '../app'
import axios from 'axios'
import WebView from "react-native-webview";
import { useWebViewMessage } from "react-native-react-bridge";
// @ts-ignore
import webApp from "../bridge"

const appLogo = require("../../assets/images/Doro.png")

interface DoroScreenProps extends AppStackScreenProps<"Doro"> { }

export const DoroScreen: FC<DoroScreenProps> = observer(function DoroScreenProps(
  _props
) {
  const { navigation } = _props
  const [isLoading, setIsLoading] = useState(false)
  const [isExistsWallet, setExists] = useState(false)
  const [gameId, onChangeText] = useState<string | undefined>();
  const [isDemoFinishedVisible, setDemoFinishedVisible] = useState<boolean>(false);

  const [minaAddress, setMinaAddress] = useState<string>();

  function goMain() {
    navigation.navigate("Main", { gameId })
  }
  const [data, setData] = useState("This is React Native");
  const { ref, onMessage, emit } = useWebViewMessage((message) => {
    // emit sends message to React
    //   type: event name
    //   data: some data which will be serialized by JSON.stringify
    if (message.type === "hello" && message.data === 123) {
      emit({ type: "success", data: "succeeded!" });
    }
  });
  function joinGame() {
    console.log(webApp)
    if (gameId) {
      getMinaWallet().then(() => {
        goMain()
      })
    }
  }

  const getMinaWallet = async () => {
    return "mina"
  }

  const demo = async () => {
    setIsLoading(true)
    axios.get(`${baseUrl}/test`, {
      timeout: 600000,
    })
      .then(function (response) {
        console.log(response.data)
        setIsLoading(false)
        setDemoFinishedVisible(true)
      })
      .catch(function (error) {
        setIsLoading(false)
        setDemoFinishedVisible(true)
        console.log(error);
      });
  }
  
  return (
    <View style={$container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDemoFinishedVisible}
        onRequestClose={() => {
          setDemoFinishedVisible(!isDemoFinishedVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText} tx="common.finished" />
            <Button
              testID="doro-ok-button"
              tx="common.ok"
              style={$buttonAdjust}
              preset="default"
              onPress={() => setDemoFinishedVisible(!isDemoFinishedVisible)}
            />
          </View>
        </View>
      </Modal>

      <View style={$topContainer}>
        <Image style={$doroLogo} source={appLogo} resizeMode="contain" />
        <Text
          testID="doro-app-name"
          style={$doroHeading}
          tx="doroScreen.doroText"
          preset="heading"
        />
        {isLoading
          ? <ActivityIndicator />
          : <>
            <View style={styles.joinContainer}>
              <Button
                style={$button}
                onPress={() => joinGame()}
              >
                Create Account
              </Button>
              <Button style={$button}>Import Account</Button>
            </View>
          <View style={styles.joinContainer}>
            <WebView style={{ flex: 1 }}
              ref={ref}
              source={{ html: webApp }}
              onMessage={onMessage}
              onError={console.log}
            />
          <Text>webApp</Text>
          </View>
          <Text>React Native: {data}</Text>
           <View style={styles.joinContainer}>
            <Button
              onPress={() => emit({ type: "hello", data: data })}
              style={$button}
            >
              send to Web
            </Button>
          </View>
            {isExistsWallet
              ? <>
                <TextField
                  keyboardType="number-pad"
                  onChangeText={onChangeText}
                  placeholder="Input Game ID"
                />
                <View style={styles.joinContainer}>
                  <Button
                    testID="doro-join-button"
                    tx="doroScreen.joinGame"
                    style={$button}
                    preset="default"
                    onPress={() => joinGame()}
                  />
                  <Button
                    testID="doro-demo-button"
                    tx="doroScreen.demo"
                    style={$button}
                    preset="default"
                    onPress={() => demo()}
                  />
                </View>
              </>
              : null}
          </>
        }
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral900,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
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

const $doroLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $doroHeading: TextStyle = {
  textAlign: "center",
  marginBottom: spacing.xxl,
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
  joinContainer: {
    alignItems: 'center',
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
  wrappW3Button: {
    marginBottom: spacing.lg,
  },
});
