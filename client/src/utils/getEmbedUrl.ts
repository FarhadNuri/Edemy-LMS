
export function getEmbedUrl(videoUrl: string): string | null {
  const url = videoUrl.trim();
  if (url.includes("youtube.com/watch")) {
    try {
      const videoId = new URL(url).searchParams.get("v");
      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return null;
    }
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    if (!videoId) return null;
    return `https://player.vimeo.com/video/${videoId}`;
  }

  return null;
}

