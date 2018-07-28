Monitory
=============
[![CircleCI][circleci]][circleci-url]
[![npm][npm]][npm-url]

This project is intended to be a small helper framework for creating dashboards to be used in teamareas.
You as a user just need to define two things: 
* jobs: node processes, that fetches your data and emits events to the frontend 
* dashboards: react components, that subscribes to emitted jobs and show the data.

Disclaimer
------------
This is an early version and far away from being usable. 

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
  dashboards: `${__dirname}/dashboards/*`,
  jobs: `${__dirname}/jobs/*`,
  additionalAssetsDir: `${__dirname}/assets`,
});
``` 


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

Dashboards
------------ 
For now, there are some components defined which makes your life easier. You can import them like
```javascript 1.8
import React from 'react';
import { Dashboard, Card, List } from 'monitory/frontend';
```
Do not forget to import React! This is needed for jsx transpiling. 

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

**job (string)**
Job name, to which this component should subscribe. 

**title (string)**
Title to show on the card

**showWhen (function({current, last}))**
When you only want to show the component when some conditions are met, you can use this hook.
It is called with the current and the last value emitted by the job.   

**color (function({current, last}) || string)**
Define the background color of the card. You can either define it as a String or as a function to return a fitting color.
The font is calculated accordingly (either black or white). 

**alert (function({current, last}) || boolean)**
Boolean that adds a pulse animation to the card, indicating that the team should focus attention.   

**rows (number)**
Define the row span of the card

**cols (number)**
Define the column span of the card
    

### Card

A Card that shows just a number from data processed by a job.

Inherits from `Base`. 

**value (function({current, last})):Number**
Function to map the view value from the job data. When the job emits the data, you should here reduce it to a single value which has to be a number.  


**graph (function({current, last})):Array[Number]**
Function that maps the job data to an array of numbers to be shown as a line chart in the background. 

**graphColor (function({current, last}))|string**
Define a color for the line chart as a function or directly as a string.

**withTendency (boolean)**
Boolean that indicates if there should be a small arrow shown underneath the value showing the direction compared to the last value.  

### List

A list widget for failed build jobs. 

**value (function({current, last})):Array[String|Number]**
Function to map the view value from the job data. When the job emits the data, you should here reduce it to an array of strings/numbers.  
Takes an array of strings as parameter, but can also be an object with an assignee, e.g.
```json
["TeamcityBuildJob","TeamcityBuildJob2", "TeamcityBuildJob3"]
or
[
  {name: "TeamcityBuildJob", assignee:"Luke Skywalker"},
  {name: "TeamcityBuildJob2"},
  {name: "TeamcityBuildJob3"},
]
```

Inherits from `Base`. 

### ReloadableIframe
Just an Iframe component which reloads itself after an amount of time. 

**src (String)**
The src for the Iframe.

**interval (Number)**
Define the interval to refresh the iframe.

### ReloadableIframe
An Img component which reloads itself after an amount of time. For example for giffy.

**src (String)**
The src for the Iframe.

**interval (Number)**
Define the interval to refresh the iframe.



Themeing:
---------
You can choose between two themes: light and dark. 
Or you can create your own theme by providing an object with the following properties:
```json
{
    background: '#ccc',
    fontSize: '100%',
    cardBackgroundColor: 'white',
    cardFontColorBright: 'rgba(255,255,255,1)',
    cardFontColorBrightLight: 'rgba(255,255,255,0.7)',
    cardFontColorDark: 'rgba(0,0,0,1)',
    cardFontColorLightDark: 'rgba(0,0,0,0.7)',
    graphColor: 'rgba(0,0,0,0.3)',
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



Todos:
---------

Backend:



Frontend:


This project is highly inspired by http://dashing.io/ which is unfortunately no longer maintained. 


[npm]: https://img.shields.io/npm/v/monitory.svg
[npm-url]: https://npmjs.com/package/monitory

[circleci]: https://img.shields.io/circleci/project/github/partysalat/monitory.svg
[circleci-url]: https://circleci.com/gh/partysalat/monitory/tree/master
