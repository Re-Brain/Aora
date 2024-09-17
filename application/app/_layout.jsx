import { Text, View } from 'react-native'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react';

import GlobalProvider from '../context/GlobalProvider'
SplashScreen.preventAutoHideAsync(); //Prevent splash screen from auto hiding before asset loadingr

const RootLayout = () => {

  // Import fonts
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  // Perform the effect when the screen is loading
  useEffect(() => {
    if(error) throw error;

    if(fontsLoaded) SplashScreen.hideAsync(); //Hide Splash Screen Load When all the font is loaded
  }, [fontsLoaded, error]) //Recall this function when there is an error or when the font is changed

  if(!fontsLoaded && !error) return null; // if font is not loaded


  return (
    <GlobalProvider>
      <Stack>
      <Stack.Screen name='index' options={{ headerShown : false}}/>
      <Stack.Screen name='(auth)' options={{ headerShown : false}}/>
      <Stack.Screen name='(tabs)' options={{ headerShown : false}}/>
      <Stack.Screen name='search/[query]' options={{ headerShown : false}}/>
      </Stack>
    </GlobalProvider>
    
  )
}

export default RootLayout
