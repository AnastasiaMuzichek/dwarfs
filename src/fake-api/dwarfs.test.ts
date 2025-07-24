import { describe, expect, it } from 'vitest';
import {
    getDwarfs,
    createDwarf,
    getDwarf,
    updateDwarf,
    deleteDwarf,
} from './dwarfs';
import { createDwarf as createDwarfModel } from '../models/dwarf';

describe('Fake-api dwarfs', () => {
    it('Get dwarfs', () => {
        const dwarfs = getDwarfs();

        expect(dwarfs.length).toBe(5);
    });

    it('Create dwarf', () => {
        const data = {
            id: 0,
            image: 'str',
            name: 'Zifigrid',
            age: 123,
            skill: 'archer',
            history: 'History',
            weapon: {
                description: 'Description Weapon',
                image: 'image',
                name: 'Axe',
                value: 'str2',
            },
        };
        const dwarf = createDwarf(data);

        data.id = 6;

        expect(dwarf).toEqual(data);

        const dwarfs = getDwarfs();

        expect(dwarfs.length).toBe(6);
        expect(dwarfs[dwarfs.length - 1]).toEqual(dwarf);

        createDwarf(data);
        createDwarf(data);
        createDwarf(data);
        createDwarf(data);

        expect(() => createDwarf(data)).toThrow('Лимит гномов');
    });

    it('Get dwarf', () => {
        let dwarf = getDwarf(4);

        expect(dwarf).not.toBeUndefined();
        expect(dwarf?.id).toBe(4);
        expect(dwarf?.name).toBe('Танигор');

        dwarf = getDwarf(6);

        expect(dwarf).not.toBeUndefined();
        expect(dwarf?.id).toBe(6);
        expect(dwarf?.name).toBe('Zifigrid');
    });

    it('Update dwarf', () => {
        const dwarf = getDwarf(6) || createDwarfModel({});

        dwarf.age = 321;
        dwarf.name = 'Romahmir';
        dwarf.history += ' dwarf';
        dwarf.skill = 'swordman';
        dwarf.weapon = {
            description: 'Description Sword',
            image: 'image sword',
            name: 'Sword',
            value: 'sword',
        };
        dwarf.image = 'image';

        expect(updateDwarf(dwarf)).toEqual(dwarf);
        expect(getDwarf(6)).toEqual(dwarf);
    });

    it('Delete dwarf', () => {
        const dwarfs = getDwarfs();
        const lastDwarf = dwarfs[dwarfs.length - 1];

        deleteDwarf(lastDwarf.id);

        const numDwarfs = getDwarfs().length;

        expect(numDwarfs).toBe(dwarfs.length - 1);
        expect(() => deleteDwarf(12)).toThrow('Нет гнома дома!');
        expect(() => deleteDwarf(3)).toThrow('Нет гнома дома!');
    });
});
