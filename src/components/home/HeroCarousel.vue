<template>
    <section class="hero-carousel">
        <div class="slides">
            <div
                v-for="(slide, index) in slides"
                :key="index"
                class="slide"
                :class="{ active: index === currentIndex }"
                v-lazy-image:bg="resolveStaticAssetUrl(slide.src)"
            >
                <div class="slide-overlay" />
            </div>
        </div>

        <nav class="accordion-nav" aria-label="轮播切换">
            <button
                v-for="(slide, index) in slides"
                :key="index"
                type="button"
                class="accordion-btn"
                :class="{ active: index === currentIndex }"
                :aria-label="slide.title"
                @mouseenter="goTo(index)"
                @click="goTo(index)"
            >
                <span class="accordion-title">{{ slide.title }}</span>
                <span class="accordion-subtitle">{{ slide.shootDate }}</span>
            </button>
        </nav>
    </section>
</template>

<script setup>
import { ref, computed, inject, onMounted, onBeforeUnmount } from "vue";
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";

// PC 端轮播项（大图 1920×1080）
const slidesPC = [
    { src: "0top/index-1.jpg", title: "晨曦", shootDate: "2024.03.15" },
    { src: "0top/index-2.jpg", title: "繁星", shootDate: "2024.04.02" },
    { src: "0top/index-3.jpg", title: "星轨", shootDate: "2024.04.18" },
    { src: "0top/index-4.jpg", title: "荷花", shootDate: "2024.05.06" },
    { src: "0top/index-5.jpg", title: "盐湖", shootDate: "2024.05.22" },
    { src: "0top/index-6.jpg", title: "森林", shootDate: "2024.06.10" },
    { src: "0top/index-7.jpg", title: "飞机", shootDate: "2024.06.28" },
    { src: "0top/index-8.jpg", title: "雪山", shootDate: "2024.07.14" },
    { src: "0top/index-9.jpg", title: "大桥", shootDate: "2024.08.01" },
    { src: "0top/index-10.jpg", title: "日出", shootDate: "2024.08.19" },
];
// 移动端轮播项（可换 id 或尺寸，这里用竖版 768×1024）
const slidesMobile = [
    { src: "0top/index-1.jpg", title: "晨曦", shootDate: "2024.03.15" },
    { src: "0top/index-2.jpg", title: "繁星", shootDate: "2024.04.02" },
    { src: "0top/index-3m.jpg", title: "星轨", shootDate: "2024.04.18" },
    { src: "0top/index-4m.jpg", title: "荷花", shootDate: "2024.05.06" },
    { src: "0top/index-5m.jpg", title: "桃花", shootDate: "2024.05.22" },
    { src: "0top/index-6m.jpg", title: "森林", shootDate: "2024.06.10" },
    { src: "0top/index-7m.jpg", title: "飞机", shootDate: "2024.06.28" },
    { src: "0top/index-8m.jpg", title: "航展", shootDate: "2024.07.14" },
    { src: "0top/index-9m.jpg", title: "香港", shootDate: "2024.08.01" },
    { src: "0top/index-10m.jpg", title: "水杉", shootDate: "2024.08.19" },
];

const isMobile = inject("isMobile");
const slides = computed(() => (isMobile.value ? slidesMobile : slidesPC));

const currentIndex = ref(0);
let autoplayTimer = null;
const autoplayDelay = 5000;

function goTo(index) {
    currentIndex.value = index;
    resetAutoplay();
}

function next() {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
}

function resetAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, autoplayDelay);
}

onMounted(() => {
    resetAutoplay();
});

onBeforeUnmount(() => {
    if (autoplayTimer) clearInterval(autoplayTimer);
});
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.hero-carousel {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #0c0c0c;
}

.slides {
    position: absolute;
    inset: 0;
}

.slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide.active {
    opacity: 1;
    z-index: 1;
}

.slide-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        105deg,
        rgba(0, 0, 0, 0.35) 0%,
        transparent 45%,
        transparent 70%,
        rgba(0, 0, 0, 0.2) 100%
    );
    pointer-events: none;
}

.accordion-nav {
    position: absolute;
    top: 50%;
    right: 56px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transform: translateY(-50%);

    @include mobile {
        right: $content-padding-x-mobile;
        gap: 8px;
    }
}

.accordion-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 11em;
    min-width: 11em;
    min-height: 52px;
    padding: 12px 18px;
    border: none;
    border-radius: 14px;
    border-left: 3px solid transparent;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: rgba(255, 255, 255, 0.88);
    cursor: pointer;
    text-align: right;
    transition:
        min-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        background 0.35s ease,
        border-color 0.35s ease,
        color 0.35s ease,
        box-shadow 0.35s ease;
    overflow: hidden;

    @include mobile {
        width: auto;
        min-width: 0;
        min-height: 44px;
        padding: 10px 14px;
        border-radius: 10px;
        border-left: none;
        border-bottom: 3px solid transparent;
    }
}

.accordion-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
}

.accordion-btn.active {
    min-height: 88px;
    background: rgba(255, 255, 255, 0.14);
    border-left-color: rgba(255, 255, 255, 0.6);
    color: #fff;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);

    @include mobile {
        min-height: 52px;
        border-left-color: transparent;
        border-bottom-color: rgba(255, 255, 255, 0.6);
    }
}

.accordion-title {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
    line-height: 1.35;

    @include mobile {
        font-size: 14px;
        white-space: nowrap;
    }
}

.accordion-subtitle {
    font-size: 12px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.65);
    margin-top: 0;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
    transition:
        max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        opacity 0.4s ease 0.06s,
        margin 0.4s ease;

    @include mobile {
        font-size: 12px;
    }
}

.accordion-btn.active .accordion-subtitle {
    max-height: 2em;
    opacity: 1;
    margin-top: 8px;
}
</style>
