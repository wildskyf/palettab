// @TODO: Create via colorfonts, and not be a global var.
var loader = (function() {

    'use strict';
    var palette;
    var body, loader, squares;
    var interval;

    /* -------------------------
    /* UTILS
    /* -------------------------*/

    // Soft object augmentation
    function extend( target, source ) {

        for ( var key in source ) {
            if ( !( key in target ) ) {
                target[ key ] = source[ key ];
            }
        }

        return target;
    }

    function init() {
    	start();
    }

    function start() {

    	interval = setInterval( iterateColors, 50 );
    }

    function iterateColors() {

		var i = 0;
		for( var i; i < palette.length; i++ ) {
			squares[i].style.backgroundColor = '#' + palette[i];
		}

		// Move last item in array to first
		palette.splice(0, 0, palette.splice(palette.length - 1, 1)[0]);
    }

    function stop() {
    	clearInterval( interval );
    }

    function main( colors ) {

        // There is always 5 colors.
        palette = [
            colors[0],
            colors[1],
            colors[2],
            colors[3],
            colors[4],
            colors[3],
            colors[2],
            colors[1],
            colors[0],
        ];

        // Caching
        body             = document.body;
        loader           = document.querySelector( '.loader' );
        squares          = document.querySelectorAll( '.loader .square' );

        // Initialize
        init();
    }

    return extend( main, {
    });

})();