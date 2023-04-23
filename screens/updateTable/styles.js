import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
	picker: { height: 30, width: 150 },
	centeredView: {
		flex: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	form: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		gap: 20,
	},
	buttonsWrapper: {
		flexDirection: "column",
		justifyContent: "space-between"
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	input: {
		borderBottomWidth: 1,
	},
	dropDownTitle: {
		fontSize: 20,
		fontFamily: "roboto-regular",
		backgroundColor: '#C0DBEA'
	},
	checkboxContainer: {
		
		flexDirection: 'row',
		marginTop: 10,
	  },
	  checkbox: {
		alignSelf: 'center',
	  },
	  checkboxLabel: {
		marginLeft: 8,
	  },
	  categoryContainer: {
		overflow: "scroll",
		maxHeight: "50%"
	  },
	  fullWindth: {
		width: "100%",
	  }
})