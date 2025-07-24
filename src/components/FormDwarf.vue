<script setup lang="ts">
import {
    Modal,
    Form,
    FormItem,
    Input,
    InputNumber,
    Select,
    Spin,
} from 'ant-design-vue';
import type { FormInstance, FormProps, SelectProps } from 'ant-design-vue';
import { computed, ref, watch } from 'vue';
import { createDwarf as createDwarfModel } from '../models/dwarf';
import { dwarfsSkills } from '../constants';
import { getWeaponsByName, getWeaponByName } from '../fake-api/weapons';
import CarouselImages from './CarouselImages.vue';
import { useDwarfs } from '../hooks/useDwarfs';

const emit = defineEmits(['cancel', 'change']);
const props = defineProps({
    id: Number,
});

const { getDwarf, loading, createDwarf, updateDwarf } = useDwarfs();

const notEdit = computed(() => {
    if (!props.id) {
        return false;
    } else {
        return props.id <= 5;
    }
});

const weaponsByName = getWeaponsByName();

const optionsSkills: SelectProps['options'] = getSkillsOptions();
const optionsWeapons: SelectProps['options'] = getWeaponsOptions();
const rules: FormProps['rules'] = {
    name: {
        required: true,
        message: 'Нет имени',
    },
    age: {
        required: true,
        validator(_, value: number) {
            return value ? Promise.resolve() : Promise.reject('Нет возраста');
        },
    },
    skill: {
        required: true,
        message: 'Нет специальности',
    },
    weapon: {
        required: true,
        message: 'Нет оружия',
    },
};

const refForm = ref<FormInstance>();
const model = ref(createDwarfModel({}));

function changeWeapons(value: SelectProps['value']) {
    model.value.weapon = getWeaponByName(value?.toString());
}

function getSkillsOptions(): SelectProps['options'] {
    return Object.values(dwarfsSkills).map((s) => ({ label: s, value: s }));
}

function getWeaponsOptions(): SelectProps['options'] {
    return Object.entries(weaponsByName).map(([name, weapon]) => ({
        label: weapon.name,
        value: name,
    }));
}

async function handleOk() {
    if (notEdit.value) {
        emit('cancel');
        return;
    }

    await refForm.value?.validate();
    if (props.id) {
        await updateDwarf(model.value);
    } else {
        await createDwarf(model.value);
    }
    emit('change');
}

watch(
    () => props.id,
    async (id?: number) => {
        if (id !== undefined) {
            if (id) {
                const dwarf = await getDwarf(id);

                if (dwarf) {
                    model.value = dwarf;
                }
            } else {
                model.value = createDwarfModel({ id });
            }
        }
    },
    { immediate: true } // немедленная обработка!
);
</script>

<template>
    <Modal
        @cancel="emit('cancel')"
        @ok="handleOk"
        centered
        :open="props.id !== undefined"
        title="Карточка Гнома"
        :ok-text="notEdit ? 'OK' : 'Сохранить'"
        cancel-text="Закрыть"
    >
        <Spin :spinning="loading">
            <Form :model="model" ref="refForm" :rules="rules">
                <FormItem>
                    <CarouselImages
                        v-model:value="model.image"
                        :readonly="notEdit"
                    ></CarouselImages>
                </FormItem>
                <FormItem label="Имя" name="name">
                    <Input
                        v-model:value="model.name"
                        :readonly="notEdit"
                    ></Input>
                </FormItem>
                <FormItem label="Возраст" name="age">
                    <InputNumber
                        v-model:value="model.age"
                        max="999"
                        min="0"
                        :readonly="notEdit"
                    ></InputNumber>
                </FormItem>
                <FormItem label="Специальность" name="skill">
                    <Input
                        v-if="notEdit"
                        :value="model.skill"
                        :readonly="notEdit"
                    ></Input>
                    <Select
                        v-else
                        :options="optionsSkills"
                        v-model:value="model.skill"
                    ></Select>
                </FormItem>
                <FormItem label="Оружие" name="weapon">
                    <Input
                        v-if="notEdit"
                        :value="model.weapon?.name"
                        :readonly="notEdit"
                    ></Input>
                    <Select
                        v-else
                        @change="changeWeapons"
                        :options="optionsWeapons"
                        :value="model.weapon?.value"
                    >
                    </Select>
                </FormItem>
                <FormItem label="История" name="history">
                    <Input.TextArea
                        v-model:value="model.history"
                        :readonly="notEdit"
                    ></Input.TextArea>
                </FormItem>
            </Form>
        </Spin>
    </Modal>
</template>

<style scoped>
:deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: rgb(2, 1, 5);
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #05e274;
    opacity: 0.5;
}

:deep(.slick-slide h3) {
    color: #fff;
}
</style>
