const sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon")
const expandableSection = document.getElementById('side-expandable')
const expandableSectionTitle = expandableSection.querySelector('p.title') as HTMLElement
const tabs = document.querySelectorAll("#tabs .tab")
const indexJS = document.getElementById('index-js')
const indexPHP = document.getElementById('index-php')
const documents = document.getElementsByClassName('document')

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
        }
    }
    
}

for (let tab of Array.from(tabs) as HTMLElement[]) {
    tab.onclick = () => {

        tabs.forEach(el=>el.classList.remove('selected'))
        tab.classList.add('selected')

        Array.from(document.getElementsByClassName('page')).forEach(page => { page.classList.add('hidden') });
        document.getElementById(tab.dataset.page).classList.remove('hidden')
    }
}

if(screen.width <= 425) {
    expandableSection.classList.remove("expanded")
    document.querySelectorAll("#side-bar-small .top .icon")[0].classList.remove('selected')
}

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

    for (let doc of Array.from(documents) as HTMLElement[]) {
        if (doc.dataset.page == page) doc.classList.add('selected')
        else doc.classList.remove('selected')
    }

}