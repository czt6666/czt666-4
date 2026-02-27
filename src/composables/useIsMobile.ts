import { ref, onMounted, onBeforeUnmount } from "vue";

/** 与 variables.scss 中 $breakpoint-mobile 保持一致 */
const MOBILE_MAX_WIDTH = 767;

/**
 * 全局「是否移动端」：响应式，随窗口 resize 更新。
 * 在组件内使用 useIsMobile()，或在根 provide 后子组件 inject('isMobile')。
 */
export function useIsMobile() {
    const isMobile = ref(typeof window !== "undefined" ? window.innerWidth <= MOBILE_MAX_WIDTH : false);

    function update() {
        isMobile.value = window.innerWidth <= MOBILE_MAX_WIDTH;
    }

    onMounted(() => {
        window.addEventListener("resize", update);
        update();
    });

    onBeforeUnmount(() => {
        window.removeEventListener("resize", update);
    });

    return { isMobile };
}
