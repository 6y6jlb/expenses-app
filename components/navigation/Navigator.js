import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { useTableStore } from "../../store/tableStore"
import { ROUTES } from "./service"

const Drawer = createDrawerNavigator()



export default function App() {

	const table = useTableStore().tables[0]

	return (
		<NavigationContainer>
			<Drawer.Navigator>
				{ROUTES.map((route, index) => {
					return (
						<Drawer.Screen key={index} name={route.path} component={route.screen} options={route.options} initialParams={{table}}/>
					)
				})}
			</Drawer.Navigator>
		</NavigationContainer>
	)
}
