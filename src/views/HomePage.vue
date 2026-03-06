<template>
    <div class="home-page">
        <Header />

        <!-- 全屏轮播 -->
        <HeroCarousel />

        <!-- 粘连卡片 -->
        <ScrollRevealBlocks />

        <!-- 横向全屏滑动 -->
        <HorizontalPinPanels />

        <!-- 左右滑入 -->
        <SlideInSections />

        <!-- 照片 fade -->
        <ScrollFadeFullScreen />

        <!-- 照片网格 -->
        <ScrollRevealGrid />

        <!-- 页脚背景图 -->
        <FooterBg />
    </div>
</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
import HeroCarousel from "@/components/home/HeroCarousel.vue";
import ScrollRevealBlocks from "@/components/home/ScrollRevealBlocks.vue";
import HorizontalPinPanels from "@/components/home/HorizontalPinPanels.vue";
import SlideInSections from "@/components/home/SlideInSections.vue";
import ScrollFadeFullScreen from "@/components/home/ScrollFadeFullScreen.vue";
import ScrollRevealGrid from "@/components/home/ScrollRevealGrid.vue";
import FooterBg from "@/components/home/FooterBg.vue";
</script>

<style scoped>
.home-page {
    width: 100%;
}
</style>
