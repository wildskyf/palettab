var colorFonts = (function() {

    'use strict';
    var body, reloadButton, reloadSvg, textField;

    var cards, cardTop, cardBottom, fontSamples, fontNames, fontCreators, hexValues, eyes;

    var rotation = 0;

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

    /* -------------------------
    /* APP
    /* -------------------------*/

    // Initialize
    function init() {

        var i = 0;
        for( i; i < cards.length; i++ ) {
            var card = cards[i];
            cards[i].addEventListener( 'click', function( event ) { barClick( event ) } );
            cardTop[i].addEventListener( 'mouseover', function( event ) { onMouseOverTop( event, card ) });
            cardTop[i].addEventListener( 'mouseout', function( event ) { onMouseOut( event, card ) });
            cardBottom[i].addEventListener( 'mouseover', function( event ) { onMouseOverBottom( event, card ) } );
            cardBottom[i].addEventListener( 'mouseout', function( event ) { onMouseOut( event, card ) });
        }

        // Bind events
        reloadButton.addEventListener('click', function() { reloadClick() });

        assignFonts();

        setTimeout( function() {
            reloadColors();
        }, 0 );
    }

    // @TODO: Find a  better way that is not constantly adding classes
    function onMouseOverTop( event, element ) {
        element.classList.remove( 'mouse-over-bottom' );
        element.classList.add( 'mouse-over-top' );
    }

    function onMouseOverBottom( event, element ) {
        element.classList.remove( 'mouse-over-top' );
        element.classList.add( 'mouse-over-bottom' );
    }

    function onMouseOut( event, element ) {
        
        if( event.toElement.nodeName === 'BODY' ) {
            element.classList.remove( 'mouse-over-top' );
            element.classList.remove( 'mouse-over-bottom' );
        }
    }


    function reloadClick() {

        rotation -= 180;
        reloadSvg.style.webkitTransform = 'translateZ(0px) rotateZ( ' + rotation + 'deg )';
        reloadColors();
    }

    function barClick( event ) {
        
        var element = event.srcElement;
        copyText( element.getAttribute('data-color') || element.innerHTML );
        copySuccess( element );
    }

    // Copy text to clipboard.
    function copyText( text ) {
        textField.textContent = text;
        document.body.appendChild( textField );
        textField.select();
        document.execCommand( 'copy' );
        body.removeChild( textField );
    }

    function copySuccess( element ) {
        console.log( "show success!" );
    }

    function reloadColors() {

        var colorSet = colors[ Math.floor( Math.random() * colors.length )]; //Random
        assignColors( colorSet.colors );
    }

    function assignColors( colorSet ) {

        var i = 0;
        for( i; i < cards.length; i++ ) {
            var card = cards[i];
            var hashColor = '#' + colorSet[i];
            card.setAttribute( 'data-color', hashColor );
            card.style.backgroundColor = hashColor;
            hexValues[i].innerHTML = hashColor;
            eyes[i].style.fill = hashColor;
        }
    }

    function assignFonts() {

        var i = 0;
        for( i; i < cards.length; i++ ) {
            fontSamples[i].style.fontFamily = usedFonts[i].name;
            fontNames[i].innerHTML          = usedFonts[i].name;
            fontCreators[i].innerHTML       = "by " + usedFonts[i].creator;
            cardBottom[i].href              = "http://www.google.com/fonts/specimen/" + usedFonts[i].name
        }
    }

    function main() {

        // Caching
        body             = document.body;
        
        // UI
        reloadButton     = document.querySelector( '.reload' );
        reloadSvg        = reloadButton.querySelector( 'svg' );
        textField        = document.createElement( 'textarea' );

        // Cards
        cards            = document.querySelectorAll( '.color-wrapper' );

        cardTop          = document.querySelectorAll( '.top-half' );
        cardBottom       = document.querySelectorAll( '.bottom-half' );

        fontSamples      = document.querySelectorAll( '.top-half .font-container' );
        hexValues        = document.querySelectorAll( '.hex-value' );

        fontNames        = document.querySelectorAll( '.name' );
        fontCreators     = document.querySelectorAll( '.creator' );
        eyes             = document.querySelectorAll( '.bottom-half .eye svg path' );

        // Initialize
        init();
    }

    return extend( main, {
    });

})();

colorFonts();