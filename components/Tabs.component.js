import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { Home } from "../screens/Home/Home.screen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from '../styles/colors.styles';
import { Profile } from '../screens/Profile/Profile.screen';
import { Cars } from '../screens/Cars/Cars.screen';
import i18n from '../localization/i18n';

const Tab = createBottomTabNavigator();

export const TabsComponent = ({ user }) => {
    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "HomeScreen") {
                            iconName = focused
                                ? "grid"
                                : "grid-outline";
                        }
                        if (route.name === "My profile") {
                            iconName = focused
                                ? "person-circle"
                                : "person-circle-outline";
                        }
                        if (route.name === "My cars") {
                            iconName = focused
                                ? "car-sport"
                                : "car-sport-outline";
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "grey",
                })}
            >
                <Tab.Screen name="HomeScreen" options={{
                    title: i18n.t("cajones"),
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    tabBarActiveTintColor: colors.primary
                }}  >
                    {() => <Home user={user} />}
                </Tab.Screen>


                <Tab.Screen name="My cars" options={{
                    title: i18n.t("mycar"),
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary
                }}  >
                    {() => <Cars user={user} />}
                </Tab.Screen>

                <Tab.Screen name="My profile" options={{
                    title: i18n.t("perfil"),
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    tabBarActiveTintColor: colors.primary
                }}  >
                    {() => <Profile user={user} />}
                </Tab.Screen>

            </Tab.Navigator>
        </>
    )

}
