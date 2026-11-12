type RequestBody = Record<string, unknown>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidUrl(value: unknown): boolean {
  if (typeof value !== 'string') return false;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
}


export function getLoginError(body: RequestBody = {}): string | null {
  if (!isNonEmptyString(body.email)) return 'Email is required';
  if (!isNonEmptyString(body.password)) return 'Password is required';
  return null;
}

export function getCourseError(body: RequestBody = {}): string | null {
  if (!isNonEmptyString(body.title)) return 'Title is required';
  if (!isNonEmptyString(body.description)) return 'Description is required';
  if (typeof body.price !== 'number' || Number.isNaN(body.price) || body.price < 0) {
    return 'Price must be a number that is 0 or more';
  }
  if (!isValidUrl(body.thumbnailUrl)) {
    return 'Thumbnail URL must be a valid http or https URL';
  }
  return null;
}

export function getLectureError(body: RequestBody = {}): string | null {
  if (!isNonEmptyString(body.title)) return 'Title is required';
  if (!isNonEmptyString(body.description)) return 'Description is required';
  if (!isValidUrl(body.videoUrl)) {
    return 'Video URL must be a valid http or https URL';
  }
  return null;
}

