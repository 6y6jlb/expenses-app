import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from '../../screens/main/MainScreen'
import Report from '../../screens/report/ReportScreen'
import UpdateTableScreen from "../../screens/updateTable/UpdateTableScreen";
import NewExpenseScreen from "../../screens/newExpense/NewExpense";

const Stack = createStackNavigator()

export default function () {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="main" component={Main} />
				<Stack.Screen name="report" component={Report} />
				<Stack.Screen name="update" component={UpdateTableScreen} />
				<Stack.Screen name="new-expense" component={NewExpenseScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
