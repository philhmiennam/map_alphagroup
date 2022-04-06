mapboxgl.accessToken =
	'pk.eyJ1IjoicGhpbGhucTIwMDEiLCJhIjoiY2t6b3gyMnY1NjMwczJ3bXpzNHV1aTFqZCJ9.3Iyto1HJPC3fieRx-aTWlg';

const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/satellite-v9', // style URL
	center: [108.057, 12.602], // starting position [lng, lat],
	maxZoom: 16,
	minZoom: 6,
	zoom: 11 // starting zoom
});

map.on('load', () => {
	map.addLayer({
		id: 'philhnq2001.0vf6utuo', // id Tilesets
		type: 'raster',
		source: {
			type: 'raster', // style
			url: 'mapbox://philhnq2001.0vf6utuo', // url Tilesets
		},
		'source-layer': 'contour'
	});

	// console.log(map.fit)
});
