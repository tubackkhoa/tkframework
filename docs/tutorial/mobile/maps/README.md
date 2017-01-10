# react-native-maps [![npm version](https://img.shields.io/npm/v/react-native-maps.svg?style=flat)](https://www.npmjs.com/package/react-native-maps)

React Native Map components for iOS + Android

## Installation

See [Installation Instructions](installation.md).

## Component API

[`<MapView />` Component API](#mapview)

[`<MapView.Marker />` Component API](#marker)

[`<MapView.Callout />` Component API](#callout)

[`<MapView.Polygon />` Component API](#polygon)

[`<MapView.Polyline />` Component API](#polyline)

[`<MapView.Circle />` Component API](#circle)

## General Usage

```js
import MapView from 'react-native-maps';
```
or

```js
var MapView = require('react-native-maps');
```

This MapView component is built so that features on the map (such as Markers, Polygons, etc.) are
specified as children of the MapView itself. This provides an intuitive and react-like API for
declaratively controlling features on the map.

### Rendering a Map with an initial region

## MapView
```jsx
  <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
```

### Using a MapView while controlling the region as state

```jsx
getInitialState() {
  return {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
}

onRegionChange(region) {
  this.setState({ region });
}

render() {
  return (
    <MapView
      region={this.state.region}
      onRegionChange={this.onRegionChange}
    />
  );
}
```

### Rendering a list of markers on a map

```jsx
<MapView
  region={this.state.region}
  onRegionChange={this.onRegionChange}
>
  {this.state.markers.map(marker => (
    <MapView.Marker
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
</MapView>
```

### Rendering a Marker with a custom view

```jsx
<MapView.Marker coordinate={marker.latlng}>
  <MyCustomMarkerView {...marker} />
</MapView.Marker>
```

### Rendering a Marker with a custom image

```jsx
<MapView.Marker
  coordinate={marker.latlng}
  image={require('../assets/pin.png')}
/>
```

### Rendering a custom Marker with a custom Callout

```jsx
<MapView.Marker coordinate={marker.latlng}>
  <MyCustomMarkerView {...marker} />
  <MapView.Callout>
    <MyCustomCalloutView {...marker} />
  </MapView.Callout>
</MapView.Marker>
```

### Draggable Markers

```jsx
<MapView initialRegion={...}>
  <MapView.Marker draggable
    coordinate={this.state.x}
    onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
  />
</MapView>
```

### Using a custom Tile Overlay

```jsx
<MapView 
  region={this.state.region}
  onRegionChange={this.onRegionChange}
>
  <MapView.UrlTile
   /**
   * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
   * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
   */
    urlTemplate={this.state.urlTemplate}
  />
</MapView>
```

For Android: add the following line in your AndroidManifest.xml
```xml
<uses-permission android:name="android.permission.INTERNET" />
```
For IOS: configure [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW33) in your app

### Customizing the map style

Create the json object, or download a generated one from the [google style generator](https://mapstyle.withgoogle.com/).

```jsx
// The generated json object
mapStyle = [ ... ]

render() {
  return (
    <MapView
      region={this.state.region}
      onRegionChange={this.onRegionChange}
      customMapStyle={mapStyle}
    />
  );
}
```

# Mapview
`<MapView />` 

## Props

| Prop | Type | Default | Note |
|---|---|---|---|
| `provider` | `string` |  | The map framework to use. <br/><br/>Either `"google"` for GoogleMaps, otherwise `null` or `undefined` to use the native map framework (`MapKit` in iOS and `GoogleMaps` in android).
| `region` | `Region` |  | The region to be displayed by the map. <br/><br/>The region is defined by the center coordinates and the span of coordinates to display.
| `initialRegion` | `Region` |  | The initial region to be displayed by the map.  Use this prop instead of `region` only if you don't want to control the viewport of the map besides the initial region.<br/><br/> Changing this prop after the component has mounted will not result in a region change.<br/><br/> This is similar to the `initialValue` prop of a text input.
| `liteMode` | `Boolean` | `false` | Enable lite mode. **Note**: Android only.
| `mapType` | `String` | `"standard"` | The map type to be displayed. <br/><br/> - standard: standard road map (default)<br/> - satellite: satellite view<br/> - hybrid: satellite view with roads and points of interest overlayed<br/> - terrain: (Android only) topographic view
| `showsUserLocation` | `Boolean` | `false` | If `true` the app will ask for the user's location. **NOTE**: You need to add `NSLocationWhenInUseUsageDescription` key in Info.plist to enable geolocation, otherwise it is going to *fail silently*!
| `followsUserLocation` | `Boolean` | `false` | If `true` the map will focus on the user's location. This only works if `showsUserLocation` is true and the user has shared their location. **Note**: iOS only.
| `showsMyLocationButton` | `Boolean` | `true` | `Android only` If `false` hide the button to move map to the current user's location.
| `showsPointsOfInterest` | `Boolean` | `true` | If `false` points of interest won't be displayed on the map.
| `showsCompass` | `Boolean` | `true` | If `false` compass won't be displayed on the map.
| `showsScale` | `Boolean` | `true` | A Boolean indicating whether the map shows scale information.
| `showsBuildings` | `Boolean` | `true` | A Boolean indicating whether the map displays extruded building information.
| `showsTraffic` | `Boolean` | `true` | A Boolean value indicating whether the map displays traffic information.
| `showsIndoors` | `Boolean` | `true` | A Boolean indicating whether indoor maps should be enabled.
| `zoomEnabled` | `Boolean` | `true` | If `false` the user won't be able to pinch/zoom the map.
| `rotateEnabled` | `Boolean` | `true` | If `false` the user won't be able to pinch/rotate the map.
| `scrollEnabled` | `Boolean` | `true` | If `false` the user won't be able to change the map region being displayed.
| `pitchEnabled` | `Boolean` | `true` | If `false` the user won't be able to adjust the camera’s pitch angle.
| `toolbarEnabled` | `Boolean` | `true` | `Android only` If `false` will hide 'Navigate' and 'Open in Maps' buttons on marker press
| `cacheEnabled` | `Boolean` | `false` | If `true` map will be cached and displayed as a image instead of being interactable, for performance usage.
| `loadingEnabled` | `Boolean` | `false` | If `true` a loading indicator will show while the map is loading.
| `loadingIndicatorColor` | `Color` | `#606060` | Sets loading indicator color, default to `#606060`.
| `loadingBackgroundColor` | `Color` | `#FFFFFF` | Sets loading background color, default to `#FFFFFF`.
| `moveOnMarkerPress` | `Boolean` | `true` | `Android only` If `false` the map won't move when a marker is pressed.
| `legalLabelInsets` | `EdgeInsets` | | If set, changes the position of the "Legal" label link from the OS default. **Note:** iOS only.


## Events

| Event Name | Returns | Notes
|---|---|---|
| `onRegionChange` | `Region` | Callback that is called continuously when the region changes, such as when a user is dragging the map.
| `onRegionChangeComplete` | `Region` | Callback that is called once when the region changes, such as when the user is done moving the map.
| `onPress` | `{ coordinate: LatLng, position: Point }` | Callback that is called when user taps on the map.
| `onPanDrag` | `{ coordinate: LatLng, position: Point }` | Callback that is called when user presses and drags the map. **NOTE**: for iOS `scrollEnabled` should be set to false to trigger the event
| `onLongPress` | `{ coordinate: LatLng, position: Point }` | Callback that is called when user makes a "long press" somewhere on the map.
| `onMarkerPress` |  | Callback that is called when a marker on the map is tapped by the user.
| `onMarkerSelect` |  | Callback that is called when a marker on the map becomes selected. This will be called when the callout for that marker is about to be shown. **Note**: iOS only.
| `onMarkerDeselect` |  | Callback that is called when a marker on the map becomes deselected. This will be called when the callout for that marker is about to be hidden. **Note**: iOS only.
| `onCalloutPress` |  | Callback that is called when a callout is tapped by the user.
| `onMarkerDragStart` | `{ coordinate: LatLng, position: Point }` | Callback that is called when the user initiates a drag on a marker (if it is draggable)
| `onMarkerDrag` | `{ coordinate: LatLng, position: Point }` | Callback called continuously as a marker is dragged
| `onMarkerDragEnd` | `{ coordinate: LatLng, position: Point }` | Callback that is called when a drag on a marker finishes. This is usually the point you will want to setState on the marker's coordinate again



## Methods

| Method Name | Arguments | Notes
|---|---|---|
| `animateToRegion` | `region: Region`, `duration: Number` |
| `animateToCoordinate` | `region: Coordinate`, `duration: Number` |
| `fitToElements` | `animated: Boolean` |
| `fitToSuppliedMarkers` | `markerIDs: String[]` | If you need to use this in `ComponentDidMount`, make sure you put it in a timeout or it will cause performance problems.
| `fitToCoordinates` | `coordinates: Array<LatLng>, options: { edgePadding: EdgePadding, animated: Boolean }` |



## Types

```
type Region {
  latitude: Number,
  longitude: Number,
  latitudeDelta: Number,
  longitudeDelta: Number,
}
```

```
type LatLng {
  latitude: Number,
  longitude: Number,
}
```

```
type Point {
  x: Number,
  y: Number,
}
```

```
enum MapType : String {
  "standard",
  "satellite",
  "hybrid",
  "terrain" //Android only
}
```

```
type EdgePadding {
  top: Number,
  right: Number,
  bottom: Number,
  left: Number
}
```

```
type EdgeInsets {
  top: Number,
  left: Number,
  bottom: Number,
  right: Number
}
```


# Marker
`<MapView.Marker />`

## Props

| Prop | Type | Default | Note |
|---|---|---|---|
| `title` | `String` |  | The title of the marker. This is only used if the <Marker /> component has no children that are an `<MapView.Callout />`, in which case the default callout behavior will be used, which will show both the `title` and the `description`, if provided.
| `description` | `String` |  | The description of the marker. This is only used if the <Marker /> component has no children that are an `<MapView.Callout />`, in which case the default callout behavior will be used, which will show both the `title` and the `description`, if provided.
| `image` | `ImageSource` |  | A custom image to be used as the marker's icon. Only local image resources are allowed to be used.
| `pinColor` | `Color` |  | If no custom marker view or custom image is provided, the platform default pin will be used, which can be customized by this color. Ignored if a custom marker is being used.
| `coordinate` | `LatLng` |  | The coordinate for the marker.
| `centerOffset` | `Point` |  | The offset (in points) at which to display the view.<br/><br/> By default, the center point of an annotation view is placed at the coordinate point of the associated annotation. You can use this property to reposition the annotation view as needed. This x and y offset values are measured in points. Positive offset values move the annotation view down and to the right, while negative values move it up and to the left.<br/><br/> For Google Maps, see the `anchor` prop.
| `calloutOffset` | `Point` |  | The offset (in points) at which to place the callout bubble.<br/><br/> This property determines the additional distance by which to move the callout bubble. When this property is set to (0, 0), the anchor point of the callout bubble is placed on the top-center point of the marker view’s frame. Specifying positive offset values moves the callout bubble down and to the right, while specifying negative values moves it up and to the left.<br/><br/> For android, see the `calloutAnchor` prop.
| `anchor` | `Point` |  | Sets the anchor point for the marker.<br/><br/> The anchor specifies the point in the icon image that is anchored to the marker's position on the Earth's surface.<br/><br/> The anchor point is specified in the continuous space [0.0, 1.0] x [0.0, 1.0], where (0, 0) is the top-left corner of the image, and (1, 1) is the bottom-right corner. The anchoring point in a W x H image is the nearest discrete grid point in a (W + 1) x (H + 1) grid, obtained by scaling the then rounding. For example, in a 4 x 2 image, the anchor point (0.7, 0.6) resolves to the grid point at (3, 1).<br/><br/> For MapKit on iOS, see the `centerOffset` prop.
| `calloutAnchor` | `Point` |  | Specifies the point in the marker image at which to anchor the callout when it is displayed. This is specified in the same coordinate system as the anchor. See the `anchor` prop for more details.<br/><br/> The default is the top middle of the image.<br/><br/> For ios, see the `calloutOffset` prop.
| `flat` | `Boolean` |  | Sets whether this marker should be flat against the map true or a billboard facing the camera false.
| `identifier` | `String` |  | An identifier used to reference this marker at a later date.
| `rotation` | `Float` |  | A float number indicating marker's rotation angle.
| `draggable` | `<null>` |  | This is a non-value based prop. Adding this allows the marker to be draggable (re-positioned).

## Events

| Event Name | Returns | Notes
|---|---|---|
| `onPress` | `{ coordinate: LatLng, position: Point }` | Callback that is called when the user presses on the marker
| `onSelect` | `{ coordinate: LatLng, position: Point }` | Callback that is called when the user selects the marker, before the callout is shown. **Note**: iOS only.
| `onDeselect` | `{ coordinate: LatLng, position: Point }` | Callback that is called when the marker is deselected, before the callout is hidden. **Note**: iOS only.
| `onCalloutPress` |  | Callback that is called when the user taps the callout view.
| `onDragStart` | `{ coordinate: LatLng, position: Point }` | Callback that is called when the user initiates a drag on this marker (if it is draggable)
| `onDrag` | `{ coordinate: LatLng, position: Point }` | Callback called continuously as the marker is dragged
| `onDragEnd` | `{ coordinate: LatLng, position: Point }` | Callback that is called when a drag on this marker finishes. This is usually the point you will want to setState on the marker's coordinate again


## Methods

| Method Name | Arguments | Notes
|---|---|---|
| `showCallout` |  | Shows the callout for this marker
| `hideCallout` |  | Hides the callout for this marker



## Types

```
type LatLng {
  latitude: Number,
  longitude: Number,
}
```

```
type Point {
  x: Number,
  y: Number,
}
```

# Callout 
`<MapView.Callout />` 

## Props

| Prop | Type | Default | Note |
|---|---|---|---|
| `tooltip` | `Boolean` | `false` | If `false`, a default "tooltip" bubble window will be drawn around this callouts children. If `true`, the child views can fully customize their appearance, including any "bubble" like styles. 


## Events

| Event Name | Returns | Notes
|---|---|---|
| `onPress` |  | Callback that is called when the user presses on the callout

# Polygon
`<MapView.Polygon />` 

## Props

| Prop | Type | Default | Note |
|---|---|---|---|
| `coordinates` | `Array<LatLng>` | (Required) | An array of coordinates to describe the polygon
| `strokeWidth` | `Number` | `1` | The stroke width to use for the path.
| `strokeColor` | `String` | `#000` | The stroke color to use for the path.
| `fillColor` | `String` |  | The fill color to use for the path.
| `lineCap` | `String` | `round` | The line cap style to apply to the open ends of the path.
| `lineJoin` | `Array<LatLng>` |  | The line join style to apply to corners of the path.
| `miterLimit` | `Number` |  | The limiting value that helps avoid spikes at junctions between connected line segments. The miter limit helps you avoid spikes in paths that use the `miter` `lineJoin` style. If the ratio of the miter length—that is, the diagonal length of the miter join—to the line thickness exceeds the miter limit, the joint is converted to a bevel join. The default miter limit is 10, which results in the conversion of miters whose angle at the joint is less than 11 degrees.
| `geodesic` | `Boolean` |  | Boolean to indicate whether to draw each segment of the line as a geodesic as opposed to straight lines on the Mercator projection. A geodesic is the shortest path between two points on the Earth's surface. The geodesic curve is constructed assuming the Earth is a sphere.
| `lineDashPhase` | `Number` | `0` | (iOS only) The offset (in points) at which to start drawing the dash pattern. Use this property to start drawing a dashed line partway through a segment or gap. For example, a phase value of 6 for the patter 5-2-3-2 would cause drawing to begin in the middle of the first gap.
| `lineDashPattern` | `Array<Number>` | `null` | (iOS only) An array of numbers specifying the dash pattern to use for the path. The array contains one or more numbers that indicate the lengths (measured in points) of the  line segments and gaps in the pattern. The values in the array alternate, starting with the first line segment length, followed by the first gap length, followed by the second line segment length, and so on.

## Events

| Event Name | Returns | Notes
|---|---|---|
| `onPress` |  | Callback that is called when the user presses on the polygon

## Types

```
type LatLng {
  latitude: Number,
  longitude: Number,
}
```
# Polyline
`<MapView.Polyline />` 

## Props

| Prop | Type | Default | Note |
|---|---|---|---|
| `coordinates` | `Array<LatLng>` | (Required) | An array of coordinates to describe the polygon
| `strokeWidth` | `Number` | `1` | The stroke width to use for the path.
| `strokeColor` | `String` | `#000` | The stroke color to use for the path.
| `lineCap` | `String` | `round` | The line cap style to apply to the open ends of the path.
| `lineJoin` | `Array<LatLng>` |  | The line join style to apply to corners of the path.
| `miterLimit` | `Number` |  | The limiting value that helps avoid spikes at junctions between connected line segments. The miter limit helps you avoid spikes in paths that use the `miter` `lineJoin` style. If the ratio of the miter length—that is, the diagonal length of the miter join—to the line thickness exceeds the miter limit, the joint is converted to a bevel join. The default miter limit is 10, which results in the conversion of miters whose angle at the joint is less than 11 degrees.
| `geodesic` | `Boolean` |  | Boolean to indicate whether to draw each segment of the line as a geodesic as opposed to straight lines on the Mercator projection. A geodesic is the shortest path between two points on the Earth's surface. The geodesic curve is constructed assuming the Earth is a sphere.
| `lineDashPhase` | `Number` | `0` | (iOS only) The offset (in points) at which to start drawing the dash pattern. Use this property to start drawing a dashed line partway through a segment or gap. For example, a phase value of 6 for the patter 5-2-3-2 would cause drawing to begin in the middle of the first gap.
| `lineDashPattern` | `Array<Number>` | `null` | (iOS only) An array of numbers specifying the dash pattern to use for the path. The array contains one or more numbers that indicate the lengths (measured in points) of the  line segments and gaps in the pattern. The values in the array alternate, starting with the first line segment length, followed by the first gap length, followed by the second line segment length, and so on.

## Events

| Event Name | Returns | Notes
|---|---|---|
| `onPress` |  | Callback that is called when the user presses on the polyline

## Types

```
type LatLng {
  latitude: Number,
  longitude: Number,
}
```

# Circle
`<MapView.Circle />` 

## Props

| Prop | Type | Default | Note |
|---|---|---|---|
| `center` | `LatLng` | (Required) | The coordinate of the center of the circle
| `radius` | `Number` | (Required) | The radius of the circle to be drawn (in meters)
| `strokeWidth` | `Number` | `1` | The stroke width to use for the path.
| `strokeColor` | `String` | `#000` | The stroke color to use for the path.
| `fillColor` | `String` |  | The fill color to use for the path.
| `lineCap` | `String` | `round` | The line cap style to apply to the open ends of the path.
| `lineJoin` | `Array<LatLng>` |  | The line join style to apply to corners of the path.
| `miterLimit` | `Number` |  | The limiting value that helps avoid spikes at junctions between connected line segments. The miter limit helps you avoid spikes in paths that use the `miter` `lineJoin` style. If the ratio of the miter length—that is, the diagonal length of the miter join—to the line thickness exceeds the miter limit, the joint is converted to a bevel join. The default miter limit is 10, which results in the conversion of miters whose angle at the joint is less than 11 degrees.
| `geodesic` | `Boolean` |  | Boolean to indicate whether to draw each segment of the line as a geodesic as opposed to straight lines on the Mercator projection. A geodesic is the shortest path between two points on the Earth's surface. The geodesic curve is constructed assuming the Earth is a sphere.
| `lineDashPhase` | `Number` | `0` | (iOS only) The offset (in points) at which to start drawing the dash pattern. Use this property to start drawing a dashed line partway through a segment or gap. For example, a phase value of 6 for the patter 5-2-3-2 would cause drawing to begin in the middle of the first gap.
| `lineDashPattern` | `Array<Number>` | `null` | (iOS only) An array of numbers specifying the dash pattern to use for the path. The array contains one or more numbers that indicate the lengths (measured in points) of the  line segments and gaps in the pattern. The values in the array alternate, starting with the first line segment length, followed by the first gap length, followed by the second line segment length, and so on.


## Types

```
type LatLng {
  latitude: Number,
  longitude: Number,
}
```