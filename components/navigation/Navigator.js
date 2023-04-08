import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../main/Main";
import ReportContainer from "../report/ReportContainer";

const Stack = createStackNavigator()

export default function () {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="main" component={Main} />
				<Stack.Screen name="report" component={ReportContainer} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
