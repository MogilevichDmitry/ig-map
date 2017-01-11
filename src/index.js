const geoJSON = require('./ne_110m_admin_0_countries.geojson');
const d3 = require('d3');
const d3Geo = require('d3-geo');
const topojson = require('topojson');

const padding = 40;
const backgroundColor = '#4a3832';

const width = document.body.offsetWidth - padding * 2,
	height = document.body.offsetHeight - padding * 2;

document.body.style.backgroundColor = backgroundColor;
document.body.style.padding = `${padding}px`;

const svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height);

const projection = d3Geo
	.geoEquirectangular()
	.fitSize([width, height], geoJSON)

svg.selectAll('path')
	.data(geoJSON.features)
	.enter()
	.append('path')
	.style('fill', backgroundColor)
	.style('stroke', 'white')
	.attr('data-country', d => d.properties.country)
	.attr('d', d3Geo.geoPath(projection));
