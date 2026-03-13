<template>
    <div class="coming-soon-page">
        <AppHeader />
        <main class="coming-soon-main">
            <h1>{{ pageTitle }}</h1>
            <p>该页面还没做好，正在开发中。</p>
            <button type="button" class="back-home" @click="goBack">返回上一页</button>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";

const route = useRoute();
const router = useRouter();
const pageTitle = computed(() => String(route.meta.title ?? "页面建设中"));

function goBack() {
    if (window.history.length > 1) {
        router.back();
    } else {
        router.replace("/");
    }
}
</script>

<style scoped lang="scss">
.coming-soon-page {
    min-height: 100vh;
    background: radial-gradient(circle at 50% -20%, #2f415a 0%, #0f1116 42%, #090b10 100%);
    color: #f7fbff;
}

.coming-soon-main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 24px;
    text-align: center;

    h1 {
        font-size: clamp(30px, 5vw, 56px);
        line-height: 1.1;
        letter-spacing: 0.04em;
    }

    p {
        font-size: clamp(14px, 2.2vw, 18px);
        opacity: 0.84;
    }
}

.back-home {
    margin-top: 14px;
    padding: 10px 18px;
    border-radius: 999px;
    color: #fff;
    font: inherit;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.28);
    transition: background-color 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.22);
    }
}
</style>
