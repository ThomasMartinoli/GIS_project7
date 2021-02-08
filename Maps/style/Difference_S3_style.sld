<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" version="1.0.0" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
  <UserLayer>
    <sld:LayerFeatureConstraints>
      <sld:FeatureTypeConstraint/>
    </sld:LayerFeatureConstraints>
    <sld:UserStyle>
      <sld:Name>Difference_S3</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:RasterSymbolizer>
            <sld:ChannelSelection>
              <sld:GrayChannel>
                <sld:SourceChannelName>1</sld:SourceChannelName>
              </sld:GrayChannel>
            </sld:ChannelSelection>
            <sld:ColorMap type="ramp">
              <sld:ColorMapEntry color="#ff00ff" quantity="-32768" label="-32768" opacity="0"/>
              <sld:ColorMapEntry color="#d7191c" quantity="0" label="0"/>
              <sld:ColorMapEntry color="#eb6640" quantity="0.26" label="0.26"/>
              <sld:ColorMapEntry color="#feb165" quantity="0.52" label="0.52"/>
              <sld:ColorMapEntry color="#ffdc96" quantity="0.78" label="0.78"/>
              <sld:ColorMapEntry color="#f9fdbd" quantity="1.04" label="1.04"/>
              <sld:ColorMapEntry color="#cdebaf" quantity="1.3" label="1.3"/>
              <sld:ColorMapEntry color="#9cd3a7" quantity="1.56" label="1.56"/>
              <sld:ColorMapEntry color="#5ea7b1" quantity="1.8" label="1.8"/>
              <sld:ColorMapEntry color="#2b83ba" quantity="2" label="2"/>
            </sld:ColorMap>
          </sld:RasterSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </UserLayer>
</StyledLayerDescriptor>
