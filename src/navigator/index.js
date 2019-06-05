import { createStackNavigator, createAppContainer } from 'react-navigation';
import SearchScreen from '../screens/Search';
import CollectionScreen from '../screens/Collection';

const RootStack = createStackNavigator(
  {
    Collection: {
      screen: CollectionScreen
    },
    Search: {
      screen: SearchScreen
    }
  },
  {
    headerMode: 'none'
  }
);

const Navigation = createAppContainer(RootStack);

export default Navigation;
