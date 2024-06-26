export const CalculatorSizeFile = (sizeFile: number) => {
	let size = sizeFile
	const suffixes = ['bytes', 'KB', 'MB', 'GB', 'TB']
	let suffixIndex = 0

	while (size >= 1024 && suffixIndex < suffixes.length - 1) {
		suffixIndex += 1
		size /= 1024
	}
	// Làm tròn số đến 2 chữ số thập phân
	const formattedSize = `${size.toFixed(2)} ${suffixes[suffixIndex]}`

	return formattedSize
}
