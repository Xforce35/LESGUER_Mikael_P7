import Recipe from "./Recipe.js";

class list
{
    constructor()
    {
        this.all = [];
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

    // listIngredient(recipes)
    // {
    //     let listIngr = []
    //     recipes.forEach (recipe => {
    //         recipe.ingredients.forEach((ingredient) => {
    //             let item = ingredient.ingredient.toLowerCase();
    //             if (!listIngr.includes(item)) {
    //                 listIngr.push(item);
    //             }
    //             console.log(item, listIngr);
    //         })
    //     })
    // }
}

export default list;