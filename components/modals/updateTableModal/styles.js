import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
	picker: { height: 30, width: 150 },
	centeredView: {
		flex: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		flex: 1,
		backgroundColor: "white",
		maxHeight: "70%",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		flexDirection: "column",
		justifyContent: "space-between",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	form: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		gap: 20,
	},
	modalText: {
		marginBottom: 15,
		fontSize: 24,
		textAlign: "center",
		fontFamily: "roboto-regular",
	},
	buttonsWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
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