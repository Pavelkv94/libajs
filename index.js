import { AppComponent } from "./App.component.js";


const rootElement = document.getElementById("root");

const appInstance = AppComponent();

rootElement.append(appInstance.element);
