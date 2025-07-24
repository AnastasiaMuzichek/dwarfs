<script setup lang="ts"></script>

<template>
    <header>
        <div class="header-main">
            <img src="../assets/images/dwarf.png" />
            <h1>Кадровый центр "Маленькие мастера"</h1>
        </div>
        <div class="header-extra"></div>
    </header>
</template>

<style scoped lang="less">
h1 {
    font-family: 'Tangerine', serif;
    font-size: 48px;
    text-shadow: 4px 4px 4px #aaa;
}

img {
    height: 120px;
    /* width: 50px; */
}

header {
    padding: 10px 0;
}

.header {
    &-main {
        display: flex;
    }
}
</style>
