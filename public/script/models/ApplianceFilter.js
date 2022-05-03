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
            let item = recipe.appliance.toLowerCase()
            if (!this.all.includes(item)) {
                this.all.push(item);
            }
        })
    }

    // trouver toutes les recettes avec l'appareil séléctionné
    filter(recipes)
    {
        let list = [];
        if (this.selection.length === 0) {
            return recipes;
        }
        list = this.list.all.filter((recipe) => {
            let listAppliance = recipe.appliance.toLowerCase();

            let count = 0;

            this.selection.forEach((applianceSelect) => {
                if (listAppliance.includes(applianceSelect.toLowerCase())) {
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

export default ApplianceFilter;