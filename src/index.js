const mapunitsGeoJSON = require('./mapunits.geojson');
const d3 = require('d3');
const d3Geo = require('d3-geo');

const padding = 40;
const backgroundColor = '#795548';

const width = document.body.offsetWidth - padding * 2,
	height = document.body.offsetHeight - padding * 2;

document.body.style.backgroundColor = '#00bcd4';
document.body.style.padding = `${padding}px`;

const svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height);

let finalGeoJSON = mapunitsGeoJSON;

finalGeoJSON.features.forEach(function (feature) {
	if (feature.geometry.type === 'Polygon') {
		feature.geometry.coordinates[0].forEach(function (point) { point[0] -= 11 });
		return;
	}

	if (feature.geometry.type === 'MultiPolygon') {
		feature.geometry.coordinates.forEach(function (polygons) {
			polygons.forEach(function (polygon) {
				polygon.forEach(function (point) {point[0] -= 11 });
			});
		});
		return;
	}

	console.log('Unknown geometry type:', f.geometry.type);
});

const projection = d3Geo
	.geoMercator()
	.fitSize([width, height], finalGeoJSON)

svg.selectAll('path')
	.data(finalGeoJSON.features)
	.enter()
	.append('path')
	.style('fill', backgroundColor)
	.style('stroke', 'white')
	.attr('d', d3Geo.geoPath(projection));
