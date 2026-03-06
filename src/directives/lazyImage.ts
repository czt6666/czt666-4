import type { Directive, DirectiveBinding } from "vue";

type LazyMode = "img" | "bg";

type LazyBindingValue = string | { src: string; mode?: LazyMode };

interface LazyState {
    src: string;
    mode: LazyMode;
    version: number;
}

interface LazyDirectiveOptions {
    maxConcurrent?: number;
}

const states = new WeakMap<HTMLElement, LazyState>();

const observer =
    typeof window !== "undefined" && "IntersectionObserver" in window
        ? new IntersectionObserver(onIntersect, {
              root: null,
              rootMargin: "300px 0px",
              threshold: 0.01,
          })
        : null;

const waitQueue: Array<() => void> = [];
let activeRequests = 0;
let maxConcurrentRequests = 4;

function enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        const run = () => {
            activeRequests += 1;
            task()
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    activeRequests -= 1;
                    runNext();
                });
        };
        waitQueue.push(run);
        runNext();
    });
}

function runNext(): void {
    while (activeRequests < maxConcurrentRequests && waitQueue.length) {
        const nextTask = waitQueue.shift();
        nextTask?.();
    }
}

function loadImage(src: string): Promise<void> {
    return enqueue(
        () =>
            new Promise((resolve, reject) => {
                const image = new Image();
                image.decoding = "async";
                image.onload = () => resolve();
                image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                image.src = src;
            }),
    );
}

function parseBinding(binding: DirectiveBinding<LazyBindingValue>): { src: string; mode: LazyMode } {
    if (typeof binding.value === "string") {
        return {
            src: binding.value,
            mode: binding.arg === "bg" ? "bg" : "img",
        };
    }

    return {
        src: binding.value?.src ?? "",
        mode: binding.value?.mode ?? (binding.arg === "bg" ? "bg" : "img"),
    };
}

function applyToElement(el: HTMLElement, src: string, mode: LazyMode): void {
    if (mode === "img" && el instanceof HTMLImageElement) {
        el.src = src;
        el.loading = "lazy";
        return;
    }
    el.style.backgroundImage = `url("${src}")`;
}

function observeElement(el: HTMLElement): void {
    if (observer) {
        observer.observe(el);
        return;
    }
    void loadForElement(el);
}

function onIntersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }
        const target = entry.target as HTMLElement;
        observer?.unobserve(target);
        void loadForElement(target);
    });
}

async function loadForElement(el: HTMLElement): Promise<void> {
    const state = states.get(el);
    if (!state || !state.src) {
        return;
    }

    const snapshotVersion = state.version;
    try {
        await loadImage(state.src);
    } catch {
        return;
    }

    const latestState = states.get(el);
    if (!latestState || latestState.version !== snapshotVersion) {
        return;
    }
    applyToElement(el, latestState.src, latestState.mode);
}

function bindElement(el: HTMLElement, binding: DirectiveBinding<LazyBindingValue>): void {
    const parsed = parseBinding(binding);
    if (!parsed.src) {
        return;
    }

    const prevVersion = states.get(el)?.version ?? 0;
    states.set(el, {
        src: parsed.src,
        mode: parsed.mode,
        version: prevVersion + 1,
    });

    if (parsed.mode === "img" && el instanceof HTMLImageElement) {
        el.removeAttribute("src");
    }
    if (parsed.mode === "bg") {
        el.style.backgroundImage = "none";
    }

    observeElement(el);
}

export function createLazyImageDirective(options?: LazyDirectiveOptions): Directive<HTMLElement, LazyBindingValue> {
    maxConcurrentRequests = Math.max(1, options?.maxConcurrent ?? 4);

    return {
        mounted(el, binding) {
            bindElement(el, binding);
        },
        updated(el, binding) {
            const next = parseBinding(binding);
            const prev = parseBinding({
                ...binding,
                value: binding.oldValue,
            } as DirectiveBinding<LazyBindingValue>);

            if (next.src !== prev.src || next.mode !== prev.mode) {
                observer?.unobserve(el);
                bindElement(el, binding);
            }
        },
        unmounted(el) {
            observer?.unobserve(el);
            states.delete(el);
        },
    };
}
