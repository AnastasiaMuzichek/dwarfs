import type { WeaponValue } from './weapon';

export type DwarfValue = {
    id: number;
    image: string;
    name: string;
    age: number;
    skill: string;
    history: string;
    weapon: WeaponValue;
};

export function createDwarf(data: Record<string, any>): DwarfValue {
    return {
        id: data.id,
        image: data.image,
        name: data.name,
        age: data.age || 0,
        skill: data.skill,
        history: data.history,
        weapon: data.weapon,
    };
}
