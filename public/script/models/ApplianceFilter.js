import Filter from "./Filter.js";

class ApplianceFilter extends Filter
{
    constructor(list)
    {
        super(list)
        this.name = 'appareils';
        this.placeholder = 'Appareil';
       
    }

    collect(recipes)
    { 
        this.all = [];
        recipes.forEach(recipe => {
            console.log(recipe.appliance.length());
           
            recipe.appliance.length(() => {
                console.log(appliance);
                let item = appliance.toLowerCase();
                if (!this.all.includes(item)) {
                    this.all.push(item);
                } 
                console.log(this.all);
            })
        })
    }

    // trouver toutes les recettes avec tous les ingrédients séléctionnés
    // filter(recipes)
    // {
    //     let list = [];
    //     if (this.selection.length === 0) {
    //         return recipes;
    //     }
    //     list = this.list.all.filter((recipe) => {
    //         let listIngredients = recipe.ingredients.map((item) =>
    //         item.ingredient.toLowerCase()
    //         );

    //         let count = 0;

    //         this.selection.forEach((ingSelect) => {
    //             if (listIngredients.includes(ingSelect.toLowerCase())) {
    //                 count++;
    //             }
    //         });

    //         if (count == this.selection.length) {
    //             return true;
    //         }
    //         return false;
    //     });

    //     return list;
    // }
}

export default ApplianceFilter;