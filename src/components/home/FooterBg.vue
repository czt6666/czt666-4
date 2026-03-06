<template>
    <footer class="footer-bg">
        <div class="footer-content">
            <div class="footer-title" aria-label="CZT666.CN">
                <svg
                    class="footer-title-svg"
                    viewBox="0 0 1200 240"
                    role="img"
                    aria-label="CZT666.CN"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <text class="footer-title-stroke" x="50%" y="52%">CZT666.CN</text>
                    <text class="footer-title-fill" x="50%" y="52%">CZT666.CN</text>
                </svg>
            </div>
            <img v-lazy-image="footerImage" alt="footer" />
        </div>
    </footer>
</template>

<script setup>
import { resolveStaticAssetUrl } from "@/composables/resolveStaticAssetUrl";

const footerImage = resolveStaticAssetUrl("8footer/footer.jpg");
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.footer-bg {
    width: 100%;
    height: $footer-height;

    @include mobile {
        height: $footer-height-mobile;
    }
}

.footer-content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: $footer-height;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @include mobile {
        height: $footer-height-mobile;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
}

.footer-content::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
        linear-gradient(
            180deg,
            rgba(5, 8, 16, 0.08) 0%,
            rgba(5, 8, 16, 0.26) 60%,
            rgba(5, 8, 16, 0.5) 100%
        ),
        radial-gradient(circle at 50% 50%, rgba(98, 206, 255, 0.14), transparent 54%);
    pointer-events: none;
    z-index: 1;
}

.footer-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 100%;
    max-width: min(1200px, 92vw);
    pointer-events: none;
}

.footer-title-svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
}

.footer-title-stroke,
.footer-title-fill {
    text-anchor: middle;
    dominant-baseline: middle;
    font-size: 150px;
    font-weight: 800;
    letter-spacing: 0.08em;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}

.footer-title-stroke {
    fill: transparent;
    stroke: rgba(232, 245, 255, 0.95);
    stroke-width: 2.2;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-dasharray: 1800;
    stroke-dashoffset: 1800;
    filter: drop-shadow(0 0 8px rgba(158, 226, 255, 0.35));
    animation: stroke-reveal 6.4s ease-in-out infinite;
}

.footer-title-fill {
    fill: rgba(245, 252, 255, 0.96);
    opacity: 0;
    filter: drop-shadow(0 0 12px rgba(137, 214, 255, 0.42))
        drop-shadow(0 2px 12px rgba(0, 0, 0, 0.35));
    animation: fill-reveal 6.4s ease-in-out infinite;
}

@keyframes stroke-reveal {
    0%,
    8% {
        stroke-dashoffset: 1800;
        opacity: 0;
    }
    12% {
        opacity: 1;
    }
    56% {
        stroke-dashoffset: 0;
        opacity: 1;
    }
    84% {
        stroke-dashoffset: 0;
        opacity: 0.45;
    }
    100% {
        stroke-dashoffset: -220;
        opacity: 0;
    }
}

@keyframes fill-reveal {
    0%,
    52% {
        opacity: 0;
    }
    66% {
        opacity: 0.92;
    }
    82% {
        opacity: 1;
    }
    90% {
        opacity: 0.6;
    }
    100% {
        opacity: 0;
    }
}

@include mobile {
    .footer-title {
        max-width: min(980px, 94vw);
    }

    .footer-title-stroke,
    .footer-title-fill {
        font-size: 175px;
        letter-spacing: 0.06em;
    }
}
</style>
