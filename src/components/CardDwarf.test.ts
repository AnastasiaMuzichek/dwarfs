import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CardDwarf from './CardDwarf.vue';
import { getDwarf } from '../fake-api/dwarfs';

describe('CardDwarf render', () => {
    it('Default render', () => {
        const dwarf = getDwarf(1)!;
        const wrapper = mount(CardDwarf, {
            props: { dwarf },
        });

        expect(wrapper.element).toMatchSnapshot();
    });
});
