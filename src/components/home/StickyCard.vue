<template>
    <div>
        <section
            style="
                background: #222;
                color: white;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2em;
            "
        >
            滚动进入粘性部分 👇
        </section>

        <div class="sticky-wrapper">
            <div class="sticky-card">
                <p>我是粘性卡片：你可以继续滚动内容，但我会停在中间 ~</p>
            </div>
        </div>

        <section
            style="
                background: #333;
                color: white;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2em;
            "
        >
            粘性结束，继续滚动 👇
        </section>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    gsap.to(".sticky-wrapper", {
        y: "-12.5vh",
        scrollTrigger: {
            trigger: ".sticky-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        },
    });
});
</script>

<style scoped>
.sticky-wrapper {
    height: 500vh;
    background: linear-gradient(#fefcea, #f1da36);
}

.sticky-card {
    position: sticky;
    top: 75vh;
    width: 60%;
    margin: auto;
    padding: 80px;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    font-size: 1.5em;
}
</style>
