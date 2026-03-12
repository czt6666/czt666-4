<template>
    <div class="frontend-works-page">
        <AppHeader />

        <main class="works-main">
            <section class="hero">
                <p class="eyebrow">Frontend Portfolio</p>
                <h1>我的前端作品集</h1>
            </section>

            <section class="cards">
                <article v-for="work in works" :key="work.href" class="work-card">
                    <img
                        :src="work.cover"
                        :alt="`${work.title} 预览图`"
                        class="cover"
                        loading="lazy"
                    />
                    <p class="work-index">{{ work.index }}</p>
                    <h2>{{ work.title }}</h2>
                    <p class="work-desc">{{ work.desc }}</p>

                    <a
                        :href="work.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="work-link"
                    >
                        查看项目
                        <span aria-hidden="true">→</span>
                    </a>
                </article>
            </section>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";

type WorkCard = {
    index: string;
    title: string;
    desc: string;
    href: string;
    cover: string;
};

const isMobile = inject<{ value: boolean }>("isMobile");
const works = computed<WorkCard[]>(() => {
    const suffix = isMobile?.value ? "-m" : "";

    return [
        {
            index: "01",
            title: "国内 ChatGPT",
            desc: "免费畅聊，开箱即用",
            href: "https://czt666.cn/gpt",
            cover: resolveStaticAssetUrl(`00frontend/gpt${suffix}.jpg`),
        },
        {
            index: "02",
            title: "地图相册",
            desc: "把旅行钉在地图上",
            href: "https://czt666.cn/map",
            cover: resolveStaticAssetUrl(`00frontend/map${suffix}.jpg`),
        },
        {
            index: "03",
            title: "留言墙",
            desc: "留下你的只言片语",
            href: "https://czt666.cn/lyq",
            cover: resolveStaticAssetUrl(`00frontend/lyq${suffix}.jpg`),
        },
        {
            index: "04",
            title: "土壤监测",
            desc: "守护每一寸耕地",
            href: "https://czt666.cn/soil",
            cover: resolveStaticAssetUrl(`00frontend/soil${suffix}.jpg`),
        },
        {
            index: "05",
            title: "蔬菜大棚",
            desc: "让蔬菜长在数据里",
            href: "https://czt666.cn/vegt",
            cover: resolveStaticAssetUrl(`00frontend/vegt${suffix}.jpg`),
        },
        {
            index: "06",
            title: "V0 · 2020",
            desc: "最初的模样，青涩又认真",
            href: "https://czt666.cn/v0",
            cover: resolveStaticAssetUrl(`00frontend/v0${suffix}.jpg`),
        },
        {
            index: "07",
            title: "V1 · 2021",
            desc: "一年后，成长了一点点",
            href: "https://czt666.cn/v1",
            cover: resolveStaticAssetUrl(`00frontend/v1${suffix}.jpg`),
        },
        {
            index: "08",
            title: "V2 · 2022",
            desc: "折腾不停，越来越像样",
            href: "https://czt666.cn/v2",
            cover: resolveStaticAssetUrl(`00frontend/v2${suffix}.jpg`),
        },
        {
            index: "09",
            title: "V3 · 2023",
            desc: "去年的心血，记录在这里",
            href: "https://czt666.cn/v3",
            cover: resolveStaticAssetUrl(`00frontend/v3${suffix}.jpg`),
        },
    ];
});
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;

.frontend-works-page {
    min-height: 100vh;
    color: #eef3ff;
    background:
        radial-gradient(circle at 12% 14%, rgba(47, 87, 255, 0.34), transparent 34%),
        radial-gradient(circle at 88% 80%, rgba(91, 226, 255, 0.2), transparent 36%),
        linear-gradient(145deg, #080a12 0%, #0d1220 44%, #070a10 100%);
}

.works-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 112px 24px 48px;

    @include mobile {
        padding: 86px 16px 28px;
    }
}

.hero {
    margin-bottom: 34px;

    .eyebrow {
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(196, 214, 255, 0.86);
        margin-bottom: 10px;
    }

    h1 {
        margin: 0;
        font-size: clamp(34px, 6vw, 56px);
        line-height: 1.1;
        letter-spacing: 0.02em;
    }

    .subtitle {
        margin: 12px 0 0;
        font-size: clamp(14px, 2.1vw, 18px);
        color: rgba(224, 233, 255, 0.86);
        max-width: 560px;
    }
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;

    @include mobile {
        grid-template-columns: 1fr;
        gap: 14px;
    }
}

.work-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 420px;
    padding: 24px;
    border-radius: 18px;
    border: 1px solid rgba(180, 203, 255, 0.24);
    background:
        linear-gradient(155deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02)),
        rgba(10, 15, 28, 0.76);
    backdrop-filter: blur(6px);
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        border-color 0.25s ease;

    @include mobile {
        min-height: 0;
        padding: 18px 16px;
        border-radius: 14px;
        background:
            linear-gradient(90deg, rgba(89, 127, 255, 0.24) 0 5px, transparent 5px),
            rgba(10, 15, 28, 0.84);
    }

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(circle at 90% 0, rgba(126, 187, 255, 0.28), transparent 42%);
        opacity: 0;
        transition: opacity 0.25s ease;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 38px rgba(0, 0, 0, 0.38);
        border-color: rgba(196, 219, 255, 0.44);

        &::before {
            opacity: 1;
        }
    }

    h2 {
        margin: 8px 0 10px;
        font-size: clamp(22px, 2.6vw, 28px);
        line-height: 1.2;
    }

    .work-desc {
        margin: 0;
        color: rgba(228, 236, 255, 0.84);
        line-height: 1.6;
        font-size: 14px;
    }
}

.cover {
    display: block;
    width: 100%;
    height: 178px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 14px;
    border: 1px solid rgba(180, 202, 255, 0.32);
    background: rgba(0, 0, 0, 0.22);
    transition: transform 0.35s ease;

    @include mobile {
        height: 210px;
    }
}

.work-card:hover .cover {
    transform: scale(1.03);
}

.work-index {
    margin: 0;
    font-size: 12px;
    letter-spacing: 0.2em;
    color: rgba(177, 198, 255, 0.9);
}

.work-link {
    margin-top: auto;
    width: fit-content;
    padding: 9px 14px;
    border-radius: 10px;
    text-decoration: none;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    background: linear-gradient(120deg, #4f6dff 0%, #66d4ff 100%);
    transition:
        filter 0.2s ease,
        transform 0.2s ease;

    span {
        margin-left: 6px;
    }

    &:hover {
        filter: brightness(1.08);
        transform: translateX(2px);
    }
}
</style>
