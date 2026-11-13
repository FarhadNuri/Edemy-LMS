import { getEmbedUrl } from "@/utils/getEmbedUrl";
import { Button } from "@/components/ui/Button";

type VideoPlayerProps = {
  videoUrl: string;
  title: string;
};

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const embedUrl = getEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border border-border bg-slate-900 p-6 text-center text-white shadow-sm">
        <svg
          className="h-12 w-12 text-slate-400 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
          />
        </svg>
        <h3 className="text-base font-semibold">Video cannot be embedded</h3>
        <p className="mt-1 text-xs text-slate-300 max-w-sm">
          This video link cannot be played inside an iframe. You can open and watch it directly in a new tab.
        </p>
        <div className="mt-4">
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="secondary">
              Open video in new tab ↗
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-black aspect-video w-full shadow-sm border border-border">
      <iframe
        src={embedUrl}
        title={title}
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

