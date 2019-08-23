export const getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFromData = (data) =>
	data[getRandomIntInclusive(0, data.length - 1)];

export const getDataWhereKey = (arr, key, value, rtn = {}) =>
	arr.find((eln) => eln[key] === value) || rtn;

export const getAllDataWhereKey = (arr, key, value) =>
	arr.filter((eln) => eln[key] === value) || [];

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
export const shuffle = (a) => {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
	return a;
};

export const update = (array, item) => {
	const toUpdate = array.find((eln) => {
		return eln._id === item._id;
	});

	if (toUpdate) {
		const index = array.findIndex((el) => {
			return el._id === item._id;
		});
		array[index] = Object.assign({}, toUpdate, item);
	} else {
		array.push(item);
	}

	return array;
};

export const del = (array, toDel) =>
	(array.filter((item) => (item._id !== toDel._id)));

export const toMatrizFormat = (array, columns = 2) =>
	array.reduce((rows, key, index) => (index % columns === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
