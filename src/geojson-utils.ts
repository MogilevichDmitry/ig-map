type Point = [number, number];

type translator = (point: Point) => void;

function createTranslator(delta: Point): translator {
	return function (point: Point) {
		point[0] += delta[0];
		point[1] += delta[1];
	};
}

export function translate(json: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>, delta: Point) {
	const translate = createTranslator(delta);

	json.features.forEach(function (feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
		if (feature.geometry.type === 'Polygon') {
			feature.geometry.coordinates[0].forEach(translate);
			return;
		}

		if (feature.geometry.type === 'MultiPolygon') {
			feature.geometry.coordinates.forEach(function (positions: GeoJSON.Position[][]) {
				positions.forEach(function (position: GeoJSON.Position[]) {
					position.forEach(translate);
				});
			});
			return;
		}

		console.log('Unknown geometry type:', feature.geometry.type);
	});
}
