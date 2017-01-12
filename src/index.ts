import * as d3 from 'd3';
import { igMap } from './map';
import { translate } from './geojson-utils';

const padding = 40;
const backgroundColor = '#00bcd4';
const fillColor = '#795548';
const strokeColor = 'white';

const width = document.body.offsetWidth - padding * 2,
	height = document.body.offsetHeight - padding * 2;

document.body.style.backgroundColor = '#00bcd4';
document.body.style.padding = `${padding}px`;

d3.json('/data/mapunits.geojson', function (json: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>) {
	translate(json, [-11, 0]);

	igMap({
		width,
		height,
		canvas: document.body,
		fillColor: fillColor,
		strokeColor: strokeColor,
		geoJSON: json,
	})
	.render();

	(window as any).json = json;
});
