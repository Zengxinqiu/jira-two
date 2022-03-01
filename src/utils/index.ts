import {
    useEffect,
    useRef,
    useState
} from "react"

export const isFalsy = (value: any) => (value === 0 ? false : !value)

export const isViod = (value: unknown) => value === undefined || value === null || value === ""


export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = {
        ...object
    }
    Object.keys(object).forEach((key) => {

        const value = result[key]
        if (isViod(value)) {

            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debouncedValue
}


export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value];
            copy.splice(index, 1);
            setValue(copy);
        }
    }

}

export const useDocumentTitle = (title: string, keepOnUnmount: true) => {
    const oldTitle = useRef(document.title).current;

    useEffect(() => {
        document.title = title;
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle;
            }
        };
    }, [keepOnUnmount, oldTitle])
}

export const resetRoute = () => (window.location.href = window.location.origin);


/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
    O extends { [key in string]: unknown },
    K extends keyof O
>(
    obj: O,
    keys: K[]
) => {
    const filteredEntries = Object.entries(obj).filter(([key]) =>
        keys.includes(key as K)
    );
    return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之返回true
 * */

export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
    })
    return mountedRef
}