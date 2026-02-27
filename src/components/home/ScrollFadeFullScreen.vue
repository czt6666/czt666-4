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
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// 组件内部维护：照片列表（picsum id）与每段滚动像素（移动端用更短段高）
const photos = ref([1069, 1071, 1073, 1075, 1077, 1079, 1081, 1083]);
const segmentPx = ref(500);
const segmentPxMobile = 320;

const wrapperRef = ref(null);

function getLayerStyle(photo) {
    const url = typeof photo === "number" ? `https://picsum.photos/id/${photo}/1920/1080` : photo;
    return {
        backgroundImage: `url(${url})`,
    };
}

const isMobile = () => window.innerWidth < 768;
const updateSegment = () => {
    segmentPx.value = isMobile() ? segmentPxMobile : 500;
};

onMounted(() => {
    updateSegment();
    window.addEventListener("resize", updateSegment);

    const wrapper = wrapperRef.value;
    if (!wrapper || photos.value.length < 2) return;

    const layers = wrapper.querySelectorAll(".photo-layer");
    const n = layers.length;
    const segment = 1 / (n - 1); // 0~1 的进度被分成 n-1 段

    const tl = gsap.timeline();
    for (let i = 0; i < n - 1; i++) {
        tl.to(layers[i], { opacity: 0, duration: segment }, i * segment);
        tl.to(layers[i + 1], { opacity: 1, duration: segment }, i * segment);
    }

    ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: tl,
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateSegment);
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
