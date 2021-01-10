var sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon");
var _loop_1 = function (icon) {
    icon.onclick = function () {
        if (icon.classList.contains('selected'))
            document.getElementById('side-expandable').classList.toggle('expanded');
        else
            document.getElementById('side-expandable').classList.add('expanded');
        sidebarIcons.forEach(function (el) { return el.classList.remove('selected'); }); //remove class 'selected' from every icons
        icon.classList.add('selected');
    };
};
for (var _i = 0, _a = Array.from(sidebarIcons); _i < _a.length; _i++) {
    var icon = _a[_i];
    _loop_1(icon);
}
