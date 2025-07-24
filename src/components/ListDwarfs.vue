<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import type { Ref, ShallowRef } from 'vue';
import CardDwarf from './CardDwarf.vue';
import CardNew from './CardNew.vue';
import { Carousel, Col, Row, Spin } from 'ant-design-vue';
import FormDwarf from './FormDwarf.vue';
import type { DwarfValue } from '../models/dwarf';
import { createDwarf } from '../models/dwarf';
import { useDwarfs } from '../hooks/useDwarfs';

const { deleteDwarf, getDwarfs, loading } = useDwarfs();

const dwarfs: Ref<DwarfValue[]> = ref([]);

const selectedDwarf: ShallowRef<DwarfValue | undefined> = shallowRef();

const displayedDwarfs = computed(() => {
    const packsDwarfs = [];

    for (let i = 0; i < Math.ceil(dwarfs.value.length / 3); i++) {
        packsDwarfs.push(dwarfs.value.slice(i * 3, (i + 1) * 3));
    }

    const newDwarf = createDwarf({ id: null });

    if (dwarfs.value.length < 10) {
        if (dwarfs.value.length % 3) {
            packsDwarfs[packsDwarfs.length - 1].push(newDwarf);
        } else {
            packsDwarfs.push([newDwarf]);
        }
    }

    return packsDwarfs;
});

function editDwarf(dwarf: DwarfValue) {
    selectedDwarf.value = dwarf;
}

function handleChange() {
    if (selectedDwarf.value) {
        selectedDwarf.value = undefined;
    }

    loadDwarfs();
}

async function loadDwarfs() {
    dwarfs.value = await getDwarfs();
}

async function removeDwarf(dwarf: DwarfValue) {
    await deleteDwarf(dwarf.id);
    loadDwarfs();
}

loadDwarfs();
</script>

<template>
    <main>
        <Spin :spinning="loading">
            <Carousel>
                <div v-for="(pack, idx) in displayedDwarfs" :key="idx">
                    <Row justify="space-around">
                        <Col v-for="dwarf in pack">
                            <CardDwarf
                                v-if="dwarf.id"
                                @edit="editDwarf"
                                @remove="removeDwarf"
                                :dwarf="dwarf"
                                :key="dwarf.id"
                            ></CardDwarf>
                            <CardNew
                                v-else
                                @edit="editDwarf"
                                :dwarf="dwarf"
                            ></CardNew>
                        </Col>
                    </Row>
                </div>
            </Carousel>
            <FormDwarf
                @cancel="selectedDwarf = undefined"
                @change="handleChange"
                :id="selectedDwarf?.id"
            ></FormDwarf>
        </Spin>
    </main>
</template>

<style scoped>
main {
    height: calc(100% - 120px);
    overflow: hidden;
}

:deep(.slick-slide) {
    text-align: center;
    height: 500px;
    overflow: hidden;
}
</style>
