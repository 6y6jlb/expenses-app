import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { ROUTES } from "./service"

const Stack = createStackNavigator()

export default function App() {

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{ROUTES.AUTH.map((route, index) => (
					<Stack.Screen
						key={index}
						name={route.path}
						component={route.screen}
						options={route.options}
					/>
				))}
			</Stack.Navigator>
		</NavigationContainer>
	)
}
