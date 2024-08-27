export const CounterComponent = (props, { liba }) => {
    console.log("COUNTER mount");

    const element = document.createElement("div");

    const localState = {
        value: 0,
    };

    const interval = setInterval(() => {
        localState.value++;

        liba.refresh(); //ререндер
    }, 1000);

    return {
        element,
        localState,
        cleanup: () => {
            clearInterval(interval);
        },
    };
};

CounterComponent.render = ({ element, localState }) => {
    console.log("COUNTER render");

    element.append(localState.value);
};
