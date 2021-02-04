 /*Basemaps*/
var BingBaseMap = new ol.layer.Tile({
	title: 'Bing Map',
	type: 'base',
	visible: true,
	source: new ol.source.BingMaps({
        key:'Ar4e8YGyC3IOzjLgl2bvpIZGA3yIozo4rekktbZBZQklYbRBaGGobPr50fg9z-af',
        imagerySet:'Aerial'
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

var Intercomp = new ol.layer.Image({
	title:'Intercomparison',
	visible: true,
	source:new ol.source.ImageWMS({
		url:'http://localhost:8082/geoserver/GIS_project7/wms',
		params: {'LAYERS':'	GIS_project7:intercomparison_S2'},
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
		params: {'LAYERS':'	GIS_project7:Reclassified_GHS-Pop_S3'},
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
		params: {'LAYERS':'	GIS_project7:Reclassified_WorldPop_S3'},
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
		params: {'LAYERS':'	GIS_project7:Difference_S3'},
		ratio: 1,
		serverType: 'geoserver',
	}),
	opacity: 0.7,
});


/*Create the map*/
var map = new  ol.Map({
	target: document.getElementById('map'),
	layers: [	
	new ol.layer.Group({
		title: 'Validation',
		layers: [ReclassifiedGHSPop, ReclassifiedWorldPop,Difference]
	}),
	new ol.layer.Group({
		title: 'Intercomparison',
		layers: [GHSPOPS1, WorldPopS1,Intercomp]
	}),
	new ol.layer.Group({
		title: 'Base Maps',
		layers: [BingBaseMap]
	}),
    ],
    
	view: new ol.View({
		center: [13000000,15000000],
		zoom: 2.5
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