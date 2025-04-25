module.exports = function ({ makeDynamicConfig, dynamicConfigValue }, changeConfig) {
	const object = makeDynamicConfig({
		key: dynamicConfigValue('key'),
		key2: dynamicConfigValue('key2'),
		key3: 10,
		key4: {
			innerKey: 'innerKey',
			innerObj: {
				test: 123,
				key: null,
				someOtherKey: [],
			},
		},
		array: [
			dynamicConfigValue('array1'),
			dynamicConfigValue('array2'),
			dynamicConfigValue('array3'),
			{
				key: dynamicConfigValue('array4')
			}
		]
	});

	const object2 = makeDynamicConfig({
		options: object,
		key: dynamicConfigValue('object2key')
	});

	const objectFirst = JSON.stringify(object);
	const object2First = JSON.stringify(object2);

	changeConfig('second');

	const objectSecond = JSON.stringify(object);
	const object2Second = JSON.stringify(object2);

	return {
		objectFirst: JSON.parse(objectFirst),
		object2First: JSON.parse(object2First),
		objectSecond: JSON.parse(objectSecond),
		object2Second: JSON.parse(object2Second),
	};
}
