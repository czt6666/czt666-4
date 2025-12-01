<template>
    <header
        class="nav-bar"
        :class="{
            compact: scrollY > vh100,
            hide: scrollY > vh500,
        }"
    >
        <div class="container">
            <div class="left">Left Key Area</div>
            <div class="right" v-if="scrollY <= vh100">Right Area</div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const scrollY = ref(0);
const vh100 = window.innerHeight; // 100vh
const vh500 = window.innerHeight * 5; // 500vh

const updateScroll = () => {
    // scrollY.value = window.scrollY;
};

onMounted(() => {
    window.addEventListener("scroll", updateScroll, { passive: true });
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", updateScroll);
});
</script>

<style lang="scss" scoped>
.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    // backdrop-filter: blur(10px);
    background-color: transparent;
    background-color: pink;
    transition: all 0.3s ease;
    z-index: 999;

    &.compact {
        background: blue;
        .right {
            display: none !important;
        }
    }

    &.hide {
        opacity: 0;
        pointer-events: none;
    }
}

.container {
    width: 1080px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;

    .left {
        padding: 0 20px;
        border-radius: 50%;
    }
}
</style>
