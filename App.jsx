import React, { useEffect } from 'react';
import { Route } from './src/navigator';
import { RequestUserPermission, NotificationListener, androidNotificationPermission } from './src/utils';
import { StatusBar, View } from 'react-native';
import { Loader, Toaster } from './src/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '@react-native-firebase/app';
import { COLORS, firebaseConfig } from './src/constants'
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/redux/store';


export default function App() {

  useEffect(() => {

    // Check if the app is already initialized to avoid re-initialization
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //Need to test above android version 32. throwing a error of Notification permission null
    const permissionStatus = androidNotificationPermission();
    if (permissionStatus) {
      RequestUserPermission();
      NotificationListener();
    }

  }, []);

  return (


    <GestureHandlerRootView style={{ flex: 1 }}>
       <ReduxProvider store={store}>
      <PaperProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.PRIMARY }} edges={['top', 'left', 'right']}>

          <StatusBar backgroundColor={COLORS.PRIMARY} barStyle={'light-content'} />
          <Route />
          <Toaster />
          <Loader />
        </SafeAreaView>

      </PaperProvider>
      </ReduxProvider>
    </GestureHandlerRootView>

  );
}