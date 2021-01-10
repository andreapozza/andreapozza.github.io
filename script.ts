const sidebarIcons = document.querySelectorAll("#side-bar-small .top .icon")

for (let icon of Array.from(sidebarIcons) as HTMLElement[]) {
    icon.onclick = () => {
        sidebarIcons.forEach(el=>el.classList.remove('selected')) //remove class 'selected' from every icons
        icon.classList.add('selected')
    }
    
}