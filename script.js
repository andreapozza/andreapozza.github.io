var sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon");
var expandableSection = document.getElementById('side-expandable');
var expandableSectionTitle = expandableSection.querySelector('p.title');
var tabs = document.querySelectorAll("#tabs .tab");
var indexJS = document.getElementById('index-js');
var indexPHP = document.getElementById('index-php');
var codepenPage = document.getElementById('codepen-page');
var contactsHTML = document.getElementById('contacts-html');
var corriculumPDF = document.getElementById('corriculum-pdf');
var documents = document.getElementsByClassName('document');
var sideBarHandler = document.getElementById("side-bar-handler");
//set focus on index.js when page loads
document.addEventListener('DOMContentLoaded', function () { document.querySelector('.document[data-page="index-js"]').focus(); });
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
                var id = icon.dataset.title.replace(" ", "-");
                content.classList.toggle('hidden', content.id != id);
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
// shrink small sidebar logic
document.querySelectorAll('.page').forEach(function (page) {
    page.onscroll = function (e) {
        var value = e.target.scrollLeft;
        var condition = screen.width <= 425 && value > 0;
        document.body.classList.toggle('fullscreen', condition);
        if (condition) {
            expandableSection.classList.remove('expanded');
            sidebarIcons.forEach(function (icon) { return icon.classList.remove('selected'); });
        }
    };
});
// switch between index.js and index.php pages
document.querySelectorAll('div[data-page]').forEach(function (el) {
    el.onclick = function () { changePage(el.dataset.page); };
});
function changePage(page) {
    for (var _i = 0, _a = [indexJS, indexPHP, codepenPage, contactsHTML, corriculumPDF]; _i < _a.length; _i++) {
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
    document.body.classList.remove('fullscreen');
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
        p.classList.toggle('open');
        p.nextElementSibling.classList.toggle('hidden');
    };
});
// GitHub and Codepen external links
document.querySelectorAll('.document[data-github], .document[data-codepen], .document[data-url]').forEach(function (div) {
    if (div.dataset.github)
        div.onclick = function () { window.open("https://github.com/andreapozza/" + div.dataset.github, '_blank'); };
    else if (div.dataset.codepen)
        div.addEventListener('click', function () { changeCodepen(div.dataset.codepen, div.innerText); }); //onclick = 
    else if (div.dataset.url)
        div.onclick = function () { window.open(div.dataset.url, '_blank'); };
});
function changeCodepen(id, title) {
    var iframe = document.querySelector('#codepen-page iframe');
    var url = "https://codepen.io/andreapozza/embed/" + id;
    if (iframe.src == url)
        return; //prevent unnecessary iframe refresh
    iframe.src = url;
    document.querySelector('.tab[data-page="codepen-page"]').innerHTML = "&nbsp;" + title.trim();
}
// sidebar resize
function resizeElementOnMousemove(ev, element, offset) {
    if (offset === void 0) { offset = 0; }
    element.style.width = ev.clientX + offset + "px";
}
function disableSelectableText(status) {
    if (status === void 0) { status = true; }
    var all = document.querySelector('*');
    all.style.userSelect = status ? 'none' : null;
}
function setCursor(value) {
    var all = document.querySelector('*');
    all.style.cursor = value;
}
function resizeSidebar(ev) {
    disableSelectableText();
    var minWidth = +getComputedStyle(expandableSection).minWidth.replace(/[a-z]+/, '');
    var offset = -50;
    if (ev.clientX < minWidth) {
        expandableSection.style.flexBasis = '3px';
        expandableSection.style.minWidth = '3px';
        expandableSection.style.flexGrow = '0';
        document.addEventListener('mouseup', function () {
            var isOpen = +getComputedStyle(expandableSection).width.replace(/[a-z]+/, '') > 3;
            expandableSection.classList.toggle('expanded', isOpen);
            expandableSection.style.flexBasis = null;
            expandableSection.style.minWidth = null;
            expandableSection.style.flexGrow = null;
            if (!isOpen) {
                sidebarIcons.forEach(function (icon) { return icon.classList.remove('selected'); });
            }
        }, { once: true });
        return;
    }
    else if (ev.movementX > 0 && ev.clientX > minWidth + 200) {
        expandableSection.style.flexBasis = null;
        expandableSection.style.minWidth = null;
        expandableSection.style.flexGrow = null;
    }
    resizeElementOnMousemove(ev, expandableSection, offset);
}
sideBarHandler.addEventListener('mousedown', function () {
    sideBarHandler.classList.add('border-active');
    setCursor('e-resize');
    document.addEventListener('mousemove', resizeSidebar);
});
document.addEventListener('mouseup', function () {
    sideBarHandler.classList.remove('border-active');
    document.removeEventListener('mousemove', resizeSidebar);
    disableSelectableText(false);
    setCursor(null);
});
// let timeout: NodeJS.Timeout
sideBarHandler.addEventListener('mouseenter', function (ev) {
    var timeout = setTimeout(function () {
        sideBarHandler.classList.add('border-active');
    }, 250);
    sideBarHandler.addEventListener('mouseleave', function (ev) {
        clearTimeout(timeout);
        if (ev.buttons)
            return;
        sideBarHandler.classList.remove('border-active');
    }, { once: true });
});
