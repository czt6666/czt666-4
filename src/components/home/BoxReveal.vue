<template>
    <div class="container-wrapper">
        <div class="container">
            <div class="text">
                <h2>Scroll to Reveal</h2>
            </div>
            <div class="boxes">
                <div class="box">1</div>
                <div class="box">2</div>
                <div class="box">3</div>
                <div class="box">4</div>
                <div class="box">5</div>
            </div>
        </div>

        <div class="container">
            <div class="boxes">
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
            </div>
            <div class="text">
                <h2>Scroll to Reveal</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        gsap.to(box, {
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: "top 80%",
                end: "bottom 60%",
                scrub: true,
            },
        });
    });
});
</script>

<style scoped>
.container-wrapper {
    background: #000;
}

.container {
    display: flex;
    height: 3144px;
    position: relative;
}

.text {
    width: 40%;
    padding: 2rem;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    background: rgba(254, 197, 99, 0.8);
    border-right: 2px solid #444;
}

.boxes {
    width: 60%;
}

.box {
    width: 100%;
    height: 600px;
    margin-bottom: 36px;
    opacity: 0;
    transform: scale(0.95);
    background: radial-gradient(circle, #1e90ff, #00ced1);
    border-radius: 12px;
}
</style>
