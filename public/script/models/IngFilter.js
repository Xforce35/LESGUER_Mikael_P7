import Filter from "./Filter.js";

class IngFilter extends Filter
{
    constructor(list)
    {
        super(list)
        this.name = 'ingredients';
        this.placeholder = 'Ingrédient';
        this.color = 'blue';
       
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

    // trouver toutes les recettes avec tous les ingrédients séléctionnés
    filter(recipes)
    {
        let list = [];
        if (this.selection.length === 0) {
            return recipes;
        }
        list = this.list.all.filter((recipe) => {
            let listIngredients = recipe.ingredients.map((item) =>
            item.ingredient.toLowerCase()
            );

            let count = 0;

            this.selection.forEach((ingSelect) => {
                if (listIngredients.includes(ingSelect.toLowerCase())) {
                    count++;
                }
            });

            if (count == this.selection.length) {
                return true;
            }
            return false;
        });

        return list;
    }
}

export default IngFilter;