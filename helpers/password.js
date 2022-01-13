let charactersLowerCase = "abcdefghijklmnopqrstuvwxyzäöü";
let charactersUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ";
let numbers = "0123456789";
let symbols = "$%^&(){}[]=+-/_.,;><?!'\"@ß";
// let blank = " "; // I'm not sure if is a good idee => todo => ask Alex!

/**
 * password generator
 * @param myLength {number} // password length
 * @param options {string} // password option - l => lowercase - u => uppercase - n => numbers - s => symboles
 * @return {string} // return generated password
 */
let generator = function ( myLength = 8, options = 'luns' ) {
    let result = '';
    let passwordCharactersList = '';
    for ( const optionValue of options ) {
        // check our options
        switch ( optionValue ) {
            case "l":
                passwordCharactersList += charactersLowerCase;
                result += charactersLowerCase.charAt( Math.floor( Math.random() ) ); // add 1 character from LowerCase
                myLength--; // we add 1 character
                break;
            case "u":
                passwordCharactersList += charactersUpperCase;
                result += charactersUpperCase.charAt( Math.floor( Math.random() ) ); // add 1 character from UpperCase
                myLength--; // we add 1 character
                break;
            case "n":
                passwordCharactersList += numbers;
                result += numbers.charAt( Math.floor( Math.random() ) ); // add 1 character from numbers
                myLength--; // we add 1 character
                break;
            case "s":
                passwordCharactersList += symbols;
                result += symbols.charAt( Math.floor( Math.random() ) ); // add 1 character from symbols
                myLength--; // we add 1 character
                break;
            /*case "b":
                password += blank;
                myLength--;
                break;*/
            default:
                console.log( `this option is not supported: ${optionValue} ` );
                break;
        }
    }
    // we generate the rest of password length
    for ( let i = 0; i < myLength; i++ ) {
        result += passwordCharactersList.charAt( Math.floor( Math.random() * passwordCharactersList.length ) )
    }
    // we mix up our generated password because the 1st comes from each option (4 max), and send it back
    return shuffle( result );
}

/**
 * string mixer
 * @param text {string}
 * @return {string}
 */
let shuffle = function ( text ) {
    let a = text.split( "" ),
        n = a.length;
    for ( let i = n - 1; i > 0; i-- ) {
        let j = Math.floor( Math.random() * ( i + 1 ) );
        let tmp = a[ i ];
        a[ i ] = a[ j ];
        a[ j ] = tmp;
    }
    return a.join( "" );
}

/**
 * password strength check, for each existing option we increase the strength
 * @param password {string}
 * @return {number}
 */
let checkPassword = function ( password ) {
    let strength = 0;

    if ( password.match( /[a-z]+/ ) ) {
        strength += 1;
    }
    if ( password.match( /[A-Z]+/ ) ) {
        strength += 1;
    }
    if ( password.match( /[0-9]+/ ) ) {
        strength += 1;
    }
    if ( password.match( /[\$%\^&\(\)\{\}\[\]=\+-/_\.,;><\?!'"@]+/ ) ) {
        strength += 1;
    }
    if ( password.length > 15 ) {
        strength += 1;
    }
    return strength;
}

/**
 *
 * @type {{checkPassword: (function(string): number), generator: (function(number=, string=): string)}}
 */
module.exports = {
    generator,
    checkPassword
}