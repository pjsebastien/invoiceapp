import AppNavigator from './src/navigation/AppNavigator';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import Colors from './src/theme/colors';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/store/reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

export default function App() {
    let [fontsLoaded] = useFonts({
        'Orkney-regular': require('./assets/fonts/OrkneyRegular.ttf'),
        'Orkney-bold': require('./assets/fonts/OrkneyBold.ttf'),
        'Source-serif-bold': require('./assets/fonts/SourceSerifPro-Bold.ttf'),
        'Source-serif-regular': require('./assets/fonts/SourceSerifPro-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return (
            <ActivityIndicator
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.backgroundSecondary,
                }}
                size="large"
                color={Colors.primary}
            />
        );
    }
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
