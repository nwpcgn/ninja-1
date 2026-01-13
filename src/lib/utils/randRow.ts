export const randRow = (arr = []) => {
	const i = Math.floor(Math.random() * arr.length)
	return arr[i]
}
export default randRow
