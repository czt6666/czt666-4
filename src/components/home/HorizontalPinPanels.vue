<template>
    <section class="wrapper" id="travel-route">
        <div class="panel p1">
            <h2>川西环线</h2>
            <p>成都 — 四姑娘山 — 丹巴 — 新都桥 — 稻城亚丁 — 理塘</p>
        </div>
        <div class="panel p2">
            <h2>云南 · 大理丽江</h2>
            <p>洱海、苍山、古城、泸沽湖</p>
        </div>
        <div class="panel p3">
            <h2>西藏</h2>
            <p>拉萨 — 林芝 — 纳木错 — 珠峰大本营</p>
        </div>
        <div class="panel p4">
            <h2>江南水乡</h2>
            <p>杭州 — 乌镇 — 西塘 — 苏州</p>
        </div>
    </section>
</template>

<script setup>
import { onMounted, inject, ref } from "vue";
import gsap from "gsap";

const isMobile = inject("isMobile");

onMounted(() => {
    const trigger = document.querySelector("#travel-route");
    if (!trigger) return;
    const sections = gsap.utils.toArray(".panel");
    // 移动端加长滚动距离，避免滚得太快（约 2.5 倍）
    const getEnd = () => {
        const w = trigger.getBoundingClientRect().width;
        return "+=" + (isMobile.value ? w * 2.5 : w);
    };

    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: "#travel-route",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: getEnd,
        },
    });
});
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
}

.panel {
    flex: 0 0 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    padding: 2rem;
}
.panel h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
}
.panel p {
    font-size: 1.2rem;
    opacity: 0.95;
}

.p1 {
    background: linear-gradient(135deg, #1a3a2e 0%, #2d5a4a 100%);
}
.p2 {
    background: linear-gradient(135deg, #3d2c5c 0%, #5a4a7a 100%);
}
.p3 {
    background: linear-gradient(135deg, #2c3d5c 0%, #4a5a7a 100%);
}
.p4 {
    background: linear-gradient(135deg, #4a3d2c 0%, #6a5a4a 100%);
}
</style>
