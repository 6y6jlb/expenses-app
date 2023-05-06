import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Cell, Col, Row, Table, TableWrapper } from "react-native-table-component"
import NoData from "../noData/NoData"

export default ({ data }) => {
	if (data.tableHead.length < 2) {
		return <NoData />
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<Table style={{ flexDirection: "row" }} borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
					<TableWrapper style={{ width: 90 }}>
						<Cell data={[""]} style={[styles.singleHead]} />
						<Col data={data.tableTitle} textStyle={[styles.text]} />
					</TableWrapper>
					<TableWrapper style={{ flex: 1 }}>
						<Row data={data.tableHead} style={styles.head} textStyle={styles.text} />
						{data.tableData.map((rowData, index) => (
							<TableWrapper key={index} style={styles.row}>
								{rowData.map((cellData, cellIndex) => (
									<Cell key={cellIndex} data={cellData} textStyle={[styles.text]} />
								))}
							</TableWrapper>
						))}
					</TableWrapper>
				</Table>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
	head: { height: 40, backgroundColor: "#f1f8ff" },
	singleHead: { width: 90, height: 40, backgroundColor: "#c8e1ff" },
	text: { margin: 6 },
	row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
})
