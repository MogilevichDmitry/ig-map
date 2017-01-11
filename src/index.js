const mapunitsGeoJSON = require('./mapunits.geojson');
const d3 = require('d3');
const d3Geo = require('d3-geo');

const padding = 40;
const backgroundColor = '#24241d';

const width = document.body.offsetWidth - padding * 2,
	height = document.body.offsetHeight - padding * 2;

document.body.style.backgroundColor = 'black';
document.body.style.padding = `${padding}px`;

mapunitsGeoJSON.features = mapunitsGeoJSON.features.filter(
	f => f.properties.continent !== 'Antarctica'
)

const svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height);

let finalGeoJSON = mapunitsGeoJSON;

finalGeoJSON.features.forEach(f => {
	if (f.geometry.type === 'Polygon') {
		f.geometry.coordinates[0].forEach(point => point[0] -= 11);
		return;
	}

	if (f.geometry.type === 'MultiPolygon') {
		f.geometry.coordinates.forEach(polygons => {
			polygons.forEach(polygon => {
				polygon.forEach(point => point[0] -= 11);
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
	.attr('data-country', d => d.properties.country)
	.attr('d', d3Geo.geoPath(projection));
