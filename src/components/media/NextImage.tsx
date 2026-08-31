import type { CSSProperties, ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  width?: number | string;
  height?: number | string;
  sizes?: string;
  style?: CSSProperties;
};

/**
 * Plain-image replacement for the framework `Image` component the original
 * site used. `fill` maps to absolute inset-0 sizing.
 */
export default function Image({
  fill,
  priority,
  quality: _q,
  style,
  className,
  ...rest
}: Props) {
  const fillStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : {};

  return (
    <img
      {...rest}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      style={{ ...fillStyle, ...style }}
    />
  );
}
