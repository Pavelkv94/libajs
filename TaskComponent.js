export function TaskComponent(props) {
    console.log("TASK mount");

    const element = document.createElement("li");

    return {
        element,
        // cleanup: () => {},
        props,
    };
}

TaskComponent.render = ({ element, props }) => {
    console.log("TASK render");

    element.append(props.task.title);
    const isDoneElement = document.createElement("input");
    isDoneElement.type = "checkbox";
    isDoneElement.checked = props.task.isDone;

    isDoneElement.addEventListener("change", () => {
        props.setIsDone(props.task.id, isDoneElement.checked);
    });

    element.append(isDoneElement);
};
