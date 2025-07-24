import { describe, expect, it } from 'vitest';
import { getWeaponByName, getWeapons, getWeaponsByName } from './weapons';
import { weaponsName } from '../constants';

describe('Fake-api dwarfs images', () => {
    it('Get weapons', () => {
        const weapons = getWeapons();
        const weaponsByName = getWeaponsByName();

        expect(weapons.length).toBe(10);
        expect(weaponsByName.sword.name).toBe(weaponsName.sword);
        expect(weaponsByName.sword.value).toBe('sword');
    });

    it('Get weapon', () => {
        let weapon = getWeaponByName();

        expect(weapon.name).toBe(weaponsName.axe);
        expect(weapon.value).toBe('axe');

        weapon = getWeaponByName('staff');

        expect(weapon.name).toBe(weaponsName.staff);
        expect(weapon.value).toBe('staff');
    });
});
