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
                :style="getLayerStyle(photo)"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// PC 端照片列表（picsum id，大图 1920×1080）
const photosPC = [1069, 1071, 1073, 1075, 1077, 1079, 1081, 1083];
// 移动端照片列表（可换 id 或数量，小图 768×1024）
const photosMobile = [1069, 1071, 1073, 1075, 1077, 1079, 1081, 1083];

const isMobile = inject("isMobile");
const photos = computed(() => (isMobile.value ? photosMobile : photosPC));

const segmentPxMobile = 320;
const segmentPx = computed(() => (isMobile.value ? segmentPxMobile : 500));
const wrapperRef = ref(null);

const imageSize = computed(() => (isMobile.value ? "768/1024" : "1920/1080"));

function getLayerStyle(photo) {
    const url =
        typeof photo === "number" ? `https://picsum.photos/id/${photo}/${imageSize.value}` : photo;
    return { backgroundImage: `url(${url})` };
}

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
        end: "bottom top",
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
