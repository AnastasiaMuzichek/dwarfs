<script setup lang="ts">
import { Carousel, Row } from 'ant-design-vue';
import { onMounted, shallowRef, watch } from 'vue';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { getDwarfsImages, getDwarfImage } from '../fake-api/dwarfs-images';
import type { DwarfImageName } from '../fake-api/dwarfs-images';

const value = defineModel<string>('value');

const props = defineProps({
    readonly: Boolean,
});

const imagesByName = getDwarfsImages();
const imagesNames = Object.keys(imagesByName);

const index = shallowRef(0);
const refCarousel = shallowRef();

function next() {
    index.value++;

    if (index.value >= imagesNames.length) {
        index.value = 0;
    }

    value.value = imagesNames[index.value];
}

function prev() {
    index.value--;

    if (index.value < 0) {
        index.value = imagesNames.length - 1;
    }

    value.value = imagesNames[index.value];
}

onMounted(() => {
    watch(
        value,
        (value?: string) => {
            if (value) {
                index.value = imagesNames.indexOf(value);

                if (index.value === -1) {
                    index.value = 0;
                }
            } else {
                index.value = 0;
            }

            refCarousel.value?.goTo(index.value);
        },
        { immediate: true }
    );
});
</script>
<template>
    <Carousel ref="refCarousel" :arrows="!props.readonly" :dots="false">
        <template #prevArrow>
            <div
                @click="prev"
                class="custom-slick-arrow"
                style="left: 10px; z-index: 1"
            >
                <LeftCircleOutlined />
            </div>
        </template>
        <template #nextArrow>
            <div @click="next" class="custom-slick-arrow" style="right: 10px">
                <RightCircleOutlined />
            </div>
        </template>
        <div v-for="name in imagesNames">
            <Row justify="center">
                <img
                    :src="getDwarfImage(name as DwarfImageName).image"
                    style="height: 100px"
                />
            </Row>
        </div>
    </Carousel>
</template>
<style></style>
