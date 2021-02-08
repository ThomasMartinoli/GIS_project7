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

var homepage_map = new ol.layer.Image({
	title:'homepage_map',
	visible: true,
	source:new ol.source.ImageWMS({
		url:'http://localhost:8082/geoserver/GIS_project7/wms',
		params: {'LAYERS':'GIS_project7:HomePage_map'},
		ratio: 1,
		serverType: 'geoserver',
	}),
	opacity: 0.7,
});



var vectorSource2 = new ol.source.Vector({
loader: function(extent, resolution, projection) {
var url2 = 'http://localhost:8082/geoserver/GIS_project7/ows?service=WFS&' +
'version=2.0.0&request=GetFeature&typeName=GIS_project7:sampling_classified&' +
'outputFormat=text/javascript&srsname=EPSG:3857&' +
'format_options=callback:loadFeatures';
$.ajax({url: url2, dataType: 'jsonp'});
}
});

var geojsonFormat2 = new ol.format.GeoJSON();
function loadFeatures(response) {
vectorSource2.addFeatures(geojsonFormat2.readFeatures(response));
}
var Sampling = new ol.layer.Vector({
title: 'Sampling',
source: vectorSource2,
style: new ol.style.Style({
		image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({color: [0,0,255,0.5]}),
        stroke: new ol.style.Stroke({
          color: [0,0,255], width: 1
        })
      })
})
});




// Validation Map
var map_vali = new  ol.Map({
	target: document.getElementById('map_vali'),
	layers: [	
	new ol.layer.Group({
		title: 'Base Maps',
		layers: [BingBaseMap,osm,stamenWatercolor]
	}),

	new ol.layer.Group({
		title: 'Layer',
		layers: [homepage_map]
		
	}),
	new ol.layer.Group({
		title: 'Validation',
		layers: [Sampling]
		
	}),
    ],

	view: new ol.View({
		center: [12500000,12700000],
		zoom: 3
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
map_vali.addControl(layerSwitcher);



/*Popup*/
var elementPopup = document.getElementById('popup');
var popup = new ol.Overlay({
element: elementPopup
});


map_vali.addOverlay(popup);



map_vali.on('click', function(event) {
var feature = map_vali.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
return feature;
});
if (feature != null) {
var pixel = event.pixel;
var coord = map_vali.getCoordinateFromPixel(pixel);
popup.setPosition(coord);

$(elementPopup).attr('title', 'Classification');
$(elementPopup).attr('data-content', '<b>Id: </b>' + feature.get("ID") +
'</br><b>Classified: </b>' + feature.get("Classified") +
'</br><b>GHS class: </b>' + feature.get("Thematic_Class_GHSPOP")+
'</br><b>WorldPop class: </b>' + feature.get("Thematic_class_WorldPop"));
$(elementPopup).popover({'placement': 'top', 'html': true});
$(elementPopup).popover('show');
}
});



map_vali.on('pointermove', function(event) {
if (event.dragging) {
$(elementPopup).popover('dispose');
return;
}
var pixel = map_vali.getEventPixel(event.originalEvent);
var hit = map_vali.hasFeatureAtPixel(pixel);
map_vali.getTarget().style.cursor = hit ? 'pointer' : '';
});
