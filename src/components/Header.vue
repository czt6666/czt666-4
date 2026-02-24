<template>
    <header
        class="nav-bar"
        :class="{
            compact: scrollY > vh100,
            hide: scrollY > vh500,
        }"
    >
        <div class="container">
            <a href="#" class="logo">作品集</a>
            <nav class="right">
                <a href="#frontend">前端作品</a>
                <a href="#photo">摄影</a>
                <a href="#travel-story">旅游经历</a>
                <a href="#travel-route">旅游路线</a>
            </nav>
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
    background-color: transparent;
    transition: all 0.3s ease;
    z-index: 999;

    &.compact {
        background: rgba(20, 20, 25, 0.92);
        backdrop-filter: blur(8px);
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

    .logo {
        font-weight: 700;
        font-size: 1.25rem;
        color: #fff;
        text-decoration: none;
    }

    nav.right {
        display: flex;
        gap: 28px;

        a {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            font-size: 0.95rem;

            &:hover {
                color: #fff;
            }
        }
    }
}
</style>
