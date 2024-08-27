export const Liba = {
    create(ComponentFunction, componentProps = {}) {

        const renderLiba = {
            create: Liba.create,
            //добавляем метод refresh чтобы он был доступен везде кроме первого рендера(иначе бы добавили его глобально)
            refresh() {
                //todo if element doesn't have innerHTML?
                componentInstance.element.innerHTML = "";

                renderComponent(); //ререндер
            },
        };
        const componentInstance = ComponentFunction(componentProps, {liba: renderLiba});

        function renderComponent() {
            ComponentFunction.render({
                element: componentInstance.element,
                localState: componentInstance.localState,
                props: componentInstance.props,
                liba: renderLiba,
            });
        }

        renderComponent(); //первый рендер

        return componentInstance;
    },
};
