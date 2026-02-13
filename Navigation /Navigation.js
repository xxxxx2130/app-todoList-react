import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screen /HomeScreen';
import TodoListsScreen from '../Screen /TodoListsScreen';
import TodoListDetailsScreen from '../Screen /TodoListDetailsScreen';
import SignUpScreen from '../Screen /SignUpScreen';
import SignInScreen from '../Screen /SignInScreen';
import SignOutScreen from '../Screen /SignOutScreen';
import { TokenContext } from '../Context /Context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TodoListsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true 

      }}
    >
      <Stack.Screen
      options={{
          headerShown: false, 
        }}
        name="TodoLists"
        component={TodoListsScreen}
      />
      <Stack.Screen
      
        options={{
          headerShown: true, 
        }}
        name="TodoListDetails"
        component={TodoListDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const [token] = useContext(TokenContext);

  return (
    <NavigationContainer>
      {token == null ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false 
          }}
        >
          <Tab.Screen name="SignIn" component={SignInScreen} />
          <Tab.Screen name="SignUp" component={SignUpScreen} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false 
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="TodoListsStack" component={TodoListsStack} />
          <Tab.Screen name="SignOut" component={SignOutScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}