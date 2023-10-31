import { clearStorage } from "@api";
import { FeedNavigation } from "@navigation";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <FeedNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
