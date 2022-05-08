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

        this.filtered = this.all;
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

    filter(isUnselect = false)
    {
        if (isUnselect)
        {
            this.filtered = this.all;
        }

        this.filters.forEach(filter => 
            {
                // console.log(filter);
                this.filtered = filter.filter(this.filtered);
                // console.log(filter.name ,this.filtered);
            })
            
            this.display(this.filtered);

            this.filters.forEach(filter => 
                {
                filter.collect(this.filtered);
                filter.display();
                filter.listenForTagSelection();
                filter.showSelection();
                filter.listenForTagUnselect();
                })
    }
}

export default list;