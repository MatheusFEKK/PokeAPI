import React from 'react';
import { Image } from 'react-native';
import { StackTypes } from './src/interfaces/StackTypes';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src/screens/Home';
import { MyPokedex } from './src/screens/MyPokedex';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './src/style/style';

const App: React.FC = () => {

  const BottomTabs = createBottomTabNavigator<StackTypes>();

  return(
        <NavigationContainer>
          <BottomTabs.Navigator initialRouteName={'Home'} screenOptions={{headerShown: false, tabBarActiveTintColor: '#fe0000', tabBarStyle:{justifyContent:'center',height:80, paddingTop:15}, tabBarLabelStyle:{paddingTop:10, fontSize:12}}}>
            <BottomTabs.Screen name={"Home"} component={Home} options={{title:"Pokemons",tabBarIcon: ({size, focused, color}) => {
              const iconSize = size * 2;
              return(
                <Image style={{width: iconSize, height: iconSize}} source={{uri:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fpokemons%2F500%2FMewtwo__Myutsu_pokemon_pokeball_games_-512.png&f=1&nofb=1&ipt=4e10816436defe924d2d56718de65a538d587f727b3e7d68d81174d38698e78d'}} />
              )
              ;
            }}} />
            <BottomTabs.Screen name={"MyPokedex"}  component={MyPokedex} options={{title:"Minha Pokedex" ,tabBarIcon: ({size, focused, color}) => {
              const iconSize = size * 2;
              return(
                <Image style={{width:iconSize, height:iconSize}} source={require('./src/images/pokedex-icon.png')} />
              );
            }}}/>
          </BottomTabs.Navigator>
        </NavigationContainer>
  );
}
export default App;
