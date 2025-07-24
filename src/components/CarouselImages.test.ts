import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CarouselImages from './CarouselImages.vue';

describe('CarouselImages render', () => {
    it('Default render', () => {
        const wrapper = mount(CarouselImages, {
            props: {
                readonly: false,
                value: 'imageDobombor',
            },
        });

        expect(wrapper.element).toMatchSnapshot();
    });
});
