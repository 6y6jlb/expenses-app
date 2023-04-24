export const removeFalsyValuesFromObject = (object) => {
	const result = object
	for (const key in object) {
		if (!object[key]) {
			delete result[key]
		}
	}
	return result
}
