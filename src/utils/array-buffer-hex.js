
export function arrayBufferToHex(buffer) {
	let result = '';

	for (const value of new Uint8Array(buffer)) {
		if (value < 16) {
			result += '0';
		}

		result += value.toString(16);
	}

	return result;
}

export function hexToArrayBuffer(hex) {
	const uint8_array = new Uint8Array(hex.length / 2);

	for (
		let index_hex = 0, index_array = 0;
		index_hex < hex.length;
		index_hex += 2, index_array++
	) {
		uint8_array[index_array] = Number.parseInt(
			hex.slice(
				index_hex,
				index_hex + 2,
			),
			16,
		);
	}

	return uint8_array.buffer;
}
