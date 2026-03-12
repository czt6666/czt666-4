<template>
    <div class="photo-wall-page">
        <AppHeader />

        <main class="photo-wall-main">
            <section class="hero">
                <p class="eyebrow">Gallery</p>
                <h1>照片墙</h1>
            </section>

            <WaterfallHorizontal
                :images="visibleImages"
                :line-height="lineHeight"
                :line-width="lineWidth"
                :margin="margin"
            >
                <template #item="{ info }">
                    <div class="wall-item" @click="openLightbox(info.src)">
                        <img v-lazy-image="info.src" :alt="info.title || '照片'" decoding="async" />
                        <div class="wall-item-title">{{ info.title }}</div>
                    </div>
                </template>
            </WaterfallHorizontal>

            <div ref="loadMoreRef" class="photo-wall-load-more" aria-hidden="true"></div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import WaterfallHorizontal from "@/components/WaterfallHorizontal.vue";
import { photoWallImages } from "@/data/photoWallImages";
import { openImagePreview } from "@/composables/useImagePreview";

// 所有图片数据（可手动维护或来自接口）
const allImages = photoWallImages;

// 手写懒加载：一次只把部分图片传给瀑布流组件
const PAGE_SIZE = 40;
const visibleImages = ref(allImages.slice(0, PAGE_SIZE));
const loadMoreRef = ref<HTMLElement | null>(null);
let io: IntersectionObserver | null = null;

const lineHeight = ref(320);
const lineWidth = ref(1080);
const margin = ref(10);

function updateLayout() {
    const w = document.documentElement.clientWidth;
    lineHeight.value = Math.min(350, w * 0.35);

    // 根据与页面 padding 对齐，避免在移动端横向超出
    const horizontalPadding = w > 720 ? 48 : 32; // desktop: 24 * 2, mobile: 16 * 2
    lineWidth.value = Math.max(0, w - horizontalPadding);

    margin.value = w > 720 ? 10 : 5;
}

function openLightbox(src: string) {
    // 预览时使用完整列表，方便左右切图
    const index = allImages.findIndex((img) => img.src === src);
    openImagePreview(visibleImages.value, { startIndex: index >= 0 ? index : 0 });
}

function loadMoreImages() {
    const current = visibleImages.value.length;
    if (current >= allImages.length) {
        if (io && loadMoreRef.value) {
            io.unobserve(loadMoreRef.value);
        }
        return;
    }
    const next = current + PAGE_SIZE;
    visibleImages.value = allImages.slice(0, Math.min(next, allImages.length));
}

onMounted(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);

    // 使用 IntersectionObserver 监听底部哨兵，进入视口时按页追加图片
    if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadMoreImages();
                    }
                });
            },
            {
                root: null,
                rootMargin: "800px 0px",
                threshold: 0.01,
            },
        );
        if (loadMoreRef.value) {
            io.observe(loadMoreRef.value);
        }
    }
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateLayout);
    if (io && loadMoreRef.value) {
        io.unobserve(loadMoreRef.value);
    }
});
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;

.photo-wall-page {
    min-height: 100vh;
    color: #eef3ff;
    background:
        radial-gradient(circle at 20% 15%, rgba(25, 45, 80, 0.35), transparent 45%),
        radial-gradient(circle at 85% 85%, rgba(35, 55, 90, 0.2), transparent 40%),
        linear-gradient(165deg, #0a0d14 0%, #0e121a 50%, #080b10 100%);
    overflow-x: hidden;
}

.photo-wall-main {
    padding: 112px 24px 48px;

    @include mobile {
        padding: 86px 16px 32px;
    }
}

.hero {
    margin-bottom: 28px;

    .eyebrow {
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(196, 214, 255, 0.8);
        margin-bottom: 8px;
    }

    h1 {
        margin: 0;
        font-size: clamp(32px, 5.5vw, 52px);
        line-height: 1.15;
        letter-spacing: 0.02em;
    }
}

.wall-item {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
    cursor: zoom-in;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* 懒加载：无 src 时仅显示占位背景，进入视口后由 v-lazy-image 设置 src */
        opacity: 0;
        transition: opacity 0.25s ease;
    }

    img[src] {
        opacity: 1;
    }
}

.wall-item-title {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 8px 12px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
    transform: translateY(100%);
    transition: transform 0.25s ease;
}

.wall-item:hover .wall-item-title {
    transform: translateY(0);
}

.photo-wall-load-more {
    height: 1px;
    width: 100%;
}
</style>
