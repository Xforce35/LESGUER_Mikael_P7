import { recipes } from "../../data/recipes.js";
import List from "./models/List.js";
import IngFilter from "./models/IngFilter.js";
import ApplianceFilter from "./models/ApplianceFilter.js";

const list = new List();
list.hydrate(recipes);
list.display(list.all);
// console.log(list.all);

let ingFilter = new IngFilter(list);
ingFilter.build();
// ingFilter.collect();
ingFilter.display();
ingFilter.listenForTagSelection();
ingFilter.listenForInput();


let applianceFilter = new ApplianceFilter(list);
applianceFilter.build();
applianceFilter.display();
applianceFilter.listenForTagSelection();
applianceFilter.listenForInput();
