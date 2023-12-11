import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Text,
} from "app/components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

import { W3mButton } from '@web3modal/wagmi-react-native'
import { useAccount } from 'wagmi'

const appLogo = require("../../assets/images/Doro.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props
) {
  const { navigation } = _props
  const [gameId, setGameId] = useState('test')
  console.log("Welcome Screen")

  function goMain() {
    navigation.navigate("Main")
  }
  const {address, isConnected} = useAccount()

  console.log(address)
  console.log(isConnected)

  useEffect(() => {
    console.log("Go Main");
    if(isConnected && gameId) goMain()
}, [isConnected, gameId]);

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={appLogo} resizeMode="contain" />
        <Text
          testID="welcome-app-name"
          style={$welcomeHeading}
          tx="welcomeScreen.welcomeText"
          preset="heading"
        />
        <W3mButton />
        {isConnected 
        ? <Text>Scan QR Code</Text> 
        : null}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeHeading: TextStyle = {
  textAlign: "center",
  marginBottom: spacing.xxl,
}
