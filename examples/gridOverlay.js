;(function(window, document, undefined) {
     
    /**
     * [GridOverlay description]
     * @param {[type]} options [description]
     */
    var GridOverlay = function(options) {
        
        options = options || {};

        this.width      = options.width   || 960;
        this.columns    = options.columns || 12;
        this.gutter     = options.gutter  || 1;

        this.columnColor = options.columnColor   || "#ff0000";
        this.background  = options.background    || "#000000";
        this.opacity     = options.opacity       || '0.2';

        this.gridSwitch  = options.gridSwitch    || false;

        // Mathod calls
        this.constructCanvas();
        this.constructSwitch();
    };

    /**
     * Init the basic components of the overlay
     * @return {[type]} [description]
     */
    GridOverlay.prototype.constructCanvas = function() {
        
        this.canvas  = document.createElement("canvas");
        this.context = this.canvas.getContext('2d');

        // dimension boundaries
        var windowWidth = window.innerWidth  || document.documentElement.clientWidth;
        var startPoint  = (windowWidth / 2) - (this.width / 2);

        // style the canvas
        this.canvas.width    = this.width;
        this.canvas.height   = window.innerHeight || document.documentElement.clientHeight; 

        // set Style options
        style(this.canvas, {
            "position"      : "absolute",
            "background"    : this.background,
            "top"           : 0,
            "left"          : startPoint + "px",
            "opacity"       : this.opacity,
            "z-index"       : -1 
        });

        document.body.appendChild(this.canvas); 

        this.render(this.context);
    };

    /**
     * [constructSwitch description]
     * @return {[type]} [description]
     */
    GridOverlay.prototype.constructSwitch = function() {
        
        if(this.gridSwitch) {
            this.gridSwitch =  document.createElement("div");
            this.gridSwitch.textContent = "On"    
            this.gridSwitch.innerText   = "On";   
            this.gridSwitch.className   = "grid-on";

            style(this.gridSwitch, {
                position    : "absolute",
                right       : "25px"    ,
                bottom      : "25px"    ,
                padding     : "12px"    ,
                cursor      : "pointer" , 
                background  : "#333332" ,
                color       : "#ffffff" ,
            });

            document.body.appendChild(this.gridSwitch); 

            // set grid state to be managed in a late state
            // localStorage.setItem('grid-state', 'on');

            // init the controll panel of the Overlay grid
            this.menu();
        }
    };

    /**
     * [render description]
     * @param  {[type]} context [description]
     * @return {[type]}         [description]
     */
    GridOverlay.prototype.render = function(context) {
        
        var columnX = 0;
        var columnWidth = (this.width / this.columns);

        for(var i = 0, len = this.columns; i< len; i+= 1) {
            
            var x = columnX + (this.gutter / 2);
            var w = columnWidth - (this.gutter);

            context.beginPath();
                context.rect(x, 0, w, window.innerHeight);
                context.fillStyle = this.columnColor;
                context.fill();
            context.closePath();

            columnX += columnWidth;
        }
    }

    /**
     * [menu description]
     * @return {[type]} [description]
     */
    GridOverlay.prototype.menu = function() {
        
        var _this = this;

        if(localStorage.getItem('grid-state')) {
            this.setCanvasMode(localStorage.getItem('grid-state'));
        }

        // monitor the manual canvas state change
        this.gridSwitch.addEventListener('click', function(e) {
            (this.className == 'grid-on') ? _this.setCanvasMode('off') : _this.setCanvasMode('on'); 
        });
    }

    /**
     * [setCanvasMode description]
     * @param {[type]} mode [description]
     */
    GridOverlay.prototype.setCanvasMode = function(mode) {
        
        switch(mode) {
            case 'off' : {
                style(this.canvas, { 'opacity' : 0 });
                this.gridSwitch.className = "grid-off";
                this.gridSwitch.textContent = 'Off';
                this.gridSwitch.innerText = 'Off';

                // set canvas show state
                localStorage.setItem('grid-state', 'off');
            } break;
            case 'on' : {
                style(this.canvas, { 'opacity' : this.opacity });
                this.gridSwitch.className = "grid-on";
                this.gridSwitch.textContent = 'On';
                this.gridSwitch.innerText   = 'On';

                // set canvas show state
                localStorage.setItem('grid-state', 'on');
            } break;
        }  
    };

    //  comment
    // ---------------------------
    var style = function(element, properties) {
        for(var index in properties) {
            element.style[toCamelCase(index)] = properties[index];
        }
    };

    //  comment
    // ---------------------------
    var toCamelCase = function(str) {
        return str.replace(/-([a-z])/ig, function(all, letter) {
            return letter.toUpperCase();
        });
    }

    window.GridOverlay = GridOverlay;

})(window, document);