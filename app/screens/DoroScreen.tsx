import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import {
  Text,
  Button,
  TextField
} from "app/components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { W3mButton } from '@web3modal/wagmi-react-native'
import { useAccount } from 'wagmi'
import { baseUrl } from '../app'
import axios from 'axios'

const appLogo = require("../../assets/images/Doro.png")

interface DoroScreenProps extends AppStackScreenProps<"Doro"> {}

export const DoroScreen: FC<DoroScreenProps> = observer(function DoroScreenProps(
  _props
) {
  const { navigation } = _props
  const {address, isConnected} = useAccount()
  const [gameId, onChangeText] = useState<string | undefined>();
  
  function goMain() {
    navigation.navigate("Main", { gameId })
  }

  function joinGame() {
    if(isConnected && gameId) 
    {
      getMinaWallet().then(() => {
        goMain()
      })
    }
  }

  const getMinaWallet = async () => {
    axios.post(`${baseUrl}/user/${address}`, {})
    .then(function (response) {
      console.log("My Wallet:",response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$doroLogo} source={appLogo} resizeMode="contain" />
        <Text
          testID="doro-app-name"
          style={$doroHeading}
          tx="doroScreen.doroText"
          preset="heading"
        />
        <View style={styles.wrappW3Button}>
          <W3mButton/>
        </View>
        {isConnected 
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
        </View>
        </>
        : null}
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
  joinContainer:{
    alignItems: 'center',
  },
  wrappW3Button: {
    marginBottom: spacing.lg,
  },
});
