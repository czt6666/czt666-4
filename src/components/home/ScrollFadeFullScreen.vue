<template>
    <div
        class="scroll-fade-fullscreen"
        ref="wrapperRef"
        :style="{
            '--segment-px': segmentPx + 'px',
            '--n': photos.length,
        }"
    >
        <div class="sticky-viewport">
            <div
                v-for="(photo, index) in photos"
                :key="index"
                class="photo-layer"
                :data-index="index"
                v-lazy-image:bg="resolveStaticAssetUrl(photo)"
            ></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { ref, computed, inject, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";

const isMobile = inject<Ref<boolean>>("isMobile");
const photosPC = [
    "0top/index-11.jpg",
    "0top/index-12.jpg",
    "0top/index-13.jpg",
    "0top/index-14.jpg",
];
const photosMobile = [
    "0top/index-11.jpg",
    "0top/index-12m.jpg",
    "0top/index-13m.jpg",
    "0top/index-14m.jpg",
];
const photos = computed(() => (isMobile?.value ? photosMobile : photosPC));

const segmentPx = computed(() => (isMobile?.value ? 360 : 500));
const wrapperRef = ref<HTMLElement | null>(null);

onMounted(() => {
    const wrapper = wrapperRef.value;
    if (!wrapper || photos.value.length < 2) return;

    const layers = wrapper.querySelectorAll(".photo-layer");
    const n = layers.length;
    const segment = 1 / (n - 1); // 每段占整段滚动的比例
    const fadeRatio = 0.5; // 只用一半滚动做 fade，前半段保持 opacity=1

    const tl = gsap.timeline();
    for (let i = 0; i < n - 1; i++) {
        const fadeStart = i * segment + segment * (1 - fadeRatio);
        const fadeDuration = segment * fadeRatio;
        tl.to(layers[i], { opacity: 0, duration: fadeDuration }, fadeStart);
        tl.to(layers[i + 1], { opacity: 1, duration: fadeDuration }, fadeStart);
    }

    ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        animation: tl,
    });
});
</script>

<style lang="scss" scoped>
@use "@/styles/mixins.scss" as *;

.scroll-fade-fullscreen {
    /* 总高度 = 张数 × 每段像素，保证每 segment px 一段 */
    height: calc(var(--n) * var(--segment-px, 500px));
    background: #111;
}

.sticky-viewport {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.photo-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
}

.photo-layer:first-child {
    opacity: 1;
}
</style>
