<template>
    <div class="slide-sections-root">
        <section></section>
        <section><div class="box2">Section 1</div></section>
        <section><div class="box2">Section 2</div></section>
        <section><div class="box2">Section 3</div></section>
        <section><div class="box2">Section 4</div></section>
        <section><div class="box2">Section 5</div></section>
        <section></section>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".box2").forEach((box) => {
        gsap.fromTo(
            box,
            { x: "-100vw", opacity: 0 },
            {
                x: "0vw",
                opacity: 1,
                scrollTrigger: {
                    trigger: box,
                    start: "top 100%",
                    end: "top 25%",
                    scrub: true,
                },
            },
        );

        gsap.fromTo(
            box,
            { x: "0vw", opacity: 1 },
            {
                x: "100vw",
                opacity: 0,
                scrollTrigger: {
                    trigger: box,
                    start: "bottom 25%",
                    end: "bottom 0%",
                    scrub: true,
                },
            },
        );
    });
});
</script>

<style scoped>
.slide-sections-root {
    background: #111;
}

section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 2px solid #ccc;
}

.box2 {
    width: 100%;
    height: 100%;
    font-size: 3rem;
    color: white;
    background: radial-gradient(circle, #1e90ff, #00ced1);
    transform: translateX(-100vw);
}
</style>
