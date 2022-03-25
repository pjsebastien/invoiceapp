import AppNavigator from './src/navigation/AppNavigator';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/store/reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
