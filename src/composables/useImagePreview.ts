import PhotoSwipe from "photoswipe";

export interface PreviewImageItem {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
    title?: string;
}

let activePhotoSwipe: PhotoSwipe | null = null;

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

export function openImagePreview(
    payload: string | string[] | PreviewImageItem | PreviewImageItem[],
    options?: { startIndex?: number },
): void {
    const images = normalizeImages(payload);
    if (!images.length) {
        return;
    }

    if (activePhotoSwipe) {
        activePhotoSwipe.close();
        activePhotoSwipe = null;
    }

    const dataSource = images.map((item) => ({
        src: item.src,
        width: item.width ?? 1600,
        height: item.height ?? 900,
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
