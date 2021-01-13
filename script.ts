const sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon")
const expandableSection = document.getElementById('side-expandable')
const expandableSectionTitle = expandableSection.querySelector('p.title') as HTMLElement
const tabs = document.querySelectorAll("#tabs .tab")
const indexJS = document.getElementById('index-js')
const indexPHP = document.getElementById('index-php')
const documents = document.getElementsByClassName('document')

// small sidebar logic
for (let icon of Array.from(sidebarIcons) as HTMLElement[]) {
    icon.onclick = () => {
        if(icon.classList.contains('selected')) {
            expandableSection.classList.toggle('expanded')
            icon.classList.remove('selected')
        }
        else {
            expandableSection.classList.add('expanded')
            sidebarIcons.forEach(el=>el.classList.remove('selected')) //remove class 'selected' from every icons
            icon.classList.add('selected')
            expandableSectionTitle.innerText = icon.dataset.title
            expandableSection.querySelectorAll('.content').forEach(content => {
                content.classList.toggle('hidden', content.id != icon.dataset.title)
            })
        }
    }  
}

// start shrinked on mobile
if(screen.width <= 425) {
    expandableSection.classList.remove("expanded")
    document.querySelectorAll("#side-bar-small .top .icon")[0].classList.remove('selected')
}

// switch between index.js and index.php pages
document.querySelectorAll('div[data-page]').forEach((el: HTMLElement) => {
    el.onclick = () => {changePage(el.dataset.page)}
})

function changePage (page: string) {
    for (let content of [indexJS, indexPHP]) {
        content.classList.add('hidden')
    }
    document.getElementById(page).classList.remove('hidden')

    for (let tab of Array.from(tabs) as HTMLElement[]){
        if (tab.dataset.page == page) tab.classList.add('selected')
        else tab.classList.remove('selected')
    }

}

// auto update my age
document.querySelectorAll('span.my-age').forEach((span: HTMLElement) => {
    const now = Date.now()
    const birthday = new Date(1994, 6, 16)
    const dateDiff = new Date(now - birthday.getTime())
    const age = Math.abs( dateDiff.getUTCFullYear() - 1970 )
    span.innerText = String(age)
});

// open/close folders
document.querySelectorAll('p.folder').forEach((p: HTMLElement) => {
    p.onclick = () => {
        p.getElementsByTagName('i')[0].classList.toggle('fa-rotate-270')
        p.nextElementSibling.classList.toggle('hidden')
    }
})

// GitHub and Codepen external links
document.querySelectorAll('.document[data-github], .document[data-codepen]').forEach((div: HTMLElement) => {
    if (div.dataset.github) div.onclick = () => { window.open("https://github.com/andreapozza/" + div.dataset.github, '_blank') }
    else if (div.dataset.codepen) div.onclick = () => { window.open("https://codepen.io/andreapozza/pen/" + div.dataset.codepen, '_blank') }
})