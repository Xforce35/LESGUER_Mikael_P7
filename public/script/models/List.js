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
        this.filtered = this.all;
        let search = document.getElementById('search').value.toLowerCase();
        let MsgNoResult = document.querySelector("#no-results")

        

        if (search.length > 3)
        {
            this.filtered = this.search(search)
            console.log('Recettes Trouvé');
            MsgNoResult.style.display = "none";
            return true;
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
        console.log('Aucune recettes');
        MsgNoResult.style.display = "block";
        return false;
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
                recipe.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(search)) ||
                recipe.ustensils.find((ustensils) => ustensils.toLowerCase().includes(search)) ||
                recipe.appliance.toLowerCase().includes(search)
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
}

export default list;