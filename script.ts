const sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon")
const expandableSection = document.getElementById('side-expandable')
const expandableSectionTitle = expandableSection.querySelector('p.title') as HTMLElement
const tabs = document.querySelectorAll("#tabs .tab")
const indexJS = document.getElementById('index-js')
const indexPHP = document.getElementById('index-php')
const codepenPage = document.getElementById('codepen-page')
const contactsHTML = document.getElementById('contacts-html')
const corriculumPDF = document.getElementById('corriculum-pdf')
const documents = document.getElementsByClassName('document')

//set focus on index.js when page loads
document.addEventListener('DOMContentLoaded', () => { (document.querySelector('.document[data-page="index-js"]') as HTMLElement).focus() });

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
                const id: string = icon.dataset.title.replace(" ", "-")
                content.classList.toggle('hidden', content.id != id)
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
    for (let content of [indexJS, indexPHP, codepenPage, contactsHTML, corriculumPDF]) {
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
        p.classList.toggle('open')
        p.nextElementSibling.classList.toggle('hidden')
    }
})

// GitHub and Codepen external links
document.querySelectorAll('.document[data-github], .document[data-codepen], .document[data-url]').forEach((div: HTMLElement) => {
    if (div.dataset.github) div.onclick = () => { window.open("https://github.com/andreapozza/" + div.dataset.github, '_blank') }
    else if (div.dataset.codepen) div.addEventListener('click', () => { changeCodepen(div.dataset.codepen, div.innerText) }) //onclick = 
    else if (div.dataset.url) div.onclick = () => { window.open(div.dataset.url, '_blank') }
})

function changeCodepen(id: string, title: string) {
    
    const iframe = document.querySelector('#codepen-page iframe') as HTMLIFrameElement
    const url = "https://codepen.io/andreapozza/embed/" + id
    if(iframe.src == url) return //prevent unnecessary iframe refresh
    iframe.src = url

    document.querySelector('.tab[data-page="codepen-page"]').innerHTML = "&nbsp;"+title.trim()
}