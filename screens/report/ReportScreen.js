import React, { memo, useEffect } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import Report from "../../components/report/Report"
import { global } from "../../styles/styles"
import { useReportStore } from "../../state/reportStore"

const ReportScreen = ({ route, navigation }) => {
	const reportState = useReportStore()

	useEffect(() => {
		reportState.init(route.params.id)
	}, [])

	return (
		<View style={global.card}>
			<Text style={global.title}>{route.params.title}</Text>
			{reportState.loading ? (
				<ActivityIndicator size="large" />
			) : (
				<Report
					data={{
						tableHead: reportState.headers,
						tableData: reportState.rows,
						tableTitle: reportState.titles,
					}}
				/>
			)}
		</View>
	)
}

export default memo(ReportScreen)
