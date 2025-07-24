import { shallowRef } from 'vue';
import type { DwarfValue } from '../models/dwarf';
import {
    getDwarf,
    getDwarfs,
    createDwarf,
    updateDwarf,
    deleteDwarf,
} from '../fake-api/dwarfs';

function delay(ms: number) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function useDwarfs() {
    const loading = shallowRef(false);

    return {
        async createDwarf(dwarf: DwarfValue) {
            loading.value = true;
            await delay(100);
            loading.value = false;
            return createDwarf(dwarf);
        },
        async deleteDwarf(id: number) {
            loading.value = true;
            await delay(100);
            loading.value = false;
            return deleteDwarf(id);
        },
        async getDwarf(id: number) {
            loading.value = true;
            await delay(100);
            loading.value = false;
            return getDwarf(id);
        },
        async getDwarfs() {
            loading.value = true;
            await delay(300);
            loading.value = false;
            return getDwarfs();
        },
        async updateDwarf(dwarf: DwarfValue) {
            loading.value = true;
            await delay(100);
            loading.value = false;
            return updateDwarf(dwarf);
        },
        loading,
    };
}
