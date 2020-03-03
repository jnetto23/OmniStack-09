import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";

import SpotList from "../components/SpotList";
import logo from "../assets/logo.png";

export default function List({ navigation }) {
  // const navigation = useNavigation();
  const [techs, setTechs] = React.useState([]);

  React.useEffect(() => {
    async function handleTechs() {
      setTechs(
        (await AsyncStorage.getItem("techs"))
          .split(",")
          .map(tech => tech.trim())
      );
    }
    handleTechs();
  }, []);

  async function logout() {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("techs");
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10
  }
});
