<template>
    <div class="slide-sections-root" id="travel-story">
        <section class="blank"></section>
        <section>
            <div class="box2">
                <h3>稻城亚丁</h3>
                <p>雪山、海子与高原，蓝色星球上的最后一片净土。</p>
            </div>
        </section>
        <section>
            <div class="box2">
                <h3>雨崩徒步</h3>
                <p>梅里脚下，徒步进村，神瀑与冰湖。</p>
            </div>
        </section>
        <section>
            <div class="box2">
                <h3>青海湖环线</h3>
                <p>油菜花、盐湖与戈壁，西北的辽阔与色彩。</p>
            </div>
        </section>
        <section>
            <div class="box2">
                <h3>厦门</h3>
                <p>鼓浪屿、骑楼与海风，闽南的慢与甜。</p>
            </div>
        </section>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem;
    color: white;
    background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #0d4d6a 100%);
    transform: translateX(-100vw);
}
.box2 h3 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}
.box2 p {
    font-size: 1.2rem;
    opacity: 0.95;
}
.blank {
    background: #0d1117;
}
</style>
