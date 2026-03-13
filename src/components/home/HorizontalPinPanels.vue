<template>
    <section class="wrapper" id="travel-route">
        <div v-for="panel in seasonPanels" :key="panel.key" class="panel" :class="panel.className">
            <div class="grid">
                <div
                    v-for="image in panel.images"
                    :key="`${panel.key}-${image.position}`"
                    class="cell"
                    v-lazy-image:bg="image.src"
                ></div>

                <div class="center">
                    <h2>{{ panel.title }}</h2>
                    <p>{{ panel.desc }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, inject, computed } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";

gsap.registerPlugin(ScrollTrigger);

const isMobile = inject<Ref<boolean>>("isMobile");
const seasonBasePath = "5beijing";

const basePanels = [
    {
        key: "spring",
        className: "p1",
        folder: "0spring",
        title: "北京 · 春",
        desc: "玉兰初绽，风里有花香。",
    },
    {
        key: "summer",
        className: "p2",
        folder: "3summer",
        title: "北京 · 夏",
        desc: "绿荫渐深，骤雨后天色清亮。",
    },
    {
        key: "autumn",
        className: "p3",
        folder: "1autumn",
        title: "北京 · 秋",
        desc: "银杏与红叶，把街道染成金黄。",
    },
    {
        key: "winter",
        className: "p4",
        folder: "2winter",
        title: "北京 · 冬",
        desc: "雪落城墙，空气清冽而安静。",
    },
];
const seasonPanels = computed(() => {
    return basePanels.map((panel) => {
        const images = Array.from({ length: 12 }, (_, idx) => {
            const imageIndex = idx + 1;
            return {
                position: imageIndex,
                src: resolveStaticAssetUrl(
                    `${seasonBasePath}/${panel.folder}/top/top-${imageIndex}.jpg`,
                ),
            };
        });

        return {
            ...panel,
            images,
        };
    });
});

onMounted(() => {
    const trigger = document.querySelector("#travel-route");
    if (!trigger) return;
    const sections = gsap.utils.toArray(".panel");
    const segmentCount = sections.length - 1;
    const step = 1 / segmentCount;
    const snapThreshold = step * (isMobile?.value ? 0.12 : 0.06); // PC 阈值减半
    // 拉长滚动距离，降低灵敏度，整体仍保持连续滚动
    const getEnd = () => {
        const w = trigger.getBoundingClientRect().width - 1;
        const distanceFactor = isMobile?.value ? 2.5 : 1.35;
        return "+=" + w * distanceFactor;
    };

    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: "#travel-route",
            pin: true,
            scrub: 0.7,
            snap: {
                snapTo: (progress) => {
                    const nearest = Math.round(progress / step) * step;
                    return Math.abs(nearest - progress) <= snapThreshold ? nearest : progress;
                },
                delay: 0.02,
                duration: { min: 0.05, max: 0.12 },
                ease: "power1.out",
                inertia: false,
            },
            end: getEnd,
            onRefresh(self) {
                const trigger = self.trigger;
                if (!trigger) return;
                const spacer = trigger.parentElement;
                if (spacer?.classList?.contains("pin-spacer")) {
                    const w = trigger.getBoundingClientRect().width;
                    spacer.style.width = `${w - 1}px`;
                }
            },
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
    overflow: hidden;
    flex: 0 0 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    color: #fff;
    padding: 12px;
}

.grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(4, minmax(0, 1fr));
    gap: 12px;
}

.cell {
    border-radius: 14px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.24);
}

.center {
    grid-column: 2 / span 2;
    grid-row: 2 / span 2;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    z-index: 2;

    h2 {
        margin: 0;
        max-width: 100%;
        font-size: clamp(2rem, 5vw, 4.2rem);
        font-weight: 900;
        letter-spacing: 0.1em;
        line-height: 1.05;
        word-break: break-word;
        text-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    }

    p {
        margin: 10px 0 0;
        max-width: 100%;
        font-size: clamp(0.95rem, 1.8vw, 1.45rem);
        font-weight: 600;
        opacity: 0.98;
        line-height: 1.45;
        word-break: break-word;
        overflow-wrap: anywhere;
    }
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(7, minmax(0, 1fr));
    }

    .center {
        grid-column: 1 / span 2;
        grid-row: 4 / span 1;
        border-radius: 14px;
        padding: 0.8rem 0.65rem;

        h2 {
            font-size: clamp(1.6rem, 8.6vw, 2.6rem);
            letter-spacing: 0.08em;
        }

        p {
            margin-top: 6px;
            font-size: clamp(0.8rem, 3.8vw, 1.15rem);
            line-height: 1.35;
        }
    }
}

.p1 {
    background: linear-gradient(135deg, #8bcf7a 0%, #4e9b58 100%);
}
.p2 {
    background: linear-gradient(135deg, #2f6f8f 0%, #43b8a5 100%);
}
.p3 {
    background: linear-gradient(135deg, #b66a2a 0%, #e3a544 100%);
}
.p4 {
    background: linear-gradient(135deg, #7f8ea5 0%, #c7d2df 100%);
}
</style>
