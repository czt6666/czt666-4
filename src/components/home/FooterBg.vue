<template>
    <footer class="footer-bg">
        <div class="footer-content">
            <div class="footer-title-wrap">
                <span
                    v-for="(c, i) in chars"
                    :key="i"
                    class="footer-char"
                    :class="{ dot: c === '.' }"
                    :style="{ '--delay': (delays[i] ?? 0) + 'ms', '--i': i }"
                >
                    {{ c }}
                </span>
            </div>
            <div class="footer-title-erosion" aria-hidden="true">CZT666.CN</div>
            <div class="footer-glitch" aria-hidden="true">CZT666.CN</div>
            <img src="https://picsum.photos/id/1063/1920/1080" alt="footer" />
        </div>
    </footer>
</template>

<script setup>
import { ref } from "vue";

const imageUrl = "https://picsum.photos/id/1063/1920/1080";
const title = "CZT666.CN";
const chars = ref(title.split(""));
const delays = ref(chars.value.map(() => Math.floor(Math.random() * 600) + 100));
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.footer-bg {
    width: 100%;
    height: $footer-height;
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

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
}

.footer-title-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #fff;
    text-shadow:
        0 0 40px rgba(255, 255, 255, 0.4),
        0 0 80px rgba(255, 255, 255, 0.2),
        0 2px 4px rgba(0, 0, 0, 0.5),
        0 4px 12px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    animation: title-breathe 3s ease-in-out infinite;
}

@keyframes title-breathe {
    0%,
    100% {
        text-shadow:
            0 0 40px rgba(255, 255, 255, 0.4),
            0 0 80px rgba(255, 255, 255, 0.2),
            0 2px 4px rgba(0, 0, 0, 0.5),
            0 4px 12px rgba(0, 0, 0, 0.4);
    }
    50% {
        text-shadow:
            0 0 56px rgba(255, 255, 255, 0.5),
            0 0 100px rgba(255, 255, 255, 0.25),
            0 2px 4px rgba(0, 0, 0, 0.5),
            0 4px 12px rgba(0, 0, 0, 0.4);
    }
}

.footer-char {
    opacity: 0;
    filter: blur(12px);
    transform: scale(0.6) translateY(20px);
    animation: char-reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: var(--delay, 0ms);
}

.footer-char.dot {
    margin: 0 0.05em;
    animation-duration: 0.8s;
}

@keyframes char-reveal {
    0% {
        opacity: 0;
        filter: blur(12px);
        transform: scale(0.6) translateY(20px);
    }
    50% {
        filter: blur(4px);
    }
    100% {
        opacity: 1;
        filter: blur(0);
        transform: scale(1) translateY(0);
    }
}

/* 侵蚀层：底层模糊 + 混合 */
.footer-title-erosion {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    font-size: 48px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: transparent;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.5) 40%,
        rgba(255, 255, 255, 0.2) 70%,
        rgba(255, 255, 255, 0.05) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    filter: blur(2px);
    opacity: 0.6;
    animation: erosion-pulse 4s ease-in-out infinite;
    pointer-events: none;
}

@keyframes erosion-pulse {
    0%,
    100% {
        opacity: 0.5;
        filter: blur(2px);
    }
    50% {
        opacity: 0.75;
        filter: blur(3px);
    }
}

/* 故障/闪烁层 */
.footer-glitch {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    font-size: 48px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: transparent;
    background: linear-gradient(90deg, #0ff, #f0f, #ff0);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    opacity: 0;
    animation: glitch 6s linear infinite;
    pointer-events: none;
}

@keyframes glitch {
    0%,
    92%,
    100% {
        opacity: 0;
        transform: translate(-50%, -50%);
    }
    93% {
        opacity: 0.15;
        transform: translate(calc(-50% - 4px), -50%) skewX(-2deg);
    }
    94% {
        opacity: 0;
        transform: translate(calc(-50% + 3px), -50%) skewX(1deg);
    }
    95% {
        opacity: 0.2;
        transform: translate(-50%, -50%);
    }
    96% {
        opacity: 0;
    }
}
</style>
