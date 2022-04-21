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

    collect(recipes)
    { 
        this.all = [];
        recipes.forEach(recipe => {
            // console.log(recipe);
            recipe.ingredients.forEach((ingredient) => {
                // console.log(ingredient);
                let item = ingredient.ingredient.toLowerCase();
                if (!this.all.includes(item)) {
                    this.all.push(item);
                }
            })
        })
    }

    listenForInput() {
        document.querySelector(`#search-${this.name}`).addEventListener('input', (e) =>
        {
            if (this.searchTerm.length >= e.target.value.length)
            {
                this.all.forEach(tag =>
                {
                    document.querySelector(`.search-item-${this.name}[data-tag="${tag}"]`).classList.remove('hidden');
                })
            }

            this.searchTerm = e.target.value.toLowerCase();
            // // console.log(this.searchTerm);
            this.all.forEach(tag => {
                if (!tag.includes(this.searchTerm))
                {
                    document.querySelector(`.search-item-${this.name}[data-tag="${tag}"]`).classList.add('hidden');
                }
           })
        })
    }

    listenForTagSelection()
    {
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
                    let filteredRecipes = this.filter();
                    this.list.display(filteredRecipes);
                    this.collect(filteredRecipes);
                    this.display();
                    this.listenForTagSelection();
                    this.showSelection();
                    this.listenForTagUnselect();
                })
            })
    }

    resetSearch() {
        this.searchTerm = '';
        document.querySelector(`#search-${this.name}`).value = '';
    }

    display()
    {
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

    build()
    {
        this.dropdown();
        this.buildSelection();
        this.collect(this.list.all);
        this.display();
        // this.showSelection();
        this.openDropdown();
        this.closeDropdown();
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

    buildSelection()
    {
        document.getElementById('tagList').innerHTML += `<div id="selection-${this.name}"></div>`;
    }

    listenForTagUnselect() {
        const removeTags = document.querySelectorAll(".tag-box");

        removeTags.forEach(el =>
            {
                el.addEventListener("click", () => 
                {
                    let tag = el.getAttribute('data-value');
                    // console.log(tag);
                    let index = this.selection.findIndex(item => item == tag)
                    // console.log(index);
                    this.selection.splice(index, 1);
                    this.showSelection();
                    this.listenForTagUnselect();
                    let a = this.filter(this.list.all);
                    // console.log('a', a);
                    this.list.display(a);
                    this.collect(a);
                    this.display();
                    this.listenForTagSelection();
                    this.listenForInput();
                })
            })
      }

    openDropdown()
    {
        document.getElementById(`box-${this.name}`).addEventListener("mouseover", () => {
            // console.log('on ouvre la box');
            document.querySelectorAll(".title")[0].style.display = "none";
            document.querySelectorAll(".list")[0].style.display = "grid";
            document.querySelectorAll(".search")[0].style.display = "block";
            document.querySelectorAll(".fa-chevron-down")[0].style.transform = "rotate(180deg)";
          });
    }

    closeDropdown()
    {
        document.getElementById(`box-${this.name}`).addEventListener("mouseleave", () => {
            // console.log('on ferme la box');
            document.querySelectorAll(".hide")[0].style.display = "none";
            document.querySelectorAll(".list")[0].style.display = "none";
            document.querySelectorAll(".title")[0].style.display = "block";
            document.querySelectorAll(".fa-chevron-down")[0].style.transform = "rotate(0deg)";
          });
    }

    dropdown()
    {
        document.getElementById('filters').innerHTML += `
        <div id="box-${this.name}" class="boxList" tabindex="1">
                <span class="list-${this.name} padding title">${this.placeholder}</span>
                    <i class="fas fa-chevron-down movechevron">
                    </i>
                    <input type="text" name="${this.name}" id="search-${this.name}" class="hide search"
                            placeholder="Rechercher un ${this.placeholder}">
                <div id="list${this.name}" class="list">
                    <ul class="search-list-${this.name}"></ul>
                </div>
        </div>
        `
    }
}

export default Filter;