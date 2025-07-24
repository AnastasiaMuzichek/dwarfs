import { createDwarf as createDwarfModel } from '../models/dwarf';
import type { DwarfValue } from '../models/dwarf';
import { dwarfsSkills } from '../constants';
import { getDwarfsImages } from './dwarfs-images';
import { getWeaponsByName } from './weapons';
import { useStorage } from '../hooks/useStorage';

type State = {
    id: number;
    values: DwarfValue[];
};

const KEY_STORAGE = 'dwarfs';

const images = getDwarfsImages();
const weapons = getWeaponsByName();
const { read, save } = useStorage(KEY_STORAGE);
const state: State = {
    id: 6,
    values: [],
};

const dwarfs = [
    createDwarfModel({
        id: 1,
        image: images.imageDolibombr.name,
        name: 'Долибомбор',
        age: 154,
        skill: dwarfsSkills.healer,
        weapon: weapons.bookOfSpells,
        history:
            'Добряк по имени Долибомбр, известный своим искусством целительной магии, вооружен книгой с заклинаниями наполненные природной магией, странствует по лесам и плям, исцеляя больных зверей и даруя надежду заблудшим спутникам.',
    }),
    createDwarfModel({
        id: 2,
        image: images.imageMumbor.name,
        name: 'Мумбор',
        age: 201,
        skill: dwarfsSkills.battlemage,
        weapon: weapons.staff,
        history:
            'Век назад прославился боевой маг, его знания хранят заклинания, тайны разрушительной магии и секретов победы над любым видом врагов. Несмотря на почтеный возраст продолжает совершенствовать свое искусство, защищая путешественников огнеными взрывами и ледяными бурями.',
    }),
    createDwarfModel({
        id: 3,
        image: images.imageNicagor.name,
        name: 'Никагор',
        age: 124,
        skill: dwarfsSkills.hunter,
        weapon: weapons.crossbow,
        history:
            'Молодая гномиха из древнего клана охотников, славится своей медкостью и бесстрашием в лесах родного края. Ее верный друг арбалет, переданный по наследству, помогает добывать самую ловкую дичь, а острый ум и хитрость помогает побеждать даже самых опасных врагов.',
    }),
    createDwarfModel({
        id: 4,
        image: images.imageTanigor.name,
        name: 'Танигор',
        age: 87,
        skill: dwarfsSkills.archer,
        weapon: weapons.bow,
        history:
            'Молодая гномиха Танингор известна своими быстрыми ногами и острым глазом, уверенно держит лук, хотя опыта еще маловато. Любит бананы и размышления о жизни, дерзка и находчивая что и помогает преодолевать любые испытания.',
    }),
    createDwarfModel({
        id: 5,
        image: images.imageDobombor.name,
        name: 'Добомбор',
        age: 154,
        skill: dwarfsSkills.fighter,
        weapon: weapons.axe,
        history:
            'Опытный полководец гномьего войска, прошел десятки сражений бок о бок со своим легендарным топором, закаленным в пламени побед. Веселый нрав и мягкость души делает его любимцем друзей и союзников, несмотря на грозную репутацию непобедимого командира.',
    }),
];

export function getDwarfs() {
    const savedDwarfs = state.values.map(createDwarfModel);
    return [...dwarfs, ...savedDwarfs];
}

export function getDwarf(id: number) {
    const dwarf = getDwarfs().find((d) => d.id === id);
    return dwarf ? createDwarfModel(dwarf) : dwarf;
}

export function createDwarf(dwarf: DwarfValue) {
    if (state.values.length >= 5) {
        throw new Error('Лимит гномов');
    }

    const newDwarf: DwarfValue = { ...dwarf, id: state.id };
    state.id++;
    state.values.push(newDwarf);
    save(state);
    return createDwarfModel(newDwarf);
}

export function updateDwarf(dwarf: DwarfValue) {
    const index = state.values.findIndex((v) => v.id === dwarf.id);

    if (index === -1) {
        throw new Error('Нет гнома дома!');
    }

    const updatedDwarf = state.values[index];

    updatedDwarf.age = dwarf.age;
    updatedDwarf.history = dwarf.history;
    updatedDwarf.image = dwarf.image;
    updatedDwarf.name = dwarf.name;
    updatedDwarf.skill = dwarf.skill;
    updatedDwarf.weapon = dwarf.weapon;

    save(state);

    return createDwarfModel(updatedDwarf);
}

export function deleteDwarf(id: number) {
    const index = state.values.findIndex((v) => v.id === id);

    if (index === -1) {
        throw new Error('Нет гнома дома!');
    }

    state.values.splice(index, 1);

    save(state);
}

function init() {
    const value = read<State>();

    if (value) {
        state.id = value.id;
        state.values = value.values;
    }
}

init();
