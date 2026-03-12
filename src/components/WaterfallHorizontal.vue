<template>
    <div class="waterfall-cont" :style="{ width: lineWidth + 'px' }">
        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="waterfall-row">
            <div
                v-for="(item, colIndex) in row"
                :key="colIndex"
                class="waterfall-box"
                :style="boxStyle(item)"
            >
                <slot name="item" :info="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

export interface WaterfallImage {
    src: string;
    width: number;
    height: number;
    title?: string;
}

export interface WaterfallBoxItem extends WaterfallImage {
    displayWidth: number;
    displayHeight: number;
}

const props = withDefaults(
    defineProps<{
        images: Array<{ src: string; width?: number; height?: number; title?: string }>;
        lineHeight?: number;
        lineWidth?: number;
        margin?: number;
    }>(),
    {
        lineHeight: 300,
        lineWidth: 1080,
        margin: 10,
    },
);

/** 单张图片加载后读取真实宽高 */
function loadImageDimensions(src: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = reject;
        img.src = src;
    });
}

/** 确保所有图片已加载再返回带真实宽高的列表，供 filledImages 使用 */
async function loadImagesWithDimensions(
    list: Array<{ src: string; width?: number; height?: number; title?: string }>,
): Promise<WaterfallImage[]> {
    const result = await Promise.all(
        list.map(async (item) => {
            const { width, height } = await loadImageDimensions(item.src);
            return {
                src: item.src,
                width,
                height,
                title: item.title,
            };
        }),
    );
    return result;
}

const imagesWithDimensions = ref<WaterfallImage[]>([]);

watch(
    () => props.images,
    async (newImages) => {
        if (!newImages?.length) {
            imagesWithDimensions.value = [];
            return;
        }
        try {
            imagesWithDimensions.value = await loadImagesWithDimensions(newImages);
        } catch (e) {
            console.error("WaterfallHorizontal: load images failed", e);
            imagesWithDimensions.value = [];
        }
    },
    { immediate: true },
);

function filledImages(
    images: WaterfallImage[],
    rowHeight: number,
    containerWidth: number,
    gap: number,
): WaterfallBoxItem[][] {
    const rows: WaterfallBoxItem[][] = [];
    let i = 0;

    while (i < images.length) {
        let totalWidth = 0;
        let totalRowWidth = 0;
        let minPay = Number.MAX_VALUE;
        let picCount = 0;
        const rowImg: WaterfallBoxItem[] = [];

        for (let j = i; j < images.length; j++, picCount++) {
            const img = images[j];
            const scaledWidth = (rowHeight / img.height) * img.width;
            totalWidth += scaledWidth;
            const pay = totalWidth - (containerWidth - gap * picCount);

            if (Math.abs(pay) > Math.abs(minPay)) break;

            minPay = pay;
            totalRowWidth += scaledWidth;
            rowImg.push({
                ...img,
                displayHeight: rowHeight,
                displayWidth: scaledWidth,
            });
        }

        i += picCount;
        if (rowImg.length === 0) break;

        const diff = -minPay;
        for (let k = 0; k < rowImg.length; k++) {
            const ratio = totalRowWidth > 0 ? (diff * rowImg[k].displayWidth) / totalRowWidth : 0;
            rowImg[k].displayWidth = rowImg[k].displayWidth + ratio;
        }
        rows.push(rowImg);
    }

    return rows;
}

const rows = computed(() =>
    filledImages(imagesWithDimensions.value, props.lineHeight, props.lineWidth, props.margin),
);

function boxStyle(item: WaterfallBoxItem) {
    const { margin } = props;
    return {
        height: item.displayHeight + "px",
        width: item.displayWidth + "px",
        margin: `0 ${margin}px ${margin}px 0`,
    };
}
</script>

<style scoped>
.waterfall-cont {
    overflow: hidden;
    margin: 0 auto;
}

.waterfall-row {
    width: 9999px;
    display: block;
}

.waterfall-row::after {
    content: "";
    display: table;
    clear: both;
}

.waterfall-box {
    overflow: hidden;
    float: left;
}
</style>
