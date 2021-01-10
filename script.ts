const sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon")

for (let icon of Array.from(sidebarIcons) as HTMLElement[]) {
    icon.onclick = () => {
        if(icon.classList.contains('selected')) document.getElementById('side-expandable').classList.toggle('expanded')
        else document.getElementById('side-expandable').classList.add('expanded')
        sidebarIcons.forEach(el=>el.classList.remove('selected')) //remove class 'selected' from every icons
        icon.classList.add('selected')
    }
    
}