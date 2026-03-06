<template>
    <div class="slide-sections-root" id="travel-story">
        <section v-for="item in artSections" :key="item.key">
            <div class="box2" :class="item.className">
                <div class="box2-head">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.desc }}</p>
                </div>
                <div class="box2-grid">
                    <div
                        v-for="img in item.images"
                        :key="`${item.key}-${img}`"
                        class="box2-cell"
                        :style="getArtImageStyle(item.folder, img)"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";

const artSections = [
    {
        key: "building",
        className: "b1",
        folder: "0building",
        title: "建筑",
        desc: "线条、体块与光影，城市空间的秩序感。",
        images: Array.from({ length: 12 }, (_, i) => i + 1),
    },
    {
        key: "star",
        className: "b2",
        folder: "1star",
        title: "星空",
        desc: "银河、流云与地景，夜色中的时间切片。",
        images: Array.from({ length: 12 }, (_, i) => i + 1),
    },
    {
        key: "fly",
        className: "b3",
        folder: "2fly",
        title: "飞行",
        desc: "航线、机翼与窗景，旅途在云层之间展开。",
        images: Array.from({ length: 12 }, (_, i) => i + 1),
    },
    {
        key: "hangzhan",
        className: "b4",
        folder: "3hangzhan",
        title: "航展",
        desc: "速度与力量的瞬间，金属在天空中发光。",
        images: Array.from({ length: 12 }, (_, i) => i + 1),
    },
];

onMounted(() => {
    document.querySelectorAll(".box2").forEach((box) => {
        gsap.fromTo(
            box,
            { x: "-100vw", opacity: 0 },
            {
                x: "0vw",
                opacity: 1,
                scrollTrigger: {
                    trigger: box,
                    start: "top 100%",
                    end: "top 25%",
                    scrub: true,
                },
            },
        );

        gsap.fromTo(
            box,
            { x: "0vw", opacity: 1 },
            {
                x: "100vw",
                opacity: 0,
                scrollTrigger: {
                    trigger: box,
                    start: "bottom 25%",
                    end: "bottom 0%",
                    scrub: true,
                },
            },
        );
    });
});

function getArtImageStyle(folder, imageIndex) {
    return {
        backgroundImage: `url(${resolveStaticAssetUrl(`6art/${folder}/top/top-${imageIndex}.jpg`)})`,
    };
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.slide-sections-root {
    background: #111;
}

section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 2px solid #ccc;
}

.box2 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding: 1.2rem;
    color: white;
    transform: translateX(-100vw);

    @include mobile {
        padding: 0.75rem;
    }
}

.box2-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding: 0 4px;

    @include mobile {
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
    }
}

.box2 h3 {
    font-size: clamp(1.8rem, 3vw, 3rem);
    margin: 0;
    font-weight: 800;
    letter-spacing: 0.04em;
}
.box2 p {
    margin: 0;
    font-size: clamp(0.86rem, 1.2vw, 1.1rem);
    opacity: 0.95;
}

.box2-grid {
    flex: 1;
    min-height: 0;
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));

    @media (min-width: 700px) and (max-width: 1365px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(4, minmax(0, 1fr));
    }

    @media (min-width: 1366px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-template-rows: repeat(3, minmax(0, 1fr));
    }
}

.box2-cell {
    border-radius: 12px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
}

.b1 {
    background: linear-gradient(135deg, #202830 0%, #35485a 100%);
}
.b2 {
    background: linear-gradient(135deg, #0e1f3a 0%, #1b3f73 100%);
}
.b3 {
    background: linear-gradient(135deg, #1b2a45 0%, #2f5b8d 100%);
}
.b4 {
    background: linear-gradient(135deg, #212632 0%, #394257 100%);
}
</style>
