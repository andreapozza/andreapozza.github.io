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
const sideBarHandler = document.getElementById("side-bar-handler")

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

// shrink small sidebar logic
document.querySelectorAll('.page').forEach((page: HTMLElement) => {
    page.onscroll = (e) => {
        const value = (e.target as HTMLElement).scrollLeft
        const condition: boolean = screen.width <= 425 && value > 0
        document.body.classList.toggle('fullscreen', condition)
        if(condition) {
            expandableSection.classList.remove('expanded')
            sidebarIcons.forEach(icon=>icon.classList.remove('selected'))
        }
    }
})

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

    document.body.classList.remove('fullscreen')

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

// sidebar resize

function resizeElementOnMousemove(ev: MouseEvent, element: HTMLElement, offset = 0) {
    element.style.width = `${ev.clientX + offset}px`
}

function disableSelectableText(status = true) {
    const all = document.querySelector('*') as HTMLElement
    all.style.userSelect = status ? 'none' : null
}

function setCursor(value: string) {
    const all = document.querySelector('*') as HTMLElement
    all.style.cursor = value
}

function resizeSidebar(ev: MouseEvent) {
    disableSelectableText()
    const minWidth = +getComputedStyle(expandableSection).minWidth.replace(/[a-z]+/, '')
    const offset = -50
    if(ev.clientX < minWidth ) {
        expandableSection.style.flexBasis = '3px'
        expandableSection.style.minWidth = '3px'
        expandableSection.style.flexGrow = '0'
        document.addEventListener('mouseup', () => {
            const isOpen = +getComputedStyle(expandableSection).width.replace(/[a-z]+/, '') > 3
            expandableSection.classList.toggle('expanded', isOpen)
            expandableSection.style.flexBasis = null
            expandableSection.style.width = null
            expandableSection.style.minWidth = null
            expandableSection.style.flexGrow = null
            if(!isOpen) {
                sidebarIcons.forEach(icon => icon.classList.remove('selected'))
            }
        }, { once: true })
        return
    }
    else if (ev.movementX > 0 && ev.clientX > minWidth + 200) {
        expandableSection.style.flexBasis = null
        expandableSection.style.minWidth = null
        expandableSection.style.flexGrow = null

    }
    resizeElementOnMousemove(ev, expandableSection, offset)
}

sideBarHandler.addEventListener('mousedown', function() {
    sideBarHandler.classList.add('dragging')
    setCursor('col-resize')
    document.addEventListener('mousemove', resizeSidebar)
})
document.addEventListener('mouseup', function() {
    sideBarHandler.classList.remove('dragging')
    document.removeEventListener('mousemove', resizeSidebar)
    disableSelectableText(false)
    setCursor(null)
})