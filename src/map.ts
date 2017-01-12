import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';

type Continent = 'Asia' |
	'Africa' |
	'Europe' |
	'South America' |
	'Seven seas (open ocean)' |
	'Oceania' |
	'North America';

const ASIA: Continent = 'Asia';
const AFRICA: Continent = 'Africa';
const EUROPE: Continent = 'Europe';
const SOUTH_AMERICA: Continent = 'South America';
const OPEN_OCEAN: Continent = 'Seven seas (open ocean)';
const OCEANIA: Continent = 'Oceania';
const NORTH_AMERICA: Continent = 'North America';

export const Continents = { ASIA, AFRICA, EUROPE, SOUTH_AMERICA, OPEN_OCEAN, OCEANIA, NORTH_AMERICA };

export type MapOptions = {
	width: number,
	height: number,
	canvas: HTMLElement,
	fillColor: string,
	strokeColor: string,
	geoJSON: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>
};

class IGMap {
	private options: MapOptions;

	constructor(options: MapOptions) {
		this.options = options;
	}

	render() {
		const { width, height } = this.options;

		const svg = d3.select('body').append('svg')
			.attr('width', width)
			.attr('height', height);

		const projection = d3Geo
			.geoMercator()
			.fitSize([width, height], this.options.geoJSON);

		svg.selectAll('path')
			.data(this.options.geoJSON.features)
			.enter()
			.append('path')
			.style('fill', this.options.fillColor)
			.style('stroke', this.options.strokeColor)
			.attr('d', d3Geo.geoPath(projection));
	}
}

export function igMap(options: MapOptions): IGMap {
	return new IGMap(options);
}
