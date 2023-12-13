
export async function asyncTimeout(delay) {
	return new Promise((resolve) => {
		setTimeout(
			resolve,
			delay,
		);
	});
}
