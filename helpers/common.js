export const removeFalsyValuesFromObject = (object) => {
	const result = object
	for (const key in object) {
		if (!object[key]) {
			delete result[key]
		}
	}
	return result
}

export const getWhereConditionsWithParams = (where, params) => {
	let currentParams = []
	let conditions = Object.keys(where).map((key) => {
		if (Array.isArray(where[key])) {
			currentParams.concat(where[key])
			return `${key} in (${new Array(where[key].length).fill("?").join(",")})`
		} else {
			currentParams.push(where[key])
			return `${key} = ?`
		}
	})
	return { conditions, params: [...params, ...currentParams] }
}
