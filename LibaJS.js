function ensureChildren(parent) {
    if (parent) {
        if (!parent.childrenComponents) {
            parent.childrenComponents = [];
        }
    }
}

//FROM GPT
function propsTheSame(prevProps, newProps) {
    if (prevProps === newProps) return true;

    if ((prevProps == null && newProps != null) || (prevProps != null && newProps == null)) {
        return false;
    }

    const prevKeys = Object.keys(prevProps || {});
    const newKeys = Object.keys(newProps || {});

    if (prevKeys.length !== newKeys.length) {
        return false;
    }

    for (let key of prevKeys) {
        if (prevProps[key] !== newProps[key]) {
            return false;
        }
    }

    return true;
}

export const Liba = {
    create(ComponentFunction, componentProps = {}, { parent } = { parent: null }) {
        //для использование обьекта либы в рендер методе
        const renderLiba = {
            create: (childrenComponentFunction, props = {}) => {
                componentInstance.childrenIndex++;

                const alreadyExistedComponentInstance = componentInstance.childrenComponents?.[componentInstance.childrenIndex];

                if (alreadyExistedComponentInstance) {
                    // если другой тип компонента то зачистить кэш
                    if (alreadyExistedComponentInstance.type === childrenComponentFunction) {
                        //если те же пропсы то возвращаем инстанс
                        if (propsTheSame(props, alreadyExistedComponentInstance.props)) {
                            return alreadyExistedComponentInstance;
                        } else {
                            alreadyExistedComponentInstance.props = props;
                            //рендерим если пропсы другие
                            alreadyExistedComponentInstance.refresh();

                            return alreadyExistedComponentInstance;
                        }
                    } else {
                        delete componentInstance.childrenComponents[componentInstance.childrenIndex];
                    }
                }

                const childInstance = Liba.create(childrenComponentFunction, props, { parent: componentInstance });

                return childInstance;
            },
            //добавляем метод refresh чтобы он был доступен везде кроме первого рендера(иначе бы добавили его глобально)
            refresh() {
                //todo if element doesn't have innerHTML?
                componentInstance.element.innerHTML = "";

                componentInstance.childrenComponents?.forEach((cc) => cc.cleanup?.()); // перенесли вызовы cleanup в либу
                // componentInstance.childrenComponents = [];

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

        componentInstance.refresh = renderLiba.refresh;

        if (parent) {
            ensureChildren(parent);
            parent.childrenComponents[parent.childrenIndex] = componentInstance;
        }

        function renderComponent() {
            componentInstance.childrenIndex = -1;

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
