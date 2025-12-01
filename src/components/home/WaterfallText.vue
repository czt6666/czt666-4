<template>
    <div class="water-root">
        <div style="height: 100vh"></div>

        <div class="line" v-for="(t, i) in lines" :key="i">{{ t }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = ref(["你好", "欢迎来到", "灵感的瀑布", "每一行都流动", "随着滚动逐渐坠落"]);

onMounted(() => {
    gsap.utils.toArray(".line").forEach((line) => {
        gsap.to(line, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: line,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    });
});
</script>

<style scoped>
.water-root {
    background: black;
    color: white;
    font-family: sans-serif;
}
.line {
    font-size: 3em;
    opacity: 0;
    transform: translateY(-100px);
    margin: 60px 0;
    text-align: center;
}
</style>
