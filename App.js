import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/Login/Login.screen';
import { Registro } from './screens/Registro/Registro.screen';
import { TabsComponent } from './components/Tabs.component';
import moment from 'moment';
import i18n from './localization/i18n';
moment.locale('es-mx')

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState({});

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" options={{ headerShown: false }} >
          {() => <Login setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} options={{ headerTitle: i18n.t("uregister"), headerTintColor: 'darkorange' }} />
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => <TabsComponent user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}


