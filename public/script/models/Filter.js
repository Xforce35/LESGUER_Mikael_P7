class Filter
{
    constructor(list)
    {
        this.list = list;
        // une fois que touts les ingrédients sont trouvés, on en fait un tableau
        this.all = []
        // tableau avec tous les tags selectionnés
        this.selection = [];
        // tableau avec tous les tags filtrés
        this.filtered = [];
        this.searchTerm = '';
       
    }
    
    async build()
    {
        await this.dropdown();
        this.buildSelection();
        this.collect(this.list.all);
        this.display();
        // this.showSelection();
        this.openDropdown();
        this.closeDropdown();
        await this.display();
        await this.listenForTagSelection();
        this.listenForInput();
    }

    buildSelection()
    {
        document.getElementById('tagList').innerHTML += `<div id="selection-${this.name}"></div>`;
    }

    closeDropdown()
    {
        document.getElementById(`box-${this.name}`).addEventListener("mouseleave", () => {
            // console.log('on ferme la box');
            document.querySelector(`#box-${this.name} .search`).style.display = "none";
            document.querySelector(`#box-${this.name} .list`).style.display = "none";
            document.querySelector(`#box-${this.name} .title`).style.display = "block";
            document.querySelector(`#box-${this.name} .fa-chevron-down`).style.transform = "rotate(0deg)";
            this.resetSearch();
            this.display();
          });
    }

    async display() {
        // Permets d'afficher les ingrédients dans des li
        let html = ''
        this.all.forEach(tag =>
            {
                let alReadySelected = this.selection.includes(tag);
                // console.log(tag, alReadySelected);
                html += `
                <li class="search-item-${this.name} search-item ${(alReadySelected) ? 'allready-selected' : '' }" data-tag="${tag}">${tag}</li>`
            })
            document.querySelector(`.search-list-${this.name}`).innerHTML = html
    }

    async dropdown() {
        document.getElementById('filters').innerHTML += `
            <div id="box-${this.name}" class="boxList" tabindex="1">
                <span class="list-${this.name} padding title">${this.placeholder}</span>
                <i class="fas fa-chevron-down movechevron"></i>
                <input type="text" name="${this.name}" id="search-${this.name}" class="hide search"
                    placeholder="Rechercher un ${this.placeholder}">
                <div id="list${this.name}" class="list">
                    <ul class="search-list-${this.name}"></ul>
                </div>
            </div>
        `
    }

    listenForInput() {
        document.querySelector(`#search-${this.name}`).addEventListener('input', (e) =>
        {
            if (this.searchTerm.length >= e.target.value.length)
            {
                this.all.forEach(tag =>
                {
                    document.querySelector(`.search-item-${this.name}[data-tag="${tag}"]`).classList.remove('hide');
                })
            }

            this.searchTerm = e.target.value.toLowerCase();
            // // console.log(this.searchTerm);
            this.all.forEach(tag => {
                if (!tag.includes(this.searchTerm))
                {
                    document.querySelector(`.search-item-${this.name}[data-tag="${tag}"]`).classList.add('hide');
                }
           })
        })
    }

    async listenForTagSelection() {
        document.querySelectorAll(`.search-item-${this.name}`).forEach(button =>
            {
                button.addEventListener('click', () =>
                {
                    this.resetSearch();
                    let tag = button.getAttribute('data-tag');
                    if (!this.selection.includes(tag))
                    {
                        this.selection.push(tag);
                    }
                    console.log(tag, this.selection);
                    this.list.filter();
                    this.closeDropdown();
                    // let filteredRecipes = this.filter();
                    // this.list.display(filteredRecipes);
                    // this.collect(filteredRecipes);
                    // this.display();
                    // this.listenForTagSelection();
                    // this.showSelection();
                    // this.listenForTagUnselect();
                })
            })
    }

    listenForTagUnselect() {
        const removeTags = document.querySelectorAll(".tag-box");

        removeTags.forEach(el =>
            {
                el.addEventListener("click", () => 
                {
                    this.resetSearch();
                    let tag = el.getAttribute('data-value');
                    // console.log(tag);
                    let index = this.selection.findIndex(item => item == tag)
                    // console.log(index);
                    this.selection.splice(index, 1);
                    this.list.filter(true);
                    // this.showSelection();
                    // this.listenForTagUnselect();
                    // let a = this.filter(this.list.all);
                    // // console.log('a', a);
                    // this.list.display(a);
                    // this.collect(a);
                    // this.display();
                    // this.listenForTagSelection();
                    // this.listenForInput();
                })
            })
    }

    openDropdown() {
        document.getElementById(`box-${this.name}`).addEventListener("mouseover", () => {
            // console.log('on ouvre la box');
            document.querySelector(`#box-${this.name} .title`).style.display = "none";
            document.querySelector(`#box-${this.name} .list`).style.display = "grid";
            document.querySelector(`#box-${this.name} .search`).style.display = "block";
            document.querySelector(`#box-${this.name} .fa-chevron-down`).style.transform = "rotate(180deg)";
            this.listenForTagSelection();
          });
    }

    resetSearch() {
        this.searchTerm = '';
        document.querySelector(`#search-${this.name}`).value = '';
    }

    showSelection() {
        let html = ''
        this.selection.forEach(tag =>
            {
                 html += `<button class="tag-box tag-${this.name}" type="button" data-type="${this.name}" data-value="${tag}">
                 <span>${tag}</span>
                 <i class="far fa-times-circle fa-lg close-tag"></i>
                 </button>`
            })
        document.getElementById(`selection-${this.name}`).innerHTML = html
    }
}

export default Filter;