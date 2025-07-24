import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CardNew from './CardNew.vue';
import { createDwarf } from '../models/dwarf';

describe('CardNew render', () => {
    it('Default render', () => {
        const dwarf = createDwarf({ id: null });
        const wrapper = mount(CardNew, {
            props: { dwarf },
        });

        expect(wrapper.element).toMatchSnapshot();
    });
});
