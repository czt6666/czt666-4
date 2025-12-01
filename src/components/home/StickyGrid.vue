<template>
    <div class="photo-grid">
        <div class="grid" id="photoGrid">
            <img v-for="i in 72" :key="i" :src="`https://picsum.photos/400/400?random=${i}`" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    const imgs = document.querySelectorAll("#photoGrid img");

    imgs.forEach((img, i) => {
        gsap.fromTo(
            img,
            { y: 120, scale: 1.3, opacity: 0 },
            {
                y: 0,
                scale: 1,
                opacity: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: img,
                    start: `top ${95 - (i % 12) * 2}%`,
                    end: "top 60%",
                    scrub: true,
                },
            },
        );
    });
});
</script>

<style lang="scss" scoped>
.photo-grid {
    width: 100%;
    height: calc(50vw + 100vh);
    background: #111;
    color: #fff;
}

.grid {
    width: 100%;
    height: 50vw;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 4px;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>
