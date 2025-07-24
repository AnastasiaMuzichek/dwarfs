export function useStorage(key: string) {
    const storage = localStorage;

    return {
        read<T>(): T | null {
            const value = storage.getItem(key);

            if (!value) {
                return null;
            }

            try {
                return JSON.parse(value);
            } catch {
                return null;
            }
        },
        save(value: any) {
            if (typeof value !== 'string') {
                storage.setItem(key, JSON.stringify(value));
            } else {
                storage.setItem(key, value);
            }
        },
    };
}
