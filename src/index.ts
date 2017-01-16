import * as d3 from 'd3';
import { IGMap, Continents } from './map';
import { translate } from './geojson-utils';

const padding = 40;
const backgroundColor = '#171430';
const fillColor = '#435064';
const strokeColor = 'white';

const width = document.body.offsetWidth - padding * 2,
	height = document.body.offsetHeight - padding * 2;

document.body.style.backgroundColor = backgroundColor;
document.body.style.padding = `${padding}px`;

const map: IGMap = new IGMap({
	width,
	height,
	canvas: document.body,
	fillColor: fillColor,
	strokeColor: strokeColor,
	continents: [Continents.EUROPE],
	excludeCountries: ['Russia', 'Svalbard Is.', 'Iceland'],
	pinConfig: {
		color: '#9392dc',
		radius: 5,
		opacity: 0.7,
	},
	pins: [[10.5, 51.4], [2.5, 47.3]]
});

map.render();

d3.select('svg').on('click', () => {
	const x = d3.event.offsetX;
	const y = d3.event.offsetY;

	map.addPin(map.projection.invert([x, y]));
	(window as any).map = map;
});
