"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function ImageLightbox({ src, alt, className }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      {/* Thumbnail image - clickable */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ""}
        className={cn(
          "my-6 rounded-lg border border-slate-200 shadow-sm dark:border-slate-700 cursor-pointer hover:opacity-90 transition-opacity",
          className
        )}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      />

      {/* Lightbox overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsOpen(false);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Image preview"}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close image preview"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Full-size image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || ""}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Alt text caption */}
          {alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[80vw] rounded-lg bg-black/60 px-4 py-2 text-center text-sm text-white">
              {alt}
            </div>
          )}
        </div>
      )}
    </>
  );
}
