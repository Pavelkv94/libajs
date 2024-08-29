function ensureChildren(parent) {
    if (parent) {
        if (!parent.childrenComponents) {
            parent.childrenComponents = [];
        }
    }
}

export const Liba = {
    create(ComponentFunction, componentProps = {}, { parent } = { parent: null }) {
        //для использование обьекта либы в рендер методе
        const renderLiba = {
            create: (childrenComponentFunction, props = {}) => {
                const childInstance = Liba.create(childrenComponentFunction, props, { parent: componentInstance });
                return childInstance;
            },
            //добавляем метод refresh чтобы он был доступен везде кроме первого рендера(иначе бы добавили его глобально)
            refresh() {
                //todo if element doesn't have innerHTML?
                componentInstance.element.innerHTML = "";

                componentInstance.childrenComponents?.forEach((cc) => cc.cleanup?.()); // перенесли вызовы cleanup в либу

                renderComponent(); //ререндер
            },
        };

        //для использование обьекта либы в компоненте
        const componentLiba = {
            //добавляем метод refresh чтобы он был доступен везде кроме первого рендера(иначе бы добавили его глобально)
            refresh: renderLiba.refresh,
        };

        const componentInstance = ComponentFunction(componentProps, { liba: componentLiba });

        componentInstance.type = ComponentFunction; // для дебага(отслеживания типа компонента)

        if (parent) {
            ensureChildren(parent);
            parent.childrenComponents.push(componentInstance);
        }

        function renderComponent() {
            ComponentFunction.render({
                element: componentInstance.element,
                localState: componentInstance.localState,
                props: componentInstance.props,
                liba: renderLiba,
            });
        }

        componentInstance.childrenComponents?.forEach((cc) => cc.cleanup?.());
        componentInstance.childrenComponents = [];

        renderComponent(); //первый рендер

        return componentInstance;
    },
};
