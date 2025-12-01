<template>
    <div class="photo-root">
        <div class="title">摄影 · 记录时间的方式</div>

        <div
            class="photo"
            v-for="id in [1021, 1025, 1035]"
            :key="id"
            :style="{ backgroundImage: `url(https://picsum.photos/id/${id}/1200/800)` }"
        ></div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    gsap.utils.toArray(".photo").forEach((p) => {
        gsap.to(p, {
            opacity: 1,
            scrollTrigger: {
                trigger: p,
                start: "top center",
                end: "bottom center",
                scrub: true,
            },
        });
    });
});
</script>

<style scoped>
.photo-root {
    background: #111;
    color: #fff;
}
.title {
    position: sticky;
    top: 0;
    background: #111;
    font-size: 40px;
    padding: 20px;
    z-index: 100;
}
.photo {
    height: 100vh;
    background-size: cover;
    background-position: center;
    opacity: 0.2;
}
</style>
