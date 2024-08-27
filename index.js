import { AppComponent } from "./App.component.js";
import { Liba } from "./LibaJS.js";

const rootElement = document.getElementById("root");

const appInstance = Liba.create(AppComponent);

rootElement.append(appInstance.element);
