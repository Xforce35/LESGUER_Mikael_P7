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
            this.all.push(recipe.appliance.toLowerCase());
            // console.log(recipe.appliance);
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
            console.log(recipe.appliance.map(item));
            // let listAppliance = recipe.appliance.map((item) =>
            // item.appliance.toLowerCase()
            // );

            // let count = 0;

            // this.selection.forEach((applianceSelect) => {
            //     if (listAppliance.includes(applianceSelect.toLowerCase())) {
            //         count++;
            //     }
            // });

            // if (count == this.selection.length) {
            //     return true;
            // }
            // return false;
        });

        return list;
    }
}

export default ApplianceFilter;