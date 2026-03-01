<template>
    <div class="photo-grid">
        <div class="grid-title">旅行与日常 · 瞬间</div>
        <div class="grid" id="photoGrid">
            <img v-for="i in 72" :key="i" :src="`https://picsum.photos/400/400?random=${i}`" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

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
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.photo-grid {
    overflow-x: hidden;
    width: 100%;
    height: calc(50vw + 50vh + 40px);
    background: #111;
    color: #fff;
    margin-bottom: -40px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    border-bottom: 2px solid #222;

    @include mobile {
        height: calc(200vw + 50vh);
        margin-bottom: -24px;
        border-bottom-left-radius: 24px;
        border-bottom-right-radius: 24px;
    }
}

.grid-title {
    position: sticky;
    top: 0;
    background: #111;
    font-size: 1.5rem;
    padding: 16px 20px;
    z-index: 10;
}

.grid {
    height: 50vw;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 4px;

    @include mobile {
        height: 200vw;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(12, 1fr);
        gap: 3px;
        padding: 0 $content-padding-x-mobile;
        padding-bottom: $content-gap-mobile;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
