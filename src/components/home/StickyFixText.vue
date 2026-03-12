<template>
    <div>
        <section class="intro-section">向下滚动，探索更多 👇</section>

        <div class="sticky-wrapper">
            <div class="sticky-card">
                <p>前端开发 · 摄影 · 旅行</p>
                <p class="sub">用代码与镜头记录所见</p>
            </div>
        </div>

        <section class="outro-section">继续向下，看摄影与旅途 👇</section>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";

onMounted(() => {
    gsap.to(".sticky-wrapper", {
        y: "-25vh",
        scrollTrigger: {
            trigger: ".sticky-wrapper",
            start: "center center",
            end: "center center",
            // end: "bottom bottom",
            scrub: true,
        },
    });
});
</script>

<style scoped>
.sticky-wrapper {
    height: 800vh;
    background: linear-gradient(#fefcea, #f1da36);
}

.sticky-card {
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    width: 60%;
    margin: 0 auto;
    padding: 80px;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    font-size: 1.5em;
    text-align: center;
}
.sticky-card .sub {
    font-size: 0.85em;
    color: #555;
    margin-top: 0.5em;
}
.intro-section,
.outro-section {
    background: #222;
    color: white;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
}
.outro-section {
    background: #333;
}
</style>
