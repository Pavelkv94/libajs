import { CounterComponent } from "./CounterComponent.js";
import { TodoComponent } from "./TodoComponent.js";

export const AppComponent = () => {
    console.log("APP mount");

    const element = document.createElement("div");

    const localState = {
        page: "todo",
    };

    return {
        element,
        localState,
        // cleanup: () => {

        // }
    };
};

AppComponent.render = ({ element, localState, liba }) => {
    console.log("APP render");

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
        liba.refresh(); //ререндер
    });

    switch (localState.page) {
        case "counter": {
            const counterInstance = liba.create(CounterComponent); //создание и первый рендер
            element.append("Hello");
            element.append(counterInstance.element);
            break;
        }
        case "todo": {
            const todoInstance = liba.create(TodoComponent); //создание и первый рендер
            element.append("Todo");
            element.append(todoInstance.element);
            break;
        }
    }
};
