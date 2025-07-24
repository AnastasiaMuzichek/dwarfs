export type WeaponValue = {
    description: string;
    image: string;
    name: string;
    value: string;
};

export function createWeapon(data: Record<string, any>): WeaponValue {
    return {
        description: data.description,
        image: data.image,
        name: data.name,
        value: data.value,
    };
}
