var sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon");
var _loop_1 = function (icon) {
    icon.onclick = function () {
        var expandableSection = document.getElementById('side-expandable');
        var expandableSectionTitle = expandableSection.querySelector('p.title');
        if (icon.classList.contains('selected'))
            expandableSection.classList.toggle('expanded');
        else
            expandableSection.classList.add('expanded');
        sidebarIcons.forEach(function (el) { return el.classList.remove('selected'); }); //remove class 'selected' from every icons
        icon.classList.add('selected');
        expandableSectionTitle.innerText = icon.dataset.title;
    };
};
for (var _i = 0, _a = Array.from(sidebarIcons); _i < _a.length; _i++) {
    var icon = _a[_i];
    _loop_1(icon);
}
