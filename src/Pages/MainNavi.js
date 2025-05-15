import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Connect Tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Connect Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Pages
import Phone from "./Phone";
import Contacts from "./Contacts";
import LastCalls from "./LastCalls";
import ContactsPhone from "./ContactsPhone";
import Account from "./Account";

const Tab = createBottomTabNavigator();

function MainNavi() {
    return (
       <Tab.Navigator
          screenOptions={({ route }) => ({
             tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Phone') {
                    iconName = focused ? 'call-outline' : 'call-outline';
                } else if (route.name === 'Contacts') {
                    iconName = focused ? 'person-add-outline' : 'person-add-outline';
                }
                else if (route.name === 'ContactsPhone') {
                    iconName = focused ? 'people' : 'people-outline';
                }else if (route.name === 'LastCalls') {
                    iconName = focused ? 'time' : 'time-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
             },
             tabBarStyle: {
                height: 70,
                paddingTop: 10,
                backgroundColor: "#e5e5e5",
             },
             tabBarActiveTintColor: 'blue',
             tabBarInactiveTintColor: 'gray',
          })}
          >

          <Tab.Screen
             name="Phone"
             component={Phone}
             options={{
                 headerShown: false,
             }}
          />
          <Tab.Screen
             name="LastCalls"
             component={LastCalls}
             options={{ title: 'Calls', headerShown: false }}
          />
          <Tab.Screen
             name="ContactsPhone"
             component={ContactsPhone}
             options={{ title: 'Contacts Phone', headerShown: false }}
          />
          <Tab.Screen
             name="Contacts"
             component={Contacts}
             options={{ headerShown: false }}
          />
          {/*<Tab.Screen*/}
          {/*   name="Account"*/}
          {/*   component={Account}*/}
          {/*   options={{*/}
          {/*       headerShown: false,*/}
          {/*       tabBarButton: () => null,*/}
          {/*   }}*/}
          {/*/>*/}
       </Tab.Navigator>
    );
}

const styles = StyleSheet.create({

});

export default MainNavi;
