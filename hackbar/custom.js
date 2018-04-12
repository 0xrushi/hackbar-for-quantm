(function() {
    var str = '';
    var attack = prompt('Attack', '');
    if (!attack) return false;

    function getallelems(v) {
        var ii = document.getElementsByTagName(v);
        for (var i = 0; i < ii.length; i++) {
            if (!ii[i].name) continue;
            str += (str ? '&' : '') + ii[i].name + '=' + attack;
        }
    }
    getallelems('input');
    getallelems('textarea');
    getallelems('select');
    str = document.location.search + (document.location.search.indexOf('?') == -1 ? '?' : '&') + str;
    alert(str);
    document.location.search = str;
})();