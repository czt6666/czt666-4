<template>
    <div class="container-wrapper" id="frontend">
        <div class="container">
            <div class="text">
                <h2>前端<br />作品</h2>
                <!-- <p class="sync-title">{{ activeDestination.title }}</p> -->
            </div>
            <div class="boxes project-cards">
                <div v-for="(item, index) in projectItems" :key="index" class="box project-card">
                    <div
                        class="project-cover"
                        v-lazy-image:bg="item.cover"
                    >
                        <span class="project-index">{{ `0${index + 1}` }}</span>
                    </div>
                    <div class="project-content">
                        <span class="box-title">{{ item.title }}</span>
                        <span class="box-desc">{{ item.desc }}</span>
                        <a :href="item.href" target="_blank" class="box-cta">{{ item.cta }}</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="boxes">
                <div
                    v-for="(dest, index) in destinations"
                    :key="dest.key"
                    class="box dest-block"
                    :data-index="index"
                >
                    <div class="dest-grid">
                        <div
                            v-for="n in 12"
                            v-lazy-image:bg="getDestImageSrc(dest.key, n)"
                            :key="n"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="text">
                <h2>{{ activeDestination.title }}</h2>
                <span>{{ activeDestination.desc }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";

gsap.registerPlugin(ScrollTrigger);

const isMobile = inject("isMobile");

const projectItems = computed(() => {
    const suffix = isMobile?.value ? "-m" : "";
    return [
        {
            title: "国内ChatGPT",
            desc: "AI 对话与工具集合，统一入口与清晰信息层级。",
            href: "https://czt666.cn/gpt",
            cta: "查看项目",
            cover: resolveStaticAssetUrl(`00frontend/gpt${suffix}.jpg`),
        },
        {
            title: "地图相册",
            desc: "按地理位置整理旅途内容，卡片与地图联动浏览。",
            href: "https://czt666.cn/map",
            cta: "查看项目",
            cover: resolveStaticAssetUrl(`00frontend/map${suffix}.jpg`),
        },
        {
            title: "留言墙",
            desc: "轻互动留言体验，支持内容沉淀与情绪化表达。",
            href: "https://czt666.cn/lyq",
            cta: "查看项目",
            cover: resolveStaticAssetUrl(`00frontend/lyq${suffix}.jpg`),
        },
    ];
});

const destinations = ref([
    {
        key: "1xinjiang",
        title: "新疆",
        desc: "雪山、草原与胡杨林，昼夜温差带来的色彩变化。",
    },
    {
        key: "2guangxi",
        title: "广西",
        desc: "喀斯特山水、梯田与海岸线，云雾与光影交织。",
    },
    {
        key: "3neimeng",
        forder: "",
        title: "内蒙",
        desc: "草原、沙地与星空，地平线拉得很长。",
    },
    {
        key: "4hongkong",
        forder: "",
        title: "香港",
        desc: "山城、海湾与夜色霓虹，立体的城市切片。",
    },
]);

const activeIndex = ref(0);
const activeDestination = computed(
    () => destinations.value[activeIndex.value] ?? destinations.value[0],
);

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

    // 根据滚动位置切换左侧标题为当前地点
    const destBlocks = document.querySelectorAll(".dest-block");
    destBlocks.forEach((block, index) => {
        ScrollTrigger.create({
            trigger: block,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: () => {
                activeIndex.value = index;
            },
            onEnterBack: () => {
                activeIndex.value = index;
            },
        });
    });
});

function getDestImageSrc(destKey, imageIndex) {
    return resolveStaticAssetUrl(`${destKey}/top/top-${imageIndex}.jpg`);
}

</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.container-wrapper {
    width: 100%;
    background: #000;
}

.container {
    width: 100%;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: azure;

    h2 {
        font-size: 120px;
        text-align: center;
    }
    span {
        display: block;
        margin-top: 12px;
    }

    p {
        margin-top: 12px;
        color: rgba(240, 255, 255, 0.85);
        letter-spacing: 0.02em;
        font-size: 1.1rem;
    }
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
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: #fff;

    &:last-child {
        margin-bottom: 0;
    }
}

.project-card {
    display: flex;
    flex-direction: column;
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, #101010 0%, #080808 100%);
    border-radius: 20px;
    overflow: hidden;
}

.project-cover {
    width: 100%;
    flex: 1 1 0;
    border-radius: 14px;
    position: relative;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.project-index {
    position: absolute;
    top: 14px;
    left: 14px;
    font-size: 0.8rem;
    line-height: 1;
    letter-spacing: 0.12em;
    padding: 8px 10px;
    border-radius: 999px;
    color: #fff;
    background: rgba(10, 10, 10, 0.35);
    backdrop-filter: blur(6px);
}

.project-content {
    padding: 20px 8px 6px;
    display: flex;
    flex-direction: column;
}

.box-title {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.01em;
}
.box-cta {
    font-size: 0.92rem;
    opacity: 0.92;
    margin-top: 14px;
    color: #d4f4ff;
    letter-spacing: 0.04em;
}
.box-desc {
    font-size: 0.96rem;
    opacity: 0.84;
    margin-top: 10px;
    line-height: 1.7;
}

.sync-title {
    min-height: 1.8em;
}

.dest-grid {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: grid;
    gap: 8px;
    border-radius: 20px;

    // 小屏：2 x 6
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);

    // 中小屏：3 x 4
    @media (min-width: 700px) and (max-width: 1365px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }

    // 中等/桌面：4 x 3
    @media (min-width: 1366px) {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }

    div {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
}
</style>
