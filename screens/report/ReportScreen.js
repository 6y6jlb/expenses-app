import React, { memo, useEffect } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import GropedExpenses from "../../components/report/GroupedExpenses"
import { global } from "../../styles/styles"
import { useReportStore } from "../../state/reportStore"
import { Picker } from "@react-native-picker/picker"
import { styles } from "./styles"
import { REPORT_GROUPS } from "../../config/consts"
import Expenses from "../../components/report/Expenses"

const ReportScreen = ({ route, navigation }) => {
	const reportState = useReportStore()

	useEffect(() => {
		reportState.init(route.params.id)()
	}, [])

	const getReportComponent = (group, props) => {
		switch (group) {
			case REPORT_GROUPS.DAY:
				return <GropedExpenses {...props} />

			default:
				return <Expenses {...props} />
		}
	}

	return (
		<View style={global.card}>
			<View style={styles.header}>
				<Text style={global.title}>{route.params.title}</Text>
				<View style={styles.filtersContainer}>
					<Picker
						selectedValue={reportState.group}
						style={[styles.picker]}
						onValueChange={(value) => reportState.setGroup(value)}
					>
						{Object.values(REPORT_GROUPS).map((group) => {
							return <Picker.Item key={group} label={`by ${group.toUpperCase()}`} value={group} />
						})}
					</Picker>
				</View>
			</View>
			{reportState.loading ? (
				<ActivityIndicator size="large" />
			) : (
				getReportComponent(reportState.group, {
					data: {
						tableHead: reportState.headers,
						tableData: reportState.rows,
						tableTitle: reportState.titles,
					},
					onChange: (id) => navigation.navigate("upsert-expense", { expense: {id} }),
				})
			)}
		</View>
	)
}

export default memo(ReportScreen)
