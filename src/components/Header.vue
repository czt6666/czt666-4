<template>
    <header
        class="nav-bar"
        :class="{
            compact: scrollY > vh100,
            hide: scrollY > vh500 && !menuOpen,
            'menu-open': menuOpen,
        }"
    >
        <div class="container">
            <RouterLink to="/" class="logo" @click="menuOpen = false">作品集</RouterLink>
            <button
                type="button"
                class="menu-trigger"
                aria-label="打开菜单"
                :aria-expanded="menuOpen"
                @click="menuOpen = !menuOpen"
            >
                <span class="line" />
                <span class="line" />
                <span class="line" />
            </button>
            <nav class="right" :aria-hidden="!menuOpen">
                <RouterLink :to="{ path: '/', hash: '#frontend' }" @click="menuOpen = false">前端作品</RouterLink>
                <RouterLink :to="{ path: '/', hash: '#travel-story' }" @click="menuOpen = false">旅游经历</RouterLink>
                <RouterLink :to="{ path: '/', hash: '#photo' }" @click="menuOpen = false">照片墙</RouterLink>
                <RouterLink to="/old" class="old-version" title="旧版" @click="menuOpen = false">
                    <span class="old-version-text">旧版</span>
                    <span class="old-version-logo" aria-hidden="true">↗</span>
                </RouterLink>
            </nav>
        </div>
        <div class="nav-overlay" aria-hidden="true" @click="menuOpen = false" />
    </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const scrollY = ref(0);
const vh100 = window.innerHeight;
const vh500 = window.innerHeight * 5;
const menuOpen = ref(false);

const updateScroll = () => {
    scrollY.value = window.scrollY;
};

onMounted(() => {
    window.addEventListener("scroll", updateScroll, { passive: true });
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", updateScroll);
});
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $header-height;
    padding: 0 $header-padding-x;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.35s ease;
    z-index: 999;

    @include mobile {
        height: $header-height-mobile;
        padding: 0 $header-padding-x-mobile;
    }

    &.compact {
        background: linear-gradient(
            to bottom,
            rgba(12, 12, 14, 0.82) 0%,
            rgba(12, 12, 14, 0.68) 18%,
            rgba(12, 12, 14, 0.48) 38%,
            rgba(12, 12, 14, 0.26) 58%,
            rgba(12, 12, 14, 0.09) 76%,
            rgba(12, 12, 14, 0) 100%
        );
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
    }

    &.hide {
        opacity: 0;
        pointer-events: none;
        transform: translateY(-8px);
    }

    &.menu-open .right {
        @include mobile {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
        }
    }
}

.nav-overlay {
    display: none;
    @include mobile {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: -1;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, visibility 0.25s ease;
    }
    .nav-bar.menu-open & {
        @include mobile {
            opacity: 1;
            visibility: visible;
            z-index: 998;
        }
    }
}

.container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;

    @include mobile {
        padding: 0 4px;
    }

    .logo {
        font-weight: 600;
        font-size: 1.2rem;
        letter-spacing: 0.06em;
        color: #fff;
        text-decoration: none;
        transition: opacity 0.25s ease;

        @include mobile {
            font-size: 1.05rem;
        }

        &:hover {
            opacity: 0.9;
        }

        &:focus-visible {
            outline: 2px solid rgba(255, 255, 255, 0.5);
            outline-offset: 4px;
        }
    }

    .menu-trigger {
        display: none;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        width: 40px;
        height: 40px;
        padding: 8px;
        border: none;
        background: transparent;
        color: #fff;
        cursor: pointer;
        border-radius: 8px;
        transition: background 0.25s ease;

        @include mobile {
            display: flex;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .line {
            display: block;
            width: 100%;
            height: 2px;
            background: currentColor;
            border-radius: 1px;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .nav-bar.menu-open & .line:nth-child(1) {
            transform: translateY(4px) rotate(45deg);
        }
        .nav-bar.menu-open & .line:nth-child(2) {
            opacity: 0;
        }
        .nav-bar.menu-open & .line:nth-child(3) {
            transform: translateY(-4px) rotate(-45deg);
        }
    }

    nav.right {
        display: flex;
        align-items: center;
        gap: 12px;

        @include mobile {
            position: fixed;
            top: $header-height-mobile;
            right: 0;
            width: min(280px, 85vw);
            height: calc(100vh - #{$header-height-mobile});
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: $content-gap-mobile;
            background: rgba(12, 12, 14, 0.98);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            opacity: 0;
            visibility: hidden;
            transform: translateX(100%);
            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
            z-index: 997;
            border-left: 1px solid rgba(255, 255, 255, 0.08);
        }

        a {
            padding: 8px 14px;
            color: rgba(255, 255, 255, 0.82);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            letter-spacing: 0.02em;
            border-radius: 8px;
            transition:
                color 0.25s ease,
                background 0.25s ease;

            @include mobile {
                padding: 14px 16px;
                font-size: 1rem;
                border-radius: 10px;
            }

            &:hover {
                color: #fff;
                background: rgba(255, 255, 255, 0.08);
            }

            &:focus-visible {
                outline: 2px solid rgba(255, 255, 255, 0.5);
                outline-offset: 2px;
            }
        }

        .old-version {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;

            @include mobile {
                padding: 14px 16px;
            }
        }

        .old-version-text {
            font-size: 0.9rem;
            font-weight: 500;
        }

        .old-version-logo {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            font-size: 12px;
            font-weight: 700;
            line-height: 1;
            color: rgba(255, 255, 255, 0.9);
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            transition: transform 0.25s ease;
        }
    }
}
</style>
