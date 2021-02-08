This folder contains the web code
Basic info:
1.BaseMap: Bing Map (Aerial)
                   OpenStreetMap
                   Stamen watercolor
                   Stamen toner
2.OpenLayers Version: v6.5.0
3.Geoserver Version:v2.15.1

You should add following files in GeoServer
1.Workspace
    Name:  GIS_project7
    Namespace URI:  http://localhost:8082/geoserver/GIS_project7
    
2.Layers
    Name: 'processed_GHS-POP_S1'
                'processed_WorldPop_S1'
                'HomePage_map'
                'intercomparison_S2'
                'Reclassified_GHS-Pop_S3'
                'Reclassified_WorldPop_S3'
                'Difference_S3'