import Recipe from "./Recipe.js";

class list
{
    constructor()
    {
        this.all = [];
        this.filtered = [];
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
        document.querySelector("#no-results").style.display = "none";

        let html = '';
        recipes.forEach (recipe =>
            {
                html += recipe.render()
            })
    
            document.getElementById("recipes").innerHTML = html

            if (recipes.length === 0)
            {
                console.log('on doit afficher zero patatte')
                document.querySelector("#no-results").style.display = "block";
            }
    }

    addFilter(filter)
    {
        this.filters.push(filter);
        filter.build()
    }

    filter()
    {
        this.filtered = this.all;
        let search = document.getElementById('search').value.toLowerCase();
        
        if (search.length > 3)
        {
            console.group(search)
            console.time()
            this.filtered = this.searchAlt(search)
            console.timeEnd()
            console.groupEnd(search)
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
            this.filter()
            // console.log(e.target.value);
            // let search = e.target.value.toLowerCase();
            // if (search.length < 3) 
            // {
            //     return
            // }

            // const recipes = this.all;

            // if (this.needle.length <= search.length)
            // {   
                
            //     return (recipes = this.filtered);
                
            // }

            // console.log('a', search.length);
            // this.filtered = this.search(recipes);
            // console.log('B', this.filtered);
            // this.filter();
            
        })
    }

    search(search)
    {
        return this.filtered.filter((recipe) =>
        
        {
            return (
                recipe.name.toLowerCase().includes(search) ||
                recipe.description.toLowerCase().includes(search) ||
                recipe.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(search)) 
                )
        })
            // if (search.length >= 3)
            // {
            //     recipes.filter((recipe) =>
            //     {
            //         return (
            //         recipe.name.toLowerCase().includes(search)
            //         )
            //     })
            // }

            // return false;

        
    }

    searchAlt(search)
    {
        // let final = [];
        // for (let i = 0; i < this.filtered.length; i++)
        // {
        //     let recipe = this.filtered[i];
        //     if (
        //         recipe.name.toLowerCase().includes(search) ||
        //         recipe.description.toLowerCase().includes(search) ||
        //         recipe.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(search))
        //     )
        //     {
        //         final.push(recipe)
        //     }
        // }

        // return final

        let final = [];

        for (let i = 0; i < this.filtered.length; i++)
        {
            // console.log(i);
            let recipe = this.filtered[i];
            if (this.match(recipe, search))
            {
                final.push(recipe);
            }
        }

        // console.log(final);
        return final;
    }

    match(recipe, search)
    {
        if (recipe.name.toLowerCase().includes(search))
            {
                return true;
            }

            if (recipe.description.toLowerCase().includes(search))
            {
                return true;
            }

            // console.log(recipe.ingredients);
            for (let j = 0; j < recipe.ingredients.length; j++)
            {
                let ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                // console.log(ingredient, search, ingredient.includes(search));
                if (ingredient.includes(search))
                {
                    return true;
                }
            }
        return false;
    }
}

export default list;