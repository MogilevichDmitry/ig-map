import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';

declare var require: any;
const worldGeoJSON = require('./data/mapunits.min.geojson');

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
	geoJSON?: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>,
	continents?: Array<Continent>,
	excludeCountries?: Array<String>,
	pins?: Array<Point>,
	pinConfig: {
		color?: string,
		radius?: number,
		opacity?: number,
	}
};

export type Point = [number, number];

export class IGMap {
	private options: MapOptions;
	public projection: d3Geo.GeoProjection;
	private pins: Array<Point>;
	private canvas: any;
	private refinedGeoJSON: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
	private pinsRenderRaf: number;

	constructor(options: MapOptions) {
		this.options = options;
		this.pins = this.options.pins.map((p: Point) => { p[0] -= 11; return p; }) || [];

		this.refinedGeoJSON = Object.assign({}, this.options.geoJSON || worldGeoJSON);

		if (this.options.continents) {
			this.refinedGeoJSON.features = this.refinedGeoJSON.features.filter(f => {
				return this.options.continents.indexOf(f.properties.continent) !== -1;
			});
		}

		if (this.options.excludeCountries) {
			this.refinedGeoJSON.features = this.refinedGeoJSON.features.filter(f => {
				return this.options.excludeCountries.indexOf(f.properties.name) === -1;
			});
		}
	}

	render() {
		const { width, height } = this.options;

		this.canvas = d3.select(this.options.canvas).append('svg');

		this.canvas
			.attr('width', width)
			.attr('height', height);

		const projection = d3Geo
			.geoEquirectangular()
			.fitSize([width, height], this.refinedGeoJSON);

		this.projection = projection;
		this.renderMap();
		this.renderPins();
	}

	addPin(p: Point) {
		this.pins.push(p);
		this.requestPinsRender();
	}

	addPins(p: Array<Point>) {
		this.pins.push(...p);
		this.requestPinsRender();
	}

	private requestPinsRender() {
		if (!this.pinsRenderRaf) {
			this.pinsRenderRaf = requestAnimationFrame(() => {
				this.renderPins();
			});
		}
	}

	private renderMap() {
		this.canvas.selectAll('path')
			.data(this.refinedGeoJSON.features)
			.enter()
			.append('path')
			.style('fill', this.options.fillColor)
			.style('stroke', this.options.strokeColor)
			.attr('d', d3Geo.geoPath(this.projection));
	}

	private renderPins() {
		this.canvas.selectAll('circle')
			.data(this.pins.map(this.projection))
			.enter()
			.append('circle')
			.style('fill', this.options.pinConfig.color)
			.attr('cx', (p: Point) => p[0])
			.attr('cy', (p: Point) => p[1])
			.attr('r', 0)
			.transition()
			.attr('r', this.options.pinConfig.radius)
			.style('opacity', this.options.pinConfig.opacity);

		this.pinsRenderRaf = null;
	}
}
