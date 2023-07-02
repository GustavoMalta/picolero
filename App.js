import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes/routes';


export default function App() {

  return (
    <>
      <>
        <StatusBar style={"light"} backgroundColor="#4b0075" />
        <Routes />
      </>
      {/* <ExpoStatusBar style="dark" translucent /> */}
      {/* <SafeAreaView style={styles.safeAreaView} >
        <Home />
      </SafeAreaView> */}
    </>
  );
}

/** build a APK file */
// eas build -p android --profile preview

