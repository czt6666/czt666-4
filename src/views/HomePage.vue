<template>
    <Header />

    <!-- 前端作品：随滚动展示项目卡片 -->
    <ScrollRevealBlocks />

    <!-- 横向滑动 -->
    <HorizontalPinPanels />

    <!-- 粘性居中文字 -->
    <!-- <StickyFixText /> -->

    <!-- 左右滑入 -->
    <SlideInSections />

    <!-- 摄影：固定标题 + 大图渐显 -->
    <!-- <ScrollFadePhoto /> -->

    <!-- 摄影：竖排 n 张照片，随滚动位置固定、逐张隐藏显示 -->
    <ScrollFadeFixPhotos />

    <!-- 照片网格 -->
    <ScrollRevealGrid />
</template>

<script setup>
import Header from "@/components/Header.vue";
import ScrollRevealBlocks from "@/components/home/ScrollRevealBlocks.vue";
import HorizontalPinPanels from "@/components/home/HorizontalPinPanels.vue";
import StickyFixText from "@/components/home/StickyFixText.vue";
import SlideInSections from "@/components/home/SlideInSections.vue";
import ScrollFadePhoto from "@/components/home/ScrollFadePhotos.vue";
import ScrollFadeFixPhotos from "@/components/home/ScrollFadeFixPhotos.vue";
import ScrollRevealGrid from "@/components/home/ScrollRevealGrid.vue";
</script>
