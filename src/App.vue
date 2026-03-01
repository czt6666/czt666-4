<template>
    <div id="app smooth-wrapper">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { provide } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useIsMobile } from "@/composables/useIsMobile";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const isMobile = useIsMobile();
provide("isMobile", isMobile);
</script>

<style scoped>
#app {
    width: 100%;
}
</style>
