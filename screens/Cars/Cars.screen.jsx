import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CarsComponent } from './Cars.component';
import axios from 'axios';
import { urlBack } from '../../environments/environments.url';
import { CarRegister } from './CarRegister.component';
import { colors } from '../../styles/colors.styles';
import { CarUpdate } from './CarUpdate.component';
import i18n from "../../localization/i18n";

const Stack = createNativeStackNavigator();


export const Cars = ({ user }) => {

    const [cars, setCars] = useState([]);

    const [updateCar, setUpdateCar] = useState({});

    const handleGetCars = async () => {
        await axios.get(`${urlBack}/vehiculo`)
            .then(async (res) => {
                let vehiculos = res.data.cont.getVehiculos;
                const carrosFilter = await vehiculos.filter(vehi => vehi.idPersona === user._id)
                await setCars(carrosFilter);
                // console.log(cars)
            }).catch((err) => {
                console.log(err, 'err');
            })
    }

    useEffect(() => {
        handleGetCars();
    }, []);

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='CarsComponent'>
                <Stack.Screen name="CarsComponent" options={{
                    headerTitle: i18n.t("mycar"),
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.primary },
                }} >
                    {() => <CarsComponent setCars={setCars} cars={cars} updateCar={setUpdateCar} getCars={handleGetCars} />}
                </Stack.Screen>

                <Stack.Screen name="RegistroAuto"
                    options={{
                        headerShown: true,
                        headerTitle: 'Car Register',
                        headerStyle: { backgroundColor: colors.primary }
                    }}>
                    {() => <CarRegister user={user} getCars={handleGetCars} />}
                </Stack.Screen>
                <Stack.Screen name="ActualizarAuto" options={{
                    headerShown: true,
                    headerTitle: i18n.t("updatecar"),
                    headerStyle: { backgroundColor: colors.primary }
                }}>
                    {() => <CarUpdate user={user} updateCar={updateCar} setUpdateCar={setUpdateCar} getCars={handleGetCars} />}
                </Stack.Screen>
            </Stack.Navigator>
            <StatusBar style='auto' />
        </NavigationContainer>
    )
}

