import moment from "moment"
import XLSX from "xlsx"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import * as MediaLibrary from "expo-media-library"
import { DEFAULT_DAY_FORMAT } from "../config/consts"

class ExportService {
	constructor() {}

	async requestPermissions() {
		const { status: msPermissionStatus } = await MediaLibrary.requestPermissionsAsync()
		const flPermissions = await FileSystem.StorageAccessFramework.requestPermissionsAsync()
		if (msPermissionStatus !== "granted") {
			console.error("Permission denied.")
		}

		if (!flPermissions.granted) {
			console.error("Permission denied.")
			return
		}
	}

	async checkPermissions() {
		const mlPermissions = await MediaLibrary.getPermissionsAsync()
		const fsPermissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

		if (!fsPermissions.granted || !mlPermissions.granted) {
			await this.requestPermissions()
		}
	}

	async write(name, data) {
		const content = JSON.stringify(data)
		const fileUri = `${FileSystem.cacheDirectory}${name}.json`

		try {
			await FileSystem.writeAsStringAsync(fileUri, content)
			const info = await FileSystem.getInfoAsync(fileUri)
			return info.exists ? fileUri : false
		} catch (error) {
			throw Error("Writing file error:", error.message, error.code)
		}
	}

	async writeXls(name, data) {
		const fileUri = `${FileSystem.cacheDirectory}${name}.xlsx`
		try {
			const worksheet = XLSX.utils.aoa_to_sheet(data)
			const workbook = XLSX.utils.book_new()
			XLSX.utils.book_append_sheet(workbook, worksheet, "Reports")
			const wbout = await XLSX.write(workbook, { type: "base64", bookType: "xlsx" })
			await FileSystem.writeAsStringAsync(fileUri, wbout, {
				encoding: FileSystem.EncodingType.Base64,
			})
			const info = await FileSystem.getInfoAsync(fileUri)
			return info.exists ? fileUri : false
		} catch (error) {
			throw Error("Writing file error:", error.message, error.code)
		}
	}

	async share(file) {
		if (Sharing.isAvailableAsync()) {
			Sharing.shareAsync(file, {
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
		console.log(data)
		const fileName = `${moment().format(DEFAULT_DAY_FORMAT)}`
		try {
			// await this.checkPermissions()

			// const writedFileUri = await this.write(fileName, data)
			const writedFileUri = await this.writeXls(fileName, data)
			if (writedFileUri) {
				await this.share(writedFileUri)
				console.log("Successfull export file")
			} else {
				console.log("No file uri")
			}
		} catch (error) {
			console.log("Error export file:", error)
		}
	}

}

export default new ExportService()
