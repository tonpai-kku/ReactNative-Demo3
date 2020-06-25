import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './views/HomeScreen';
import NewsScreen from './views/NewsScreen';
import AddNewsScreen from './views/AddNewsScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab({navigation}){
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'gray',
        inactiveTintColor: 'lightgray',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'หน้าหลัก',
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name={'ios-book'} size={24} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="AddNews"
        component={AddNewsScreen}
        options={{
          title: 'เพิ่มข่าว',
          tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name={'ios-add-circle-outline'} size={24} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'lightgray',
          }
        }}
      >
        <Stack.Screen 
          name="MainTab"
          component={MainTab}
          options={{
            title: 'Public Journalist',
          }}
        />
        <Stack.Screen name="News" component={NewsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
