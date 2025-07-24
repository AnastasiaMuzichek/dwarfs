<script setup lang="ts">
import { Card, CardMeta, Tooltip, Row, Col, Popconfirm } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import Icon from '@ant-design/icons-vue/es';
import { getDwarfImage } from '../fake-api/dwarfs-images';
import type { PropType } from 'vue';
import type { DwarfValue } from '../models/dwarf';
import type { DwarfImageName } from '../fake-api/dwarfs-images';

const emit = defineEmits<{
    (event: 'edit', dwarf: DwarfValue): void;
    (event: 'remove', dwarf: DwarfValue): void;
}>();
defineProps({
    dwarf: {
        required: true,
        type: Object as PropType<DwarfValue>,
    },
});
</script>

<template>
    <Card hoverable style="width: 250px">
        <template #cover>
            <img
                alt="example"
                :src="getDwarfImage(dwarf.image as DwarfImageName).image"
            />
        </template>
        <template #actions>
            <Tooltip placement="top" color="#87d068ee">
                <template #title>
                    <Row>
                        <Col>
                            <img
                                :src="dwarf.weapon.image"
                                style="width: 100%"
                            />
                        </Col>
                        <Col :offset="1">
                            <Row
                                style="
                                    color: green;
                                    text-transform: capitalize;
                                    font-weight: bold;
                                "
                                >{{ dwarf.weapon.name }}</Row
                            >
                            <Row>
                                {{ dwarf.weapon.description }}
                            </Row>
                        </Col>
                    </Row>
                </template>
                <Icon key="weapon">
                    <template #component>
                        <img
                            src="../assets/images/sword.png"
                            style="width: 15px; display: inline"
                        />
                    </template>
                </Icon>
            </Tooltip>
            <EditOutlined @click="emit('edit', dwarf)" key="edit">
            </EditOutlined>
            <Popconfirm
                v-if="dwarf.id > 5"
                :title="`Точно хотите удалить гнома ${dwarf.name}？`"
                @confirm="emit('remove', dwarf)"
                ok-text="Да"
                cancel-text="Нет"
            >
                <DeleteOutlined key="ellipsis"></DeleteOutlined>
            </Popconfirm>
        </template>
        <CardMeta :title="dwarf.name" :description="dwarf.skill"> </CardMeta>
    </Card>
</template>

<style scoped lang="less">
:deep(.ant-card-cover img) {
    height: 300px;
}
</style>
