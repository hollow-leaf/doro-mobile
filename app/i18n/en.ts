const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    invalid: "Invalid Input",
    retry: "Retry",
    yes: "Yes",
    no: "No",
    appName: "Doro",
    finished:"Finished"
  },
  doroScreen: {
    doroText: "Welcome Doro",
    connectWallet: "Connect your wallet",
    joinGame: "Join",
    demo: "Demo"
  },
  mainScreen: {
    draw: "Draw",
    reveal: "Reveal",
    leave: "Leave"
  },
  drawScreen: {
    draw: "Doro !!",
    cancel: "Cancel",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
