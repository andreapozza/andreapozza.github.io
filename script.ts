const sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon")
const expandableSection = document.getElementById('side-expandable')
const expandableSectionTitle = expandableSection.querySelector('p.title') as HTMLElement
const tabs = document.querySelectorAll("#tabs .tab")

for (let icon of Array.from(sidebarIcons) as HTMLElement[]) {
    icon.onclick = () => {


        if(icon.classList.contains('selected')) expandableSection.classList.toggle('expanded')
        else expandableSection.classList.add('expanded')
        sidebarIcons.forEach(el=>el.classList.remove('selected')) //remove class 'selected' from every icons
        icon.classList.add('selected')

        expandableSectionTitle.innerText = icon.dataset.title
    }
    
}

for (let tab of Array.from(tabs) as HTMLElement[]) {
    tab.onclick = () => {

        tabs.forEach(el=>el.classList.remove('selected'))
        tab.classList.add('selected')
    }
}

if(screen.width <= 425) expandableSection.classList.remove("expanded")