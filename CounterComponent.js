export const CounterComponent = () => {
  console.log("COUNTER mount");

    const element = document.createElement("div");

    const localState = {
        value: 0,
    };

    const interval = setInterval(() => {
        localState.value++;
        CounterComponent.render({ element, localState });
    }, 1000);

    CounterComponent.render({ element, localState });

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

    element.innerHTML = "";

    element.append(localState.value);
};
