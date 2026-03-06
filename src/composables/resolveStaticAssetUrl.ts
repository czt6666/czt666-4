function normalizeStaticPath(path: string): string {
    return path
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")
        .replace(/^src\/assets\/static\//, "")
        .replace(/^assets\/static\//, "")
        .replace(/^static\//, "");
}

export function resolveStaticAssetUrl(path: string): string {
    const normalized = normalizeStaticPath(path);
    const base = import.meta.env.BASE_URL || "/";
    const safeBase = base.endsWith("/") ? base : `${base}/`;
    return `${safeBase}static/${normalized}`;
}
