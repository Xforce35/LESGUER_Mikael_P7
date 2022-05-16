import Recipe from "./Recipe.js";

class list
{
    constructor()
    {
        this.all = [];
        this.filtered = [];
        this.filters = [];
        this.needle = '';
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
                filter.showSelection();
                filter.listenForTagSelection();                
                filter.listenForTagUnselect();
            })
    }

    listenForSearch() 
    {
        document.getElementById('search').addEventListener('input', (e) => {
            console.log(e.target.value);
            let search = e.target.value.toLowerCase();
            if (search.length < 3) 
            {
                return
            }

            // const recipes = this.all;

            // if (this.needle.length <= search.length)
            // {   
                
            //     return (recipes = this.filtered);
                
            // }

            console.log('a', search.length);
            this.filtered = this.search(recipes);
            console.log('B', this.filtered);
            this.filter();
            
        })
    }

    search(recipes)
    {
        
            if (search.length >= 3)
            {
                recipes.filter((recipe) =>
                {
                    return (
                    recipe.name.toLowerCase().includes(search)
                    )
                })
            }

            return false;

        
    }
}

export default list;