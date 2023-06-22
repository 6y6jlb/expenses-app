import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ROUTES } from "./service"

const Stack = createStackNavigator()

export default function () {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{ROUTES.map((route, index) => {
					return (
						<Stack.Screen key={index} name={route.path} component={route.screen} options={route.options} />
					)
				})}
			</Stack.Navigator>
		</NavigationContainer>
	)
}
