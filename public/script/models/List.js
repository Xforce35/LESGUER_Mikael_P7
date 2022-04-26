import Recipe from "./Recipe.js";

class list
{
    constructor()
    {
        this.all = [];
        this.filters = [];
    }

    hydrate(recipes)
    {
        recipes.forEach (item =>{
            let recipe = new Recipe (item);
            this.all.push(recipe)
        })
    }

    display(recipes)
    {
        let html = '';
        recipes.forEach (recipe =>
            {
                html += recipe.render()
            })
    
            document.getElementById("recipes").innerHTML = html
    }

    addFilter(filter)
    {
        this.filters.push(filter);
        filter.build()
    }

    filter()
    {
        //this.filters.
    }
}

export default list;