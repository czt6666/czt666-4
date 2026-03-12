<template>
    <div class="travel-journey-page">
        <AppHeader />

        <main class="journey-main">
            <section class="hero">
                <p class="eyebrow">Travel</p>
                <h1>旅游经历</h1>
            </section>

            <section
                v-for="(item, index) in destinations"
                :key="item.key"
                class="journey-item"
                :data-index="index"
            >
                <header class="journey-header">
                    <div class="journey-text">
                        <h2>{{ item.title }}</h2>
                        <p class="journey-desc">{{ item.desc }}</p>
                    </div>
                    <div class="journey-actions">
                        <RouterLink :to="item.viewAllPath" class="action-link action-all">
                            查看全部
                        </RouterLink>
                        <a
                            :href="mapHref(item.mapQuery)"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="action-link action-map"
                        >
                            在地图上查看
                            <span class="action-icon" aria-hidden="true">↗</span>
                        </a>
                    </div>
                </header>
                <div class="journey-grid">
                    <div
                        v-for="n in item.imageCount"
                        :key="n"
                        class="grid-cell"
                        :style="{ backgroundImage: `url(${getImageSrc(item.key, n)})` }"
                    />
                </div>
            </section>
        </main>
    </div>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/AppHeader.vue";
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";

const MAP_BASE = "https://czt666.cn/map";

type Destination = {
    key: string;
    title: string;
    desc: string;
    imageCount: 6 | 12;
    /** 查看全部跳转的路由路径 */
    viewAllPath: string;
    /** 地图链接 query，最终跳转 czt666.cn/map?xxx，可手动配置 */
    mapQuery: string;
};

const destinations: Destination[] = [
    {
        key: "1xinjiang",
        title: "新疆",
        desc: "雪山、草原、戈壁，昼夜温差带来的色彩变化",
        imageCount: 12,
        viewAllPath: "/trip/xinjiang",
        mapQuery: "xinjiang",
    },
    {
        key: "2guangxi",
        title: "广西",
        desc: "喀斯特山水、海岸线、云海，云雾与流光交织",
        imageCount: 12,
        viewAllPath: "/trip/guangxi",
        mapQuery: "guangxi",
    },
    {
        key: "3neimeng",
        title: "内蒙",
        desc: "星空、草原与沙地，地平线拉得很长。",
        imageCount: 12,
        viewAllPath: "/trip/neimeng",
        mapQuery: "neimeng",
    },
    {
        key: "4hongkong",
        title: "香港",
        desc: "山城、海湾、城市夜景，立体的城市切片。",
        imageCount: 12,
        viewAllPath: "/trip/hongkong",
        mapQuery: "hongkong",
    },
];

// 供模板使用：地图链接
const mapHref = (query: string) => (query ? `${MAP_BASE}?${query}` : MAP_BASE);

function getImageSrc(destKey: string, imageIndex: number): string {
    return resolveStaticAssetUrl(`${destKey}/top/top-${imageIndex}.jpg`);
}
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;

.travel-journey-page {
    min-height: 100vh;
    color: #eef3ff;
    background:
        radial-gradient(circle at 20% 10%, rgba(30, 60, 90, 0.4), transparent 40%),
        radial-gradient(circle at 80% 90%, rgba(40, 70, 100, 0.25), transparent 40%),
        linear-gradient(160deg, #0a0d14 0%, #0f141c 50%, #080b10 100%);
}

.journey-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 112px 24px 40px;

    @include mobile {
        padding: 86px 16px 28px;
    }
}

.hero {
    margin-bottom: 28px;

    .eyebrow {
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(196, 214, 255, 0.8);
        margin-bottom: 8px;
    }

    h1 {
        margin: 0;
        font-size: clamp(32px, 5.5vw, 52px);
        line-height: 1.15;
        letter-spacing: 0.02em;
    }
}

.journey-item {
    width: 100%;
    margin-bottom: 32px;

    @include mobile {
        margin-bottom: 24px;
    }

    &:last-child {
        margin-bottom: 0;
    }
}

.journey-header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 12px;

    @include mobile {
        margin-bottom: 10px;
        gap: 16px;
    }
}

.journey-text {
    flex: 1;
    min-width: 0;
}

.journey-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;

    @include mobile {
        gap: 6px;
    }
}

.action-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition:
        opacity 0.2s ease,
        background 0.2s ease;

    &.action-all {
        color: #fff;
        background: linear-gradient(120deg, #4f6dff 0%, #66d4ff 100%);

        &:hover {
            opacity: 0.92;
        }
    }

    &.action-map {
        color: rgba(230, 238, 255, 0.95);
        border: 1px solid rgba(180, 202, 255, 0.4);

        &:hover {
            background: rgba(255, 255, 255, 0.08);
        }
    }
}

.action-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

.journey-index {
    display: inline-block;
    font-size: 12px;
    letter-spacing: 0.2em;
    color: rgba(177, 198, 255, 0.9);
    margin-bottom: 6px;
}

.journey-header h2 {
    margin: 0 0 8px;
    font-size: clamp(24px, 3vw, 32px);
    line-height: 1.2;
    font-weight: 600;
}

.journey-desc {
    margin: 0;
    font-size: 15px;
    line-height: 1.55;
    color: rgba(224, 233, 255, 0.82);
}

/* PC：一行 6 个，6 张 1 行，12 张 2 行 */
.journey-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
    width: 100%;

    @include mobile {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
    }
}

.grid-cell {
    width: 100%;
    aspect-ratio: 4 / 3;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    border: 1px solid rgba(180, 202, 255, 0.15);
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;

    @include mobile {
        border-radius: 8px;
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }
}
</style>
