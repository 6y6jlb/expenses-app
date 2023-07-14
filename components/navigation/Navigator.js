import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { ROUTES } from "./service"
import { createDrawerNavigator } from "@react-navigation/drawer"


const Drawer = createDrawerNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator>
				{ROUTES.map((route, index) => {
					return (
						<Drawer.Screen key={index} name={route.path} component={route.screen} options={route.options} />
					)
				})}
			</Drawer.Navigator>
		</NavigationContainer>
	)
}
