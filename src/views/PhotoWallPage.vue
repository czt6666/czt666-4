<template>
    <div class="photo-wall-page">
        <AppHeader />

        <main class="photo-wall-main">
            <section class="hero">
                <p class="eyebrow">Gallery</p>
                <h1>照片墙</h1>
            </section>

            <WaterfallHorizontal
                :images="images"
                :line-height="lineHeight"
                :line-width="lineWidth"
                :margin="margin"
            >
                <template #item="{ info }">
                    <div class="wall-item" @click="openLightbox(info.src)">
                        <img
                            :src="info.src"
                            :alt="info.title || '照片'"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </template>
            </WaterfallHorizontal>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import WaterfallHorizontal, { type WaterfallImage } from "@/components/WaterfallHorizontal.vue";
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";
import { openImagePreview } from "@/composables/useImagePreview";

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 300;

// static/9zpq 下全部照片：init1000.jpg ~ init1149.jpg
const ZPQ_START = 1000;
const ZPQ_END = 1149;

const images = computed<WaterfallImage[]>(() =>
    Array.from({ length: ZPQ_END - ZPQ_START + 1 }, (_, i) => {
        const n = ZPQ_START + i;
        return {
            src: resolveStaticAssetUrl(`9zpq/init${n}.jpg`),
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            title: `照片 ${i + 1}`,
        };
    }),
);

const lineHeight = ref(320);
const lineWidth = ref(1080);
const margin = ref(10);

function updateLayout() {
    const w = document.documentElement.clientWidth;
    lineHeight.value = Math.min(350, w * 0.35);
    lineWidth.value = w > 720 ? w - 120 : w;
    margin.value = w > 720 ? 10 : 5;
}

function openLightbox(src: string) {
    const index = images.value.findIndex((img) => img.src === src);
    openImagePreview(images.value, { startIndex: index >= 0 ? index : 0 });
}

onMounted(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateLayout);
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
    width: 100%;
    height: 100%;
    cursor: pointer;
    overflow: hidden;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.3);

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    &:hover img {
        transform: scale(1.04);
    }
}
</style>
