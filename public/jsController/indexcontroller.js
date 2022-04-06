$.getJSON('/rest/uploadfile').then(resp => {
	resp.forEach(item =>
		// value of td - table
		$('#aaaaaaaaaaaa').append(
			'<tr><td>' + item.id + '</td>' +
			'<td>' + item.filename + '</td>' +
			'<td>' + item.province2.name + '</td>' +
			'<td></td>' +
			'<td></td>' +
			'<td><span class="label label-success">@' + item.description + '</span></td>' +
			'<td>' + item.active + '</td>' +
			'<td> <button onclick=getMap(' + item.id + ')> <i class="fa fa-eye" aria-hidden="true"></i> Xem </button> </td></tr>'
		)
	)
});



function getMap(id) {
	console.log(id)

	mapboxgl.accessToken =
		'pk.eyJ1IjoicGhpbGhucTIwMDEiLCJhIjoiY2t6b3gyMnY1NjMwczJ3bXpzNHV1aTFqZCJ9.3Iyto1HJPC3fieRx-aTWlg';

	const map = new mapboxgl.Map({
		container: 'map', // container ID
		style: 'mapbox://styles/mapbox/satellite-v9', // style URL
		center: [108.057, 12.602], // starting position [lng, lat],
		maxZoom: 16,
		minZoom: 5,
		zoom: 11 // starting zoom
	});

	$.getJSON('/rest/uploadfile/' + id + '').then(item => {
		console.log('data', item);
		let url = 'mapbox://' + item.itemmap.namelayer
		let tileset_id = item.itemmap.namelayer
		map.addLayer({
			id: item.itemmap.namelayer, // id Tilesets
			type: 'raster',
			source: {
				type: 'raster', // style
				url: url, // url Tilesets
			},
			'source-layer': 'contour'
		});

		const uri = 'https://api.mapbox.com/tilesets/' + tileset_id;
		fech(uri).then(resp => {
			console.log(resp)
		})

		const bounds = map.getBounds();
		const latLng = bounds.getCenter();

		console.log('bounds', bounds);
		console.log('latLng', latLng);

		{
			"version": 1,
			"layers": {
				"hello_world": {
					"source": "mapbox://tileset-source/username/populated-places-source",
					"minzoom": 0,
					"maxzoom": 5
				}
			}
		}

		/*map.fitBounds([[boundingBox.xMin, boundingBox.yMin], [boundingBox.xMax, boundingBox.yMax]]);*/
		/*map.setCenter([105.769623, 10.000799]);*/

		// var wms = L.tileLayer.wms(url_geoserver, optionTileLayer)
		// wms.addTo(map);
		// var a  = wms.openPopup();

		// var bounds = wms.getBounds();
		// var latLng = bounds.getCenter();*/
	})

}