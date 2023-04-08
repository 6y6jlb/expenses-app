import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from '../../screens/main/MainScreen'
import Report from '../../screens/report/ReportScreen'

const Stack = createStackNavigator()

export default function () {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="main" component={Main} />
				<Stack.Screen name="report" component={Report} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
