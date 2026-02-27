<template>
    <div class="scroll-fade-photos" ref="wrapperRef" :style="{ '--n': photoIds.length }">
        <div class="sticky-viewport">
            <div
                v-for="(id, index) in photoIds"
                :key="id"
                class="photo-layer"
                :data-index="index"
                :style="{
                    backgroundImage: `url(https://picsum.photos/id/${id}/1200/800)`,
                }"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const photoIds = ref([1021, 1025, 1035, 1043, 1045]);
const wrapperRef = ref(null);

onMounted(() => {
    const wrapper = wrapperRef.value;
    if (!wrapper) return;

    const layers = wrapper.querySelectorAll(".photo-layer");
    const n = layers.length;
    const segment = 1 / n;

    const tl = gsap.timeline();
    for (let i = 0; i < n - 1; i++) {
        tl.to(layers[i], { opacity: 0, duration: segment }, (i + 1) * segment);
        tl.to(layers[i + 1], { opacity: 1, duration: segment }, (i + 1) * segment);
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

<style scoped>
.scroll-fade-photos {
    height: calc(100vh * var(--n, 5)); /* --n 与照片数量一致，用于滚动长度 */
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
    top: 0;
    left: 0;
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
