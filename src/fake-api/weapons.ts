import { createWeapon } from '../models/weapon';
import type { WeaponValue } from '../models/weapon';
import imageAxe from '../assets/images/weapons/axe.png';
import imageStaff from '../assets/images/weapons/staff.png';
import imageShield from '../assets/images/weapons/shield.png';
import imageCrossbow from '../assets/images/weapons/crossbow.png';
import imagePick from '../assets/images/weapons/pick.png';
import imageBookOfSpells from '../assets/images/weapons/bookOfSpell.png';
import imageOnion from '../assets/images/weapons/onion.png';
import imageSword from '../assets/images/weapons/sword.png';
import imageLadle from '../assets/images/weapons/ladle.png';
import imagePan from '../assets/images/weapons/pan.png';
import { weaponsName } from '../constants';

const weaponsByName: Record<string, WeaponValue> = {
    sword: createWeapon({
        description:
            'оружие предназначенное для рубящих и колющих ударов, незаменим в бою против любого противника (кроме слизи)',
        image: imageSword,
        name: weaponsName.sword, // меч
        value: 'sword',
    }),
    axe: createWeapon({
        description:
            'часто используется в сельском хозяйстве для обработки полей и укладки заготовок для зимнего периода, но так же незаменима в бою, выглядит максимально устрашающе и брутально',
        image: imageAxe,
        name: weaponsName.axe, // топор
        value: 'axe',
    }),
    staff: createWeapon({
        description:
            'удобное оружие особенно если ты обладаешь способностями к разной магии, увеличивает силу магических заклинаний, а так же дает возможность совмещать разного вида магию, если магии нет то хорошая дубинка',
        image: imageStaff,
        name: weaponsName.staff, //посох
        value: 'staff',
    }),
    bookOfSpells: createWeapon({
        description:
            'полезно если обучен грамоте и магическим искусствам, обычно передаётся по наследству от отца к 3 - сыну,  говорят что в каждой семье свой вид магических заклинаний, все зависит от родовых способностей',
        image: imageBookOfSpells,
        name: weaponsName.bookOfSpells, //Книга заклинаний
        value: 'bookOfSpells',
    }),
    ladle: createWeapon({
        description:
            'самое редкое и ценное орудие, но только в руках опытного мастера, и покушать приготовить и пивка налить, а если надо то и глазки выковыривать можно, так же обладает невероятной прочностью',
        image: imageLadle,
        name: weaponsName.ladle, //Половник
        value: 'ladle',
    }),
    bow: createWeapon({
        description:
            'не самый популярный вид оружия, используется на расстоянии, удобно пока хватает стрел (максимум 50), обычно тетива постоянно дергает бороду, оружие молодого поколения ',
        image: imageOnion, //переим. картинку
        name: weaponsName.bow, //Лук
        value: 'bow',
    }),
    crossbow: createWeapon({
        description:
            'круче лука в 100 раз, необходима стрел меньшего размера что увеличивает боевой запас орудий, быстр в перезарядке имеет превосходную точность ',
        image: imageCrossbow,
        name: weaponsName.crossbow, //Арбалет
        value: 'crossbow',
    }),
    shield: createWeapon({
        description:
            'служит защитой от любого вида атак противника, так же если щит имеет небольшой размер можно использовать в качестве оружия нападения, а если и научиться можно кидать в противников ',
        image: imageShield,
        name: weaponsName.shield, //Щит
        value: 'shield',
    }),
    pick: createWeapon({
        description:
            'орудие искателей алмазов и не только, опасен в использование, пробивает кости и камни, а так же тяжелые материалы что помогает в добыче полезных ископаемых ',
        image: imagePick,
        name: weaponsName.pick, //Кирка
        value: 'pick',
    }),
    pan: createWeapon({
        description:
            'оружие массового уничтожения, в бою хороша но все же лучше использовать по назначению, приготовление различных блюд, разнообразие велико от супа до зажарки и пива',
        image: imagePan,
        name: weaponsName.pan, //Сковорода
        value: 'pan',
    }),
};

export function getWeapons() {
    return Object.values(weaponsByName);
}

export function getWeaponsByName() {
    return weaponsByName;
}

export function getWeaponByName(name: string = 'axe') {
    return weaponsByName[name] ?? weaponsByName.axe;
}
