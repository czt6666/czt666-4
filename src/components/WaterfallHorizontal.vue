<template>
    <div class="waterfall-cont" :style="{ width: lineWidth + 'px' }">
        <div
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="waterfall-row"
        >
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
import { computed } from "vue";

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
        images: WaterfallImage[];
        lineHeight?: number;
        lineWidth?: number;
        margin?: number;
    }>(),
    {
        lineHeight: 300,
        lineWidth: 1080,
        margin: 10,
    }
);

function filledImages(
    images: WaterfallImage[],
    rowHeight: number,
    containerWidth: number,
    gap: number
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
    filledImages(props.images, props.lineHeight, props.lineWidth, props.margin)
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
