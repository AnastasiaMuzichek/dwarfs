import { describe, expect, it } from 'vitest';
import { getDwarfImage, getDwarfsImages } from './dwarfs-images';

describe('Fake-api dwarfs images', () => {
    it('Get dwarfs images', () => {
        const images = getDwarfsImages();

        expect(Object.values(images).length).toBe(10);
        expect(images.imageDobombor.name).toBe('imageDobombor');
    });

    it('Get dwarf image', () => {
        let dwarfImage = getDwarfImage();

        expect(dwarfImage.name).toBe('imageDobombor');

        dwarfImage = getDwarfImage('imageMumbor');

        expect(dwarfImage.name).toBe('imageMumbor');
    });
});
