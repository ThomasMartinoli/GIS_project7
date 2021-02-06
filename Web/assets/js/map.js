 /*Basemaps*/
var BingBaseMap = new ol.layer.Tile({
	title: 'Bing Map',
	type: 'base',
	visible: false,
	source: new ol.source.BingMaps({
        key:'Ar4e8YGyC3IOzjLgl2bvpIZGA3yIozo4rekktbZBZQklYbRBaGGobPr50fg9z-af',
        imagerySet:'Aerial'
		})

});


var osm = new ol.layer.Tile({
	title: 'OpenStreetMap',
	type: 'base',
	visible: true,
	source: new ol.source.OSM()
});


var stamenWatercolor = new ol.layer.Tile({
	title: 'Stamen Watercolor',
	type: 'base',
	visible: false,
	source: new ol.source.Stamen({
        layer:'watercolor'
		})

});

var stamenToner = new ol.layer.Tile({
	title: 'Stamen Toner',
	type: 'base',
	visible: false,
	source: new ol.source.Stamen({
        layer:'toner'
		})

});


/*Layers*/
var GHSPOPS1= new ol.layer.Image({
	title:'Processed GHS-POP',
	visible: false,
	source:new ol.source.ImageWMS({
		url:'http://localhost:8082/geoserver/GIS_project7/wms',
		params: {'LAYERS':'GIS_project7:processed_GHS-POP_S1'},
		ratio: 1,
		serverType: 'geoserver',
	}),
	opacity: 0.7,
});

var WorldPopS1 = new ol.layer.Image({
	title:'Processed World-POP',
	visible: false,
	source:new ol.source.ImageWMS({
		url:'http://localhost:8082/geoserver/GIS_project7/wms',
		params: {'LAYERS':'GIS_project7:processed_WorldPop_S1'},
		ratio: 1,
		serverType: 'geoserver',
	}),
	opacity: 0.7,
});



var homepage_map = new ol.layer.Image({
	title:'homepage_map',
	visible: true,
	source:new ol.source.ImageWMS({
		url:'http://localhost:8082/geoserver/GIS_project7/wms',
		params: {'LAYERS':'GIS_project7:homepage'},
		ratio: 1,
		serverType: 'geoserver',
	}),
	opacity: 0.7,
});



var Intercomp = new ol.layer.Image({
	title:'Intercomparison',
	visible: true,
	source:new ol.source.ImageWMS({
		url:'http://localhost:8082/geoserver/GIS_project7/wms',
		params: {'LAYERS':'GIS_project7:intercomparison_S2'},
		ratio: 1,
		serverType: 'geoserver',
	}),
	opacity: 0.7,
});

var ReclassifiedGHSPop = new ol.layer.Image({
	title:'Reclassified GHS-POP',
	visible: false,
	source:new ol.source.ImageWMS({
		url:'http://localhost:8082/geoserver/GIS_project7/wms',
		params: {'LAYERS':'GIS_project7:Reclassified_GHS-Pop_S3'},
		ratio: 1,
		serverType: 'geoserver',
	}),
	opacity: 0.7,
});

var ReclassifiedWorldPop = new ol.layer.Image({
	title:'Reclassified World-POP',
	visible: false,
	source:new ol.source.ImageWMS({
		url:'http://localhost:8082/geoserver/GIS_project7/wms',
		params: {'LAYERS':'GIS_project7:Reclassified_WorldPop_S3'},
		ratio: 1,
		serverType: 'geoserver',
	}),
	opacity: 0.7,
});

var Difference = new ol.layer.Image({
	title:'Difference',
	visible: false,
	source:new ol.source.ImageWMS({
		url:'http://localhost:8082/geoserver/GIS_project7/wms',
		params: {'LAYERS':'GIS_project7:Difference_S3'},
		ratio: 1,
		serverType: 'geoserver',
	}),
	opacity: 0.7,
});



/*WFS layer*/

var vectorSource = new ol.source.Vector({
loader: function(extent, resolution, projection) {
var url = 'http://localhost:8082/geoserver/GIS_project7/ows?service=WFS&' +
'version=2.0.0&request=GetFeature&typeName=	GIS_project7:tiles_S2&' +
'outputFormat=text/javascript&srsname=EPSG:3857&' +
'format_options=callback:loadFeatures';
$.ajax({url: url, dataType: 'jsonp'});
}
});
var geojsonFormat = new ol.format.GeoJSON();
function loadFeatures(response) {
vectorSource.addFeatures(geojsonFormat.readFeatures(response));
}
var tile = new ol.layer.Vector({
title: 'tile',
source: vectorSource,
style: new ol.style.Style({
fill: new ol.style.Fill({
color: [255,0,0,0.5],
})
})
});





/*Create the map homepage*/
var map_home = new  ol.Map({
	target: document.getElementById('map_home'),
	layers: [
	new ol.layer.Group({
		title: 'Base Maps',
		layers: [osm,stamenToner,stamenWatercolor]
	}),
	new ol.layer.Group({
		title: 'Overlay Layer',
		layers: [homepage_map]
	}),
	],
	view: new ol.View({
		center: [1100000,5000000],
		zoom: 1
	}),
	controls: ol.control.defaults().extend([
		new ol.control.ScaleLine(),
		new ol.control.FullScreen(), 
		new ol.control.OverviewMap({
			layers:[
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		]
		}),
		new ol.control.MousePosition({
			coordinateFormat:ol.coordinate.createStringXY(4),
			projection: 'EPSG:4326'
		})
	])
});

var layerSwitcher = new ol.control.LayerSwitcher({});
map_home.addControl(layerSwitcher);







/*Create the map*/
var map = new  ol.Map({
	target: document.getElementById('map'),
	layers: [	
	new ol.layer.Group({
		title: 'Base Maps',
		layers: [BingBaseMap,osm,stamenWatercolor]
	}),

	new ol.layer.Group({
		title: 'Validation',
		layers: [ReclassifiedGHSPop, ReclassifiedWorldPop,Difference]
	}),
	new ol.layer.Group({
		title: 'Intercomparison',
		layers: [GHSPOPS1, WorldPopS1,Intercomp]
	}),

	new ol.layer.Group({
		title: 'Layer',
		layers: [homepage_map,tile]
		
	}),
	
    ],

	view: new ol.View({
		center: [12500000,11900000],
		zoom: 3.2
	}),
	controls: ol.control.defaults().extend([
		new ol.control.ScaleLine(),
		new ol.control.FullScreen(), 
		new ol.control.OverviewMap({
			layers:[
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		]
		}),
		new ol.control.MousePosition({
			coordinateFormat:ol.coordinate.createStringXY(4),
			projection: 'EPSG:4326'
		})
	])
});


var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);




/*Popup*/

var elementPopup = document.getElementById('popup');
var popup = new ol.Overlay({
element: elementPopup
});


map.addOverlay(popup);



map.on('click', function(event) {
var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
return feature;
});
if (feature != null) {
var pixel = event.pixel;
var coord = map.getCoordinateFromPixel(pixel);
popup.setPosition(coord);

$(elementPopup).attr('title', 'Tile', 'data-content', '<b>Id: </b>' + feature.get("tileID") +
'</br><b>Corr: </b>' + feature.get("corr"));
$(elementPopup).popover({'placement': 'top', 'html': true});
$(elementPopup).popover('show');
}
});



map.on('pointermove', function(event) {
if (event.dragging) {
$(elementPopup).popover('dispose');
return;
}
var pixel = map.getEventPixel(event.originalEvent);
var hit = map.hasFeatureAtPixel(pixel);
map.getTarget().style.cursor = hit ? 'pointer' : '';
});
