import { TaskComponent } from "./TaskComponent.js";

export const TodoComponent = (props, { liba }) => {
    console.log("TODO mount");

    const element = document.createElement("ul");

    const localState = {
        tasks: [
            { id: 1, title: "JS", isDone: false },
            { id: 2, title: "React", isDone: true },
        ],
        setIsDone(taskId, isDone) {
            localState.tasks = localState.tasks.map((el) => (el.id !== taskId ? el : { ...el, isDone: isDone }));
            liba.refresh();
        },
        childrenComponents: [],
    };

    return {
        element,
        localState,
        // cleanup: () => {}
    };
};

TodoComponent.render = ({ element, localState, liba }) => {
    console.log("TODO render");

    localState.childrenComponents.forEach((component) => {
        component.cleanup?.();
    });
    // localState.childrenComponents = [];

    element.append("todo");

    for (let i = 0; i < localState.tasks.length; i++) {
        const alreadyExistedComponent = localState.childrenComponents[i];
        // if (alreadyExistedComponent) {
        //     if (localState.tasks[i] !== alreadyExistedComponent.props.task) {
        //         alreadyExistedComponent.props.task = localState.tasks[i];
        //         TaskComponent.render({ element: alreadyExistedComponent.element, props: { task: localState.tasks[i], setIsDone: localState.setIsDone } });
        //     }
        //     element.append(alreadyExistedComponent.element);
        // } else {
        const taskInstance = liba.create(TaskComponent, { task: localState.tasks[i], setIsDone: localState.setIsDone });
        element.append(taskInstance.element);
        localState.childrenComponents.push(taskInstance);
        // }
    }
};
