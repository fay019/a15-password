const $password = $( '#input-password' );
const $myLength = $( '#myLength' );
const $lowercase = $( "#lowercase" );
const $uppercase = $( "#uppercase" );
const $numbers = $( "#numbers" );
const $symbols = $( "#symbols" );
// const blank = $("#spaces");
const $copy = $( "#copy" );
const $bars = $( '.bar-1, .bar-2, .bar-3, .bar-4' );
const $barText = $( '.bar-text' )
// write in span what symbol we use it
$( '#span-symbols' ).html( '$ % ^ & ( ) { } [ ] = + - / _ . , ; & l t ; & g t ; ? ! \' " @ ß' )

/**
 *
 * @param myLength {number} // password length
 * @param options {string} // the options that we want to have in our password
 */
let generator = ( myLength, options ) => {
    // ask the server to generate password for us
    $.ajax( {
        url:`http://localhost:3000/api/generator/${myLength}/${options}`,
        'content-type': 'application/json',
        success:function ( response ) {
            // if the string length is bigger than 31 we reduce the font size
            if ( response[ 0 ].length >= 31 ) {
                let temp = ( ( response[ 0 ].length ) * -0.55 ) + 37;
                temp = Math.round( temp * 100 ) / 100
                $password.css( 'font-size', temp + 'px' );
            } else {
                $password.css( 'font-size', '24px' );
            }
            // write the password received in our div
            $password.val( response[ 0 ] );
            // use the switch function to draw progress bar // convert to number
            mySwitch( response[ 1 ] )
        }
    } )
}

/**
 * ask server to check the strength of the given password
 * @param password {string}
 */
let checker = ( password ) => {
    console.log( password )
    $.ajax( {
        url:`http://localhost:3000/api/checker/${password}`,
        'content-type': 'application/json',
        success:function ( response ) {
            console.log( response )
            // use the switch function to draw progress bar // convert to number
            mySwitch( ( response * 1 ) );
        }
    } )
}

/**
 * On click, we build our options list
 * then we call generator function with 2 params
 * length and option
 */
$( '#generate' ).on( 'click', () => {
    let options = '';
    $lowercase.is( ':checked' ) && ( options += 'l' ); // lowercase
    $uppercase.is( ':checked' ) && ( options += 'u' ); // Uppercase
    $numbers.is( ':checked' ) && ( options += 'n' ); // Numbers
    $symbols.is( ':checked' ) && ( options += 's' ); // Symbols
    // blank.is(':checked') && (options += 'b'); // Space
    // call the function
    generator( $myLength.val(), options );
} )


/**
 * On click, we take the input
 * then we call checker function with 1 param
 * password
 */
$( '#btn-check' ).on( 'click', () => {
    let password = $( '#input-password' ).val();
    checker( password );

} )


// switch on
/**
 * we build our progress bar, with 5 levels
 * 1 very weak, 2 weak, 3 medium, 4 strong, 5 very strong
 * 1 sehr schwach, 2 schwach, 3 mittel, 4 stark, 5 sehr stark // in German
 * @param strength{number}
 */
let mySwitch = ( strength ) => {
    $bars.css( 'display', 'none' )
    switch ( strength ) {
        case 1:
            $barText.html( 'very weak' );
            $bars.css( 'display', 'none' )
            break;
        case 2:
            $barText.html( 'weak' )
            $( '.bar-1' ).css( 'display', 'inline-block' )
            break;
        case 3:
            $barText.html( 'medium' )
            $( '.bar-1, .bar-2' ).css( 'display', 'inline-block' )
            break;
        case 4:
            $barText.html( 'strong' )
            $( '.bar-1, .bar-2, .bar-3' ).css( 'display', 'inline-block' )
            break;
        case 5:
            $barText.html( 'very strong' )
            $bars.css( 'display', 'inline-block' )
            break;
        default:
            console.log( 'error ', strength );
    }
}

/**
 *  Listen for the click event on the `copy` and copy the password to your clipboard
 */
$copy.on( "click", () => {
    let $tempText = $( "<input>" );
    $tempText.value = $password.val();
    $tempText.appendTo( 'body' );
    $tempText.select();
    navigator.clipboard.writeText( $password.val() );
    $tempText.remove();
} );

///////////////// BACK HOME BTN /////////////////
$( '.btn-home' ).on( 'click', () => {
    window.open( `./index.html`, "_self" );
} )
$( '.btn' ).on( 'click', ( e ) => {
    let link = $( e.target ).text().toLowerCase();
    window.open( `./${link}.html`, "_self" );
} )

////////////// REGISTER //////////////////

$( '.eye' ).on( 'click', ( e ) => {
    $( e.target ).css( 'content', 'url("../icon/eye-slash.svg")' );
    console.log( $( e.target ).parent().children( ":first" ) );
    let $temp = $( e.target ).parent().children( ":first" )
    if ( $temp.attr( "type" ) === "password" ) {
        $temp.attr( "type", "text" );
        $( e.target ).css( 'content', 'url("../icon/eye-slash.svg")' );
    } else {
        $temp.attr( "type", "password" );
        $( e.target ).css( 'content', 'url("../icon/eye.svg")' );
    }
} )
$( '#password' ).on( 'keyup', ( e ) => {
    checker( $( e.target ).val() );
} )
