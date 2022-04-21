class Recipe
{
    constructor(data)
    {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
        this.picture = `public/assets/plat.jpg`;

        
    }

    render()
    {
        

        return `
        <div class="article-recipes" id=${this.id} tabindex="1">
            <img src="${this.picture}" alt="photo de la recette" class="plate">
                <div class="card">
                    <div class="header-recipe">
                        <h5 class="name-recipe" title="${this.name}" tabindex="1">${this.name}</h5>
                        <div>
                            <p class="time" tabindex="1"><i class="far fa-clock"></i>${this.time} min</p>   
                        </div>
                    </div>
                    <div class="body-recipe">
                        ${this.renderIngredients(this.ingredients)} 
                        <p class="card-text description">${this.description}</p>
                    </div>
                </div>
        </div>`;
    }

    renderIngredients (ingredients)
    {
        let html = '<ul class="recipe-ingredients">'

        ingredients.forEach((ingredient) => {
            let unit = ingredient.unit ?? '';
            
            html += `<li><strong>${ingredient.ingredient}:</strong> ${ingredient.quantity} ${unit}</li>`;
            });

            html += '</ul>'

            return html;
    }
    
}

export default Recipe;