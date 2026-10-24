import Image from "next/image";
import type { PhotoCredit } from "@/content/photos";

export function CreditedPhoto({ photo }: { photo: PhotoCredit }) {
  return (
    <figure className="border border-line bg-ink">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        unoptimized
        className="h-auto w-full"
      />
      <figcaption className="space-y-2 px-5 py-4 text-lg">
        <p>{photo.caption}</p>
        <p className="text-muted">
          {photo.photographerUrl ? (
            <a
              href={photo.photographerUrl}
              className="text-blue-bright underline underline-offset-4"
              rel="noreferrer"
            >
              {photo.photographer}
            </a>
          ) : (
            <span className="text-paper">{photo.photographer}</span>
          )}
          {". "}
          {photo.licenceUrl ? (
            <a
              href={photo.licenceUrl}
              className="text-blue-bright underline underline-offset-4"
              rel="noreferrer"
            >
              {photo.licence}
            </a>
          ) : (
            <span className="text-paper">{photo.licence}</span>
          )}
          {". "}
          {photo.changes}{" "}
          <a
            href={photo.sourceUrl}
            className="text-blue-bright underline underline-offset-4"
            rel="noreferrer"
          >
            {photo.sourceLabel}
          </a>
          .
        </p>
      </figcaption>
    </figure>
  );
}
