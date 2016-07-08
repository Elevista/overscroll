# Over Scroll
Over-scrolling elastic bounce effect plugin for AngularJS &amp; jQuery.

## Requirement
- AngularJS 1.5.5 or higher (AngularJS version)
- lodash 4.11.1 or higher
- jQuery 2.2.3 or higher

## Usage
#### AngularJS
>
```javascript
angular.module('someApp',['overScroll'])
```
```html
<!-- options can be a variable in $scope or json object string. it's optional -->
<div style="width:300px;height:300px;" over-scroll="options"><div>
```

#### jQuery
>
```html
<div style="width:300px;height:300px;" id="foo"><div>
```
```javascript
//options object is optional
$('#foo').overScroll(options);
```

## Options
- self : If set this true, over-scroll event will appear in DOM element itself. otherwise child elements. (default: false)
- horizontal : Horizontal scroll (default: false)

## Event
triggers jQuery event and emits AngularJS event on scope too.
- overScrolledTop : fires when over-scrolled top of element few pixels.
- overScrolledBottom : fires when over-scrolled bottom of element few pixels.

## Demo
- <a href="http://run.plnkr.co/plunks/jRXcL9/" target="_blank">AngularJS Demo</a>
- <a href="http://run.plnkr.co/plunks/iycW6O/" target="_blank">jQuery Demo</a>

## License
The MIT License (MIT)
Copyright (c) 2016 Elevista
