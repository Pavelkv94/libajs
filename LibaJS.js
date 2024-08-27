export const Liba = {
    create(ComponentFunction, componentProps = {}) {
        const componentInstance = ComponentFunction(componentProps);

        ComponentFunction.render({ element: componentInstance.element, localState: componentInstance.localState, props: componentInstance.props, liba: Liba });
        return componentInstance;
    },
};
