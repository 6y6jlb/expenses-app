import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { useTableStore } from "../../store/tableStore"
import { RESTRICTIONS, ROUTES } from "./service"

const Drawer = createDrawerNavigator()

export default function App() {
	const store = useTableStore()

	React.useEffect(() => {
		const init = async () => {
			await store.init()
		}
		init()
	}, [])

	return (
		<NavigationContainer>
			<Drawer.Navigator>
				{ROUTES.AUTH.map((route, index) => {
					if (route.restriction?.includes(RESTRICTIONS.TABLE)) {
						const table = store.tables && store.tables.find(table => table.default);
						return table ? (
							<Drawer.Screen
								key={index}
								name={route.path}
								component={route.screen}
								options={route.options}
								initialParams={{ table }}
							/>
						) : null
					} else {
						return (
							<Drawer.Screen
								key={index}
								name={route.path}
								component={route.screen}
								options={route.options}
							/>
						)
					}
				})}
			</Drawer.Navigator>
		</NavigationContainer>
	)
}
