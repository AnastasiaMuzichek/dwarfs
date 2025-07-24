import imageDolibombr from '../assets/images/dwarfs/dolibombr.jpg';
import imageMumbor from '../assets/images/dwarfs/mumbor.jpg';
import imageNicagor from '../assets/images/dwarfs/nicagor.jpg';
import imageTanigor from '../assets/images/dwarfs/tanigor.jpg';
import imageDobombor from '../assets/images/dwarfs/dobombr.jpg';
import imageZifigrig from '../assets/images/dwarfs/zifigrig.jpg';
import imageKirkabor from '../assets/images/dwarfs/kirkabor.jpg';
import imageDwalin from '../assets/images/dwarfs/dwalin.jpg';
import imageTombr from '../assets/images/dwarfs/tombr.jpg';
import imageMagichmig from '../assets/images/dwarfs/magichmig.jpg';

const images = {
    imageDobombor: {
        image: imageDobombor,
        name: 'imageDobombor',
    },
    imageDolibombr: {
        image: imageDolibombr,
        name: 'imageDolibombr',
    },
    imageMumbor: {
        image: imageMumbor,
        name: 'imageMumbor',
    },
    imageNicagor: {
        image: imageNicagor,
        name: 'imageNicagor',
    },
    imageTanigor: {
        image: imageTanigor,
        name: 'imageTanigor',
    },
    imageZifigrig: {
        image: imageZifigrig,
        name: 'imageZifigrig',
    },
    imageKirkabor: {
        image: imageKirkabor,
        name: 'imageKirkabor',
    },
    imageDwalin: {
        image: imageDwalin,
        name: 'imageDwalin',
    },
    imageTombr: {
        image: imageTombr,
        name: 'imageTombr',
    },
    imageMagichmig: {
        image: imageMagichmig,
        name: 'imageMagichmig',
    },
};

export type DwarfImageName = keyof typeof images;

export function getDwarfsImages() {
    return images;
}

export function getDwarfImage(name: DwarfImageName = 'imageDobombor') {
    return images[name] ?? images.imageDobombor;
}
