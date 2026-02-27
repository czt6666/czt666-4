<template>
    <div class="container-wrapper" id="frontend">
        <div class="container">
            <div class="text">
                <h2>前端作品</h2>
                <p>网站、后台、H5 与组件库等实践项目，随滚动逐一呈现。</p>
            </div>
            <div class="boxes">
                <div class="box">
                    <span class="box-title">企业官网</span>
                    <span class="box-desc">Vue3 + 响应式</span>
                </div>
                <div class="box">
                    <span class="box-title">管理后台</span>
                    <span class="box-desc">Element Plus · 数据看板</span>
                </div>
                <div class="box">
                    <span class="box-title">H5 活动页</span>
                    <span class="box-desc">动效与适配</span>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="boxes">
                <div class="box box-alt">
                    <span class="box-title">11</span>
                    <span class="box-desc">持续更新中</span>
                </div>
                <div class="box box-alt">22</div>
                <div class="box box-alt">33</div>
            </div>
            <div class="text">
                <h2>国内Top景观</h2>
                <p>从界面到动效，关注细节与体验。</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

onMounted(() => {
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

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.container-wrapper {
    background: #000;
}

.container {
    display: flex;
    position: relative;
}

.text {
    width: 40%;
    padding: 2rem;
    position: sticky;
    top: 0;
    left: 0;
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
    background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #3d7ab5 100%);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 24px;
    color: #fff;

    &:last-child {
        margin-bottom: 0;
    }
}
.box-title {
    font-size: 1.5rem;
    font-weight: 600;
}
.box-desc {
    font-size: 0.95rem;
    opacity: 0.9;
    margin-top: 4px;
}
.box-alt {
    background: linear-gradient(135deg, #2d1f4e 0%, #4a3a6b 100%);
}
</style>
