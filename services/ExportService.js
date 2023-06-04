import moment from "moment"
import XLSX from "xlsx"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import * as MediaLibrary from "expo-media-library"

class ExportService {
	constructor() {}

	async requestPermissions() {
		const { status: msPermissionStatus } = await MediaLibrary.requestPermissionsAsync()
		const flPermissions = await FileSystem.StorageAccessFramework.requestPermissionsAsync()
		if (msPermissionStatus !== "granted") {
			console.error("Permission denied.")
		}

		if (!flPermissions.granted) {
			console.log("not granted")
			return
		}
	}

	async checkPermissions() {
		const { status } = await MediaLibrary.getPermissionsAsync()
		await MediaLibrary.getAlbumsAsync()
		const flPermissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
		if (status !== "granted" || !flPermissions.granted) {
			await this.requestPermissions()
		}
	}

	async generate(data) {
		let wb = XLSX.utils.book_new()

		let ws = XLSX.utils.json_to_sheet([...data.headers])

		XLSX.utils.book_append_sheet(wb, ws, "Users")
		const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" })
	}

	async write(generatedFile) {
		const albumName = "reports"
		const fileName = "text"

		try {
			await this.checkPermissions()
			await MediaLibrary.getAlbumAsync(albumName)
			const fileUri = FileSystem.documentDirectory + fileName + ".json"
			console.log(fileUri)
			await FileSystem.writeAsStringAsync(fileUri, "Hello World", {
				encoding: FileSystem.EncodingType.UTF8,
			})
	

			console.log("File saved successfully")
		} catch (error) {
			console.log("Error details:", error.message, error.code)
			console.log("Error writing file:", error)
		}
	}

	async share(xlsFile) {
		if (Sharing.isAvailableAsync()) {
			Sharing.shareAsync(xlsFile, {
				mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
				dialogTitle: "Your dialog title here", // Android and Web
				UTI: "com.microsoft.excel.xlsx", // iOS
			})
				.catch((error) => {
					console.error("Error", error)
				})
				.then(() => {
					console.log("Return from sharing dialog")
				})
		}
	}

	async export(data) {
		try {
			// const generatedFile = await this.generate(data)
			await this.write()
			console.log("writed")
			// await this.share(generatedFile)
			console.log("Successfull export file")
		} catch (error) {
			console.log("Error export file:", error)
		}
	}
}

export default new ExportService()
