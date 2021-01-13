var sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon");
var expandableSection = document.getElementById('side-expandable');
var expandableSectionTitle = expandableSection.querySelector('p.title');
var tabs = document.querySelectorAll("#tabs .tab");
var indexJS = document.getElementById('index-js');
var indexPHP = document.getElementById('index-php');
var documents = document.getElementsByClassName('document');
var _loop_1 = function (icon) {
    icon.onclick = function () {
        if (icon.classList.contains('selected')) {
            expandableSection.classList.toggle('expanded');
            icon.classList.remove('selected');
        }
        else {
            expandableSection.classList.add('expanded');
            sidebarIcons.forEach(function (el) { return el.classList.remove('selected'); }); //remove class 'selected' from every icons
            icon.classList.add('selected');
            expandableSectionTitle.innerText = icon.dataset.title;
            expandableSection.querySelectorAll('.content').forEach(function (content) {
                content.classList.toggle('hidden', content.id != icon.dataset.title);
            });
        }
    };
};
// small sidebar logic
for (var _i = 0, _a = Array.from(sidebarIcons); _i < _a.length; _i++) {
    var icon = _a[_i];
    _loop_1(icon);
}
// start shrinked on mobile
if (screen.width <= 425) {
    expandableSection.classList.remove("expanded");
    document.querySelectorAll("#side-bar-small .top .icon")[0].classList.remove('selected');
}
// switch between index.js and index.php pages
document.querySelectorAll('div[data-page]').forEach(function (el) {
    el.onclick = function () { changePage(el.dataset.page); };
});
function changePage(page) {
    for (var _i = 0, _a = [indexJS, indexPHP]; _i < _a.length; _i++) {
        var content = _a[_i];
        content.classList.add('hidden');
    }
    document.getElementById(page).classList.remove('hidden');
    for (var _b = 0, _c = Array.from(tabs); _b < _c.length; _b++) {
        var tab = _c[_b];
        if (tab.dataset.page == page)
            tab.classList.add('selected');
        else
            tab.classList.remove('selected');
    }
}
// auto update my age
document.querySelectorAll('span.my-age').forEach(function (span) {
    var now = Date.now();
    var birthday = new Date(1994, 6, 16);
    var dateDiff = new Date(now - birthday.getTime());
    var age = Math.abs(dateDiff.getUTCFullYear() - 1970);
    span.innerText = String(age);
});
// open/close folders
document.querySelectorAll('p.folder').forEach(function (p) {
    p.onclick = function () {
        p.getElementsByTagName('i')[0].classList.toggle('fa-rotate-270');
        p.nextElementSibling.classList.toggle('hidden');
    };
});
// GitHub and Codepen external links
document.querySelectorAll('.document[data-github], .document[data-codepen]').forEach(function (div) {
    if (div.dataset.github)
        div.onclick = function () { window.open("https://github.com/andreapozza/" + div.dataset.github, '_blank'); };
    else if (div.dataset.codepen)
        div.onclick = function () { window.open("https://codepen.io/andreapozza/pen/" + div.dataset.codepen, '_blank'); };
});
