import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./pages/Login";
import List from "./pages/List";
import Book from "./pages/Book";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Book" component={Book} />
    </Stack.Navigator>
  );
}
