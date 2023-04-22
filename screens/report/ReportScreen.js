import React, { useEffect } from "react"
import { View, Text } from "react-native"
import Report from "../../components/report/Report"
import { global } from "../../styles/styles"
import { useReportStore } from "../../state/reportStore"

export default function ReportScreen({ route }) {
	const reportState = useReportStore()

	useEffect(() => {
		reportState.init(route.params.id)
	}, [])

  if(reportState.loading) {
    return <View><Text>Loading</Text></View>
  }
console.log(reportState.headers)
	return (
		<View>
			<Text style={global.title}>{route.params.name}</Text>
			<Report data={{tableHead: reportState.headers, tableData: reportState.rows }} />
		</View>
	)
}
