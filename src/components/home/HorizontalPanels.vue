<template>
    <section class="wrapper" id="panels">
        <div class="panel p1">Panel 1</div>
        <div class="panel p2">Panel 2</div>
        <div class="panel p3">Panel 3</div>
        <div class="panel p4">Panel 4</div>
    </section>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: "#panels",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + document.querySelector("#panels").offsetWidth,
        },
    });
});
</script>

<style scoped>
.wrapper {
    height: 100vh;
    display: flex;
    overflow: hidden;
}

.panel {
    flex: 0 0 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    color: white;
}

.p1 {
    background: #111;
}
.p2 {
    background: #333;
}
.p3 {
    background: #555;
}
.p4 {
    background: #777;
}
</style>
