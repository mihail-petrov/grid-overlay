Grid Overlay Script
============================

This is simple Grid Overlay for web browsers. It can be customized to show the developer diferent kinds of grid
overlys thath can be optonaly specifized.

---------------------------------
How to use
---------------------------------

Link the source code to your page and put the following line of code between the script tag 

```javascript
Grid.show();
```
By default the grid will show 960px grid with 12 columns and 10 px gutter in red color and 0.2 opacity

---------------------------------
Grid overlay options
---------------------------------

name | type | default | description
------------- |:-------------:|:-------------:|:--------------
width | Number | ```960``` | The width of Grid overlay 960 or 768  or 1280 etc
columns | Number | ```12``` | Number of columns of the grid
gutter | Number | ```10``` | The space between the columns
color | String | ```'#ff0000'``` | The color of a single grid column
opacity | Number | ```0.2``` | The color opacity of a single grid column


---------------------------------
Example
---------------------------------
```javascript
    Grid.show({
        'width'      : 960,
        'columns'    : 12,
        'gutter'     : 20,
        'color'      : "#ff0000",
        'opacity'    : 0.2
    });
```

---------------------------------
TODO 
---------------------------------
1. Add an On and Off Overlay button
2. Add a task bar for quickly changing the Overlay