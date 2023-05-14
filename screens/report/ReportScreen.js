import React, { memo, useEffect } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import GropedExpenses from "../../components/report/GroupedExpenses"
import { global } from "../../styles/styles"
import { useReportStore } from "../../state/reportStore"
import { Picker } from "@react-native-picker/picker"
import { styles } from "./styles"
import { REPORT_GROUPS, REPORT_PERIODS } from "../../config/consts"
import Expenses from "../../components/report/Expenses"
import i18n from "../../i18n/configuration"

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
					<View style={styles.filterItem}>
						<Text style={styles.filterLabel}>{i18n.t("report.filters.group.title")}</Text>
						<Picker
							selectedValue={reportState.filters.group}
							style={[styles.picker]}
							onValueChange={(value) => reportState.setFilter("group", value)}
						>
							{Object.values(REPORT_GROUPS).map((group) => {
								return <Picker.Item key={group} label={i18n.t(`report.filters.group.by_${group}`)} value={group} />
							})}
						</Picker>
					</View>
					<View style={styles.filterItem}>
						<Text style={styles.filterLabel}>{i18n.t("report.filters.period.title")}</Text>
						<Picker
							selectedValue={reportState.filters.period}
							style={[styles.picker]}
							onValueChange={(value) => reportState.setFilter("period", value)}
						>
							{Object.values(REPORT_PERIODS).map((period) => {
								return <Picker.Item key={period} label={i18n.t(`periods.${period}`)} value={period} />
							})}
						</Picker>
					</View>
				</View>
			</View>
			{reportState.loading ? (
				<ActivityIndicator size="large" />
			) : (
				getReportComponent(reportState.filters.group, {
					data: {
						tableHead: reportState.headers,
						tableData: reportState.rows,
						tableTitle: reportState.titles,
					},
					onChange: (id) => navigation.navigate("upsert-expense", { expense: { id } }),
				})
			)}
		</View>
	)
}

export default memo(ReportScreen)
