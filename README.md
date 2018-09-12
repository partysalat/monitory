Monitory
=============
[![CircleCI][circleci]][circleci-url]
[![npm][npm]][npm-url]

This project is intended to be a small helper framework for creating dashboards to be used in team areas.
You as a user just need to define two things: 
* jobs: node processes, that fetches your data and emits events to the frontend 
* dashboards: react components, that subscribes to emitted jobs and show the data.

![Sample 1](docs/screen1.png?raw=true)

![Sample 2](docs/screen2.png?raw=true)


Disclaimer
------------
This is an early version, not so far away from being usable but breaking changes can still occur. 

User Manual
===========
Folder Structure
----------------

The default folder structure looks like this:
```
index.js
package.json
dashboards/
├── dashboard1.js
├── dashboard2.js
└── ....
jobs/
├── job1.js
├── job2.js
└── ....
assets/
├── icon.svg
├── foo.jpg
└── ....
```

To start monitory, create an index.js file with the following content
```javascript 1.8
const monitory = require('monitory');

monitory.start();
``` 
and let it run with `node index.js`. It can be configured as well, the properties and default values are:
```javascript 1.8
monitory.start({
  port: 1337,
  assetsPort: 1338,
  dashboards: `${__dirname}/dashboards/*`, //glob
  jobs: `${__dirname}/jobs/*`, //glob
  additionalAssetsDir: `${__dirname}/assets`,
});
``` 

If you want to see a full example, go to the example folder in this project.

Jobs
------
Jobs are the main processing unit for your data crawling. A job file just exports a map with following values:

**id (string)**
The id of the job to which frontend components can subscribe to. 

**interval (number)**
Define the interval, at which the job will be executed. (cannot be applied at the same time with `cron`)

**cron (string)**
Define a cron job at which the job will be executed (cannot be applied at the same time with `interval`)

**job (func)**
A function that defines the job. Do your crawling logic inside here. You can return a value, a promise or even use an async function.


**Example:** 
```javascript 1.8
 module.exports = {
  id: 'myJobId2',// 
  interval: 5000, // ms 
  job: function(){
    return Math.round(Math.random() * 1000)
  }
}

```
```javascript 1.8
 module.exports = {
  id: 'myJobId2',// 
  cron: '0/30 * * * * *', //every 30 seconds
  job: function(){
    return Math.round(Math.random() * 1000)
  }
}

```

It is also possible to return and array of jobs in one file, e.g.:

```javascript 1.8
module.exports = [{
  id: 'myJobId2',// 
  interval: 5000, // ms 
  job: function () {
    return Math.round(Math.random() * 1000)
  }
}, {
  id: 'myJobId2',// 
  interval: 5000, // ms 
  job: function () {
    return Math.round(Math.random() * 1000)
  },
}];

```


### Clients
There are some clients provided, that helps you fetching data from common sources such as:


#### Teamcity Client
```javascript
const { teamcityClient } = require('monitory')
const client = teamcityClient.create({ url: 'https://teamcity.jetbrains.com' });
```
Provides a method for retrieving failed jobs.
* `client.getFailedJobsFor(<Array of Teamcity Project Ids>)`: Returns an array of the format
  * `name` Job Name with parent project information separated by '/'
  * `assignee`If somebody clicks assign in teamcity, the buildstep will be marked as assigned on the monitor. 
 ```
 [{name: <build name>, assignee:<Name of the teamcity user>},...]
 ```

#### ELK Client
```javascript
const { elkClient } = require('monitory');
const client = elkClient.create({ url: 'https://elk.url', alias:'foo' });
```
With the methods:
* `client.getCountFor(queryString,timeSpan)`: Returns the number of hits
  * `queryString` The ElasticSearch querystring you want to count  
  * `timespan=now-1h` Date math timespan (see https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#date-math)  
* `client.getHistogramFor(queryString,timeSpan=now-1h, interval=30s)`: Returns a series of hits 
  * `queryString` The ElasticSearch querystring you want to count  
  * `timespan` Date math timespan (see https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#date-math)  
  * `interval` duration of "one step" in the time series.   

#### Graphite Client
```javascript
const { graphiteClient } = require('monitory');
const client = graphiteClient.create({ url: 'https://elk.url', alias:'foo' });
```
With the methods:
* `client.getHistogramFor(target,from=2h,until=now)`: Returns series of hits
  * `target` graphite target   
  * `from` At which point in time it should start  
  * `until` At which point in time it should stop  


Dashboards
------------ 
For now, there are some components defined which makes your life easier. You can import them from `monitory/frontend`/
Do not forget to import React! This is needed for jsx transpiling. 

An example dashboard with an empty card could look like this:
```javascript 1.7
import React from 'react';
import { Card, Dashboard } from 'monitory/frontend';

export default function () {
  return (
    <Dashboard cols={2} title="Basic Dashboard">
      <Card
        job="myJobId2"
        title="Basic Tile"
      />

    </Dashboard>
  );
}

```

### Developing
When you develop locally, consider setting this enviroment variable:  
```bash
export MONITORY_DEBUG=true
```
This will start webpack in debug mode and dramatically decrease compile time and development speed. 

### Dashboard

The basic unit, used as a Wrapper for Cards. It has some layout options:

**cols (number) = 4**
Number that indicates how many columns you want to have in your dashboard. 

**rowHeight (number) = 200px**
Define the height of the rows, internally it will set the `grid-auto-rows` options, so you can provide a space separated list 
to set the height of rows individually. (e.g. `rowHeight="200px 100px 350px"`)

**title (String)**
If you want to group your dashboards, you can add a title to them.

### Base

All widgets have these properties 

**title (string)**
Title to show on the card

**showWhen (function(data, viewValue):Boolean)**
When you only want to show the component when some conditions are met, you can use this hook.
It is called with the current value provided by the job and the derived one provided by value prop.   

**color (function(data, viewValue):string | string)**
Define the background color of the card. You can either define it as a String or as a function to return a fitting color.
The font is calculated accordingly (either black or white). 

**alert (function(data, viewValue):boolean | boolean)**
Boolean that adds a pulse animation to the card, indicating that the team should focus attention.   

**playAudioWhen (function(data, viewValue):string)**
Define a function, which calculates on the current data, if a sound should be played. The logic behaves like this: 

You have to return a path, which points to a soundfile. The function is called maybe multiple times but the sound file is only played once. 
If the path to the sound file changes and you return another sound file path (or null), then it will play the returned other sound file (or nothing).
When you return the first sound file again, the logic starts over.    
Pro-Tip: You can place the sound file in the assets folder that is reachable under `/assets/<your file>`

**rows (number)**
Define the row span of the card

**cols (number)**
Define the column span of the card
    

### Card

A Card that shows just a number from data processed by a job.

Inherits from `Base`. 

**job (string)**
Job name, to which this component should subscribe. 

**value (function(data, viewValue):Number)**
Function to map the view value from the job data. When the job emits the data, you should here reduce it to a single value which has to be a number.  


**graph (boolean | function(data, viewValue):Array[Number])**
Function that maps the job data to an array of numbers to be shown as a line chart in the background. 
An Array of `{x,y}` pairs are allowed as well. When providing a boolean, the data is just taken as it is.

**graphOptions (object))**
Options to the line graph object (see https://gionkunz.github.io/chartist-js/api-documentation.html for details)

**graphColor (function(data, viewValue):String)|string**
Define a color for the line chart as a function or directly as a string.

**withTendency (boolean|function(current, viewValue, last, lastViewValue))**
Boolean that indicates if there should be a small arrow shown underneath the value showing the direction compared to the last value.
If you provide a function, you have to return a css rotation attribute, e.g. `45deg` or `0.567rad`, depending on the data you retrieve.   

### List

A list widget for failed build jobs. 

Inherits from `Base`. 

**job (string)**
Job name, to which this component should subscribe. 

**value (function(data):Array[String|Number])**
Function to map the view value from the job data. When the job emits the data, you should here reduce it to an array of strings/numbers.  
Takes an array of strings as parameter, but can also be an object with an assignee, e.g.
```javascript
["TeamcityBuildJob","TeamcityBuildJob2", "TeamcityBuildJob3"]
or
[
  {name: "TeamcityBuildJob", assignee:"Luke Skywalker"},
  {name: "TeamcityBuildJob2"},
  {name: "TeamcityBuildJob3"},
]
```



### ReloadableIframe
Just an Iframe component which reloads itself after an amount of time. 

Inherits from `Base`. 

**src (String)**
The src for the Iframe.

**interval (Number)**
Define the interval to refresh the iframe.

**zoom (Number)**
Define zoom of the content of the iframe

### ReloadableImg
An Img component which reloads itself after an amount of time. For example for giffy.

Inherits from `Base`. 

**src (String)**
The src for the Img.

**interval (Number)**
Define the interval to refresh the img.



Themeing:
---------
You can choose between two themes: light and dark. 
Or you can create your own theme by providing an object with the following properties:
```javascript
{
    background: '#ccc',
    fontSize: '100%',
    cardBackgroundColor: 'white',
    cardFontColorBright: 'rgba(255,255,255,1)', // Defines font color, when the background is bright
    cardFontColorBrightLight: 'rgba(255,255,255,0.7)', // Defines title font color, when the background is bright
    cardFontColorDark: 'rgba(0,0,0,1)', // Defines font color, when the background is dark
    cardFontColorLightDark: 'rgba(0,0,0,0.7)', // Defines title font color, when the background is dark
    graphColor: 'rgba(0,0,0,0.3)',
    listAssigneeColor: '#efd700',
    listFailedColor: 'red',
    headlineColor: 'black',
    headlineBackground: '#eee',
  }

```
and then use it with the theme provider:
```jsx harmony
import { ThemeProvider, themes, Dashboard } from 'monitory/frontend';
export default function () {
  return (
    <ThemeProvider value={themes.dark}>
     <Dashboard> 
        ...
     </Dashboard>
    </ThemeProvider>
  );
}
```



Defining the dimensions of the dashboard
----------------------------------------
To control the size of the dashboard, you have basically three dimensions to set:
* **Card height**: Define the `rowHeight` property of the dashboard  
* **Card width**: Using `cols` property of the dashboard 
* **Font Size**: Using `fontSize` property of the theme. Every font is set with the `rem` relative property 
and this will set the root font size (100% = 16px)


Useful Utility methods
----------------------
### Moving Window for tendency
Calculates the moving average of the last `n` values. Because this components has state, you have to initialize it outside of the render method.
```javascript
import { helpers } from 'monitory/frontend';
const lastElementConsidered = 5
const movingAverage = helpers.movingAverage(lastElementConsidered);
...
<Card job="example3" withTendency={movingAverage} />
...
```
### Range method for colors
Use this small helper to easily define ranges to show colors. 
Examples:
```javascript
import { helpers } from 'monitory/frontend';
const {colorRange} = helpers;
...
<Card job="example3" color={colorRange(['red', 3000, 'blue', 6000, 'yellow'])} />
...
```
Shows red, when the value is below 3000, blue when the view value is between 3000 and 6000 and yellow when it is above 6000.



Used Technologies
==========
Frontend
--------
* React - frontend component rendering
* Redux/ Redux Saga - subscribe to websocket events and broadcasting to the dashboards/widgets
* styled components / styled icons - css styling of react components 
* react toastify - for showing errors / warnings
* Chartist/React Chartist - responsive background charts
* color - color calculations


Backend
-------
* Hapi ecosystem - HTTP framework, still the best I know for node!
* Nes - websocket handling 
* cron - takes care of cron jobs
* webpack serve - compile frontend assets on the fly
* glob - file handling
  

Motivation
==========
In our team at work, we use a team monitor so if we get asked: does our system has a problem right now? We can soundly say: No, everything is fine. 
This monitor had some metrics on the left and some rotating dashboards on the right. 
Because we could easily oversee issues with rotating dashboards, we decided to search for alternatives to have a unified view.

Main criteria were:
* Be able to give an overview about business KPIs.
* Be minimalistic; meaning showing only numbers instead of fine grained graphs, so that you can immediately see if errors occur. No need for interpret graphs or thinking too much. 
The idea is not to have a highly dynamic dashboard with filters etc.
* Show when errors occur in our application / nightly jobs / pipelines but hide when everything is fine.

We searched for solutions, but for most of them, you have to pay and/or they provide too much functionality and thus complexity.
So I have written something which should be easy to use. 

This project is highly inspired by http://dashing.io/ which unfortunately is no longer maintained. 


[npm]: https://img.shields.io/npm/v/monitory.svg
[npm-url]: https://npmjs.com/package/monitory

[circleci]: https://img.shields.io/circleci/project/github/partysalat/monitory.svg
[circleci-url]: https://circleci.com/gh/partysalat/monitory/tree/master


