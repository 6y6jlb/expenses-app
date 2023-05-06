import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Cell, Row, Table, TableWrapper } from "react-native-table-component"

export default ({ data }) => {
	if (data.tableHead.length < 2) {
		return <Text>No Data</Text>
	}

	return (
		<ScrollView horizontal>
			<View style={styles.container}>
				<Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
					<Row data={data.tableHead} style={styles.head} textStyle={styles.text} />
					{data.tableData.map((rowData, index) => (
						<TableWrapper key={index} style={styles.row}>
							{rowData.map((cellData, cellIndex) => (
								<Cell key={cellIndex} data={cellData} textStyle={[styles.text]} />
							))}
						</TableWrapper>
					))}
				</Table>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
	head: { height: 40, backgroundColor: "#f1f8ff" },
	text: { margin: 6 },
	row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
})
