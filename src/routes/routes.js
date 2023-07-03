
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Sells from '../pages/Sells/sells';
import Home from '../pages/Home/home';

const Stack = createNativeStackNavigator();

export const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator  >
                <Stack.Screen name="HomePage" component={Home} options={{
                    title: 'Picolero System',
                    headerTintColor: '#fff',
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: '#4b0075',
                    },
                }} />
                <Stack.Screen
                    name="SellsPage"
                    component={Sells}
                    options={{
                        title: 'Vendas Hoje - ' +
                            new Date().getDate().toString().padStart(2, '0') +
                            "/" +
                            new Date().getMonth().toString().padStart(2, '0'),
                        headerTintColor: '#fff',
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: '#4b0075',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};