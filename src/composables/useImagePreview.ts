import PhotoSwipe from "photoswipe";

export interface PreviewImageItem {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
    title?: string;
}

let activePhotoSwipe: PhotoSwipe | null = null;

function loadImageDimensions(src: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));
        img.src = src;
    });
}

async function resolveImageSizes(
    images: PreviewImageItem[],
): Promise<Array<{ src: string; width: number; height: number; alt?: string; title?: string }>> {
    const hasSize = (item: PreviewImageItem) =>
        item.width != null && item.height != null && item.width > 0 && item.height > 0;

    return Promise.all(
        images.map(async (item) => {
            if (hasSize(item)) {
                return {
                    src: item.src,
                    width: item.width!,
                    height: item.height!,
                    alt: item.alt,
                    title: item.title,
                };
            }
            const { width, height } = await loadImageDimensions(item.src);
            return {
                src: item.src,
                width,
                height,
                alt: item.alt,
                title: item.title,
            };
        }),
    );
}

function normalizeImages(
    payload: string | string[] | PreviewImageItem | PreviewImageItem[],
): PreviewImageItem[] {
    if (typeof payload === "string") {
        return [{ src: payload }];
    }

    if (Array.isArray(payload)) {
        return payload
            .map((item) => {
                if (typeof item === "string") {
                    return { src: item };
                }
                return item;
            })
            .filter((item) => Boolean(item.src));
    }

    return payload.src ? [payload] : [];
}

export async function openImagePreview(
    payload: string | string[] | PreviewImageItem | PreviewImageItem[],
    options?: { startIndex?: number },
): Promise<void> {
    const images = normalizeImages(payload);
    if (!images.length) {
        return;
    }

    if (activePhotoSwipe) {
        activePhotoSwipe.close();
        activePhotoSwipe = null;
    }

    const withSizes = await resolveImageSizes(images);
    const dataSource = withSizes.map((item) => ({
        src: item.src,
        width: item.width,
        height: item.height,
        alt: item.alt ?? "",
        title: item.title,
    }));

    const startIndex = Math.min(
        Math.max(options?.startIndex ?? 0, 0),
        Math.max(dataSource.length - 1, 0),
    );

    const pswp = new PhotoSwipe({
        dataSource,
        index: startIndex,
        loop: dataSource.length > 1,
        showHideAnimationType: "zoom",
        bgOpacity: 0.9,
        wheelToZoom: true,
        pinchToClose: true,
        closeOnVerticalDrag: true,
        spacing: 0.08,
        // 放大方式：滚轮放大缩小；双击图片放大/还原；最大放大倍数提高以便继续放大
        initialZoomLevel: "fit",
        secondaryZoomLevel: 2.5,
        maxZoomLevel: 6,
    });

    pswp.on("destroy", () => {
        if (activePhotoSwipe === pswp) {
            activePhotoSwipe = null;
        }
    });

    activePhotoSwipe = pswp;
    pswp.init();
}

export function closeImagePreview(): void {
    if (activePhotoSwipe) {
        activePhotoSwipe.close();
        activePhotoSwipe = null;
    }
}
