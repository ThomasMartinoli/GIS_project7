<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" version="1.0.0" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
  <UserLayer>
    <sld:LayerFeatureConstraints>
      <sld:FeatureTypeConstraint/>
    </sld:LayerFeatureConstraints>
    <sld:UserStyle>
      <sld:Name>intercomparison_S2</sld:Name>
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
              <sld:ColorMapEntry color="#08306b" quantity="-922" label="-922"/>
              <sld:ColorMapEntry color="#0e59a2" quantity="-128.87" label="-128.87"/>
              <sld:ColorMapEntry color="#2b7bba" quantity="664.26" label="664.26"/>
              <sld:ColorMapEntry color="#4e9bcb" quantity="1457.39" label="1457.39"/>
              <sld:ColorMapEntry color="#7bb7da" quantity="2250.52" label="2250.52"/>
              <sld:ColorMapEntry color="#aad0e6" quantity="3043.65" label="3043.65"/>
              <sld:ColorMapEntry color="#cee0f2" quantity="3836.78" label="3836.78"/>
              <sld:ColorMapEntry color="#e4eff9" quantity="4568.9" label="4568.9"/>
              <sld:ColorMapEntry color="#f7fbff" quantity="5179" label="5179"/>
              <sld:ColorMapEntry color="#ff00ff" quantity="65535" label="65535&#xa;" opacity="0"/>
            </sld:ColorMap>
          </sld:RasterSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </UserLayer>
</StyledLayerDescriptor>
