import { TaskComponent } from "./TaskComponent.js";

export const TodoComponent = () => {
    console.log("TODO mount");

    const element = document.createElement("ul");

    const localState = {
        tasks: [
            { id: 1, title: "JS", isDone: false },
            { id: 2, title: "React", isDone: true },
        ],
        setIsDone(taskId, isDone) {
            localState.tasks = localState.tasks.map((el) => (el.id !== taskId ? el : { ...el, isDone: isDone }));
            TodoComponent.render({ element, localState });
        },
    };

    TodoComponent.render({ element, localState });
    return {
        element,
        localState,
        // cleanup: () => {}
    };
};

TodoComponent.render = ({ element, localState }) => {
    console.log("TODO render");

    element.innerHTML = "";

    element.append("todo");

    for (let task of localState.tasks) {
        const taskInstance = TaskComponent({ task, setIsDone: localState.setIsDone });
        element.append(taskInstance.element);
    }
};
