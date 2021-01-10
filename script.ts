const sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon")

for (let icon of Array.from(sidebarIcons) as HTMLElement[]) {
    icon.onclick = () => {
        
        const expandableSection = document.getElementById('side-expandable')
        const expandableSectionTitle = expandableSection.querySelector('p.title') as HTMLElement

        if(icon.classList.contains('selected')) expandableSection.classList.toggle('expanded')
        else expandableSection.classList.add('expanded')
        sidebarIcons.forEach(el=>el.classList.remove('selected')) //remove class 'selected' from every icons
        icon.classList.add('selected')

        expandableSectionTitle.innerText = icon.dataset.title
    }
    
}