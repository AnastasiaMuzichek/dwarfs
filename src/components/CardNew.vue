<script setup lang="ts">
import { Card, CardMeta, Button } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import type { PropType } from 'vue';
import type { DwarfValue } from '../models/dwarf';

const emit = defineEmits<{
    (event: 'edit', dwarf: DwarfValue): void;
}>();
defineProps({
    dwarf: {
        required: true,
        type: Object as PropType<DwarfValue>,
    },
});
</script>

<template>
    <Card hoverable style="width: 250px; height: 445px">
        <template #cover>
            <Button @click="emit('edit', dwarf)" type="link">
                <template #icon>
                    <PlusOutlined
                        style="color: rgb(3, 168, 168)"
                    ></PlusOutlined>
                </template>
            </Button>
        </template>
        <CardMeta title="Добавить гнома"> </CardMeta>
    </Card>
</template>

<style scoped lang="less">
:deep(.ant-card-cover .ant-btn) {
    height: 300px;
    width: 100%;
    font-size: 80px;
}
</style>
