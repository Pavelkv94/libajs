import { CounterComponent } from "./CounterComponent.js";
import { TodoComponent } from "./TodoComponent.js";

export const AppComponent = () => {
  console.log("APP mount");
  
    const element = document.createElement("div");

    const localState = {
        page: "todo",
        childrenComponents: [],
    };

    AppComponent.render({ element, localState });

    return {
        element,
        localState,
        // cleanup: () => {

        // }
    };
};

AppComponent.render = ({ element, localState }) => {
  console.log("APP render");

    element.innerHTML = "";

    localState.childrenComponents.forEach((component) => {
        component.cleanup?.();
    });
    localState.childrenComponents = [];
    
    const pageSelector = document.createElement("select");
    const counterPageOption = document.createElement("option");
    counterPageOption.append("counter page");
    counterPageOption.value = "counter";

    const todoPageOption = document.createElement("option");
    todoPageOption.append("todo page");
    todoPageOption.value = "todo";

    pageSelector.append(counterPageOption, todoPageOption);

    pageSelector.value = localState.page;

    element.append(pageSelector);

    pageSelector.addEventListener("change", () => {
        localState.page = pageSelector.value;
        AppComponent.render({ element, localState });
    });

    switch (localState.page) {
        case "counter": {
            const counterInstance = CounterComponent();
            localState.childrenComponents.push(counterInstance);
            element.append("Hello");
            element.append(counterInstance.element);
            break;
        }
        case "todo": {
            const todoInstance = TodoComponent();
            localState.childrenComponents.push(todoInstance);
            element.append("Todo");
            element.append(todoInstance.element);
            break;
        }
    }
};