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
                <div class="slide-overlay"></div>
            </div>
        </div>

        <div class="accordion-shell" :class="{ 'is-collapsed': isMobileView && isNavCollapsed }">
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

            <button
                v-if="isMobileView"
                type="button"
                class="accordion-toggle"
                :class="{ 'is-collapsed': isNavCollapsed }"
                :aria-label="isNavCollapsed ? '展开轮播侧栏' : '收起轮播侧栏'"
                @click="toggleMobileNav"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 6 L11 12 L5 18"></path>
                    <path d="M13 6 L19 12 L13 18"></path>
                </svg>
            </button>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { ref, computed, inject, onMounted, onBeforeUnmount, watch } from "vue";
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";

// PC 端轮播项
const slidesPC = [
    { src: "0top/index-1.jpg", title: "晨曦", shootDate: "2026.02.25" },
    { src: "0top/index-2.jpg", title: "繁星", shootDate: "2025.08.23" },
    { src: "0top/index-3.jpg", title: "星轨", shootDate: "2021.08.02" },
    { src: "0top/index-4.jpg", title: "荷花", shootDate: "2018.08.14" },
    { src: "0top/index-5.jpg", title: "盐湖", shootDate: "2022.07.23" },
    { src: "0top/index-6.jpg", title: "森林", shootDate: "2022.07.30" },
    { src: "0top/index-7.jpg", title: "飞机", shootDate: "2019.08.13" },
    { src: "0top/index-8.jpg", title: "雪山", shootDate: "2022.08.14" },
    { src: "0top/index-9.jpg", title: "桥梁", shootDate: "2022.07.13" },
    { src: "0top/index-10.jpg", title: "日出", shootDate: "2026.02.25" },
];
// 移动端轮播项
const slidesMobile = [
    { src: "0top/index-1.jpg", title: "晨曦", shootDate: "2026.02.25" },
    { src: "0top/index-2.jpg", title: "繁星", shootDate: "2025.08.23" },
    { src: "0top/index-3m.jpg", title: "星轨", shootDate: "2021.08.02" },
    { src: "0top/index-4m.jpg", title: "荷花", shootDate: "2018.08.14" },
    { src: "0top/index-5m.jpg", title: "桃花", shootDate: "2021.03.16" },
    { src: "0top/index-6m.jpg", title: "森林", shootDate: "2022.07.30" },
    { src: "0top/index-7m.jpg", title: "飞机", shootDate: "2025.09.19" },
    { src: "0top/index-8m.jpg", title: "建筑", shootDate: "2022.01.16" },
    { src: "0top/index-9m.jpg", title: "香港", shootDate: "2024.05.25" },
    { src: "0top/index-10m.jpg", title: "水杉", shootDate: "2024.08.19" },
];

const isMobile = inject<Ref<boolean>>("isMobile");
const isMobileView = computed(() => Boolean(isMobile?.value));
const slides = computed(() => (isMobile?.value ? slidesMobile : slidesPC));

const currentIndex = ref(0);
const isNavCollapsed = ref(false);
let autoplayTimer = null;
const autoplayDelay = 5000;

watch(
    isMobileView,
    () => {
        isNavCollapsed.value = false;
    },
    { immediate: true },
);

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

function toggleMobileNav() {
    isNavCollapsed.value = !isNavCollapsed.value;
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

.accordion-shell {
    position: absolute;
    top: 50%;
    right: 56px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    transform: translateY(-50%);

    @include mobile {
        right: $content-padding-x-mobile;
        gap: 8px;
    }
}

.accordion-nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition:
        transform 0.3s ease,
        opacity 0.25s ease;

    @include mobile {
        gap: 8px;
    }
}

.accordion-toggle {
    border: none;
    width: 42px;
    height: 42px;
    border-radius: 999px;
    background: rgba(8, 10, 16, 0.45);
    display: grid;
    place-items: center;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.24);
    cursor: pointer;
}

.accordion-toggle svg {
    width: 18px;
    height: 18px;
    stroke: rgba(255, 255, 255, 0.92);
    stroke-width: 2;
    fill: none;
    transition: transform 0.28s ease;
}

.accordion-toggle.is-collapsed svg {
    transform: rotate(180deg);
}

.accordion-shell.is-collapsed .accordion-nav {
    transform: translateX(calc(100% + 14px));
    opacity: 0;
    pointer-events: none;
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
