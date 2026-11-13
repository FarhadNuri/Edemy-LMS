function isHttpUrl(value: string): boolean {
  const trimmedValue = value.trim();
  return trimmedValue.startsWith("http://") || trimmedValue.startsWith("https://");
}

export function getCourseFormError(values: {
  title: string;
  description: string;
  price: string;
  thumbnailUrl: string;
}): string {
  if (values.title.trim() === "") return "Title is required.";
  if (values.title.trim().length > 120) return "Title must be 120 characters or fewer.";
  if (values.description.trim() === "") return "Description is required.";

  const priceNumber = Number(values.price);
  if (values.price.trim() === "" || Number.isNaN(priceNumber)) return "Price must be a number.";
  if (priceNumber < 0) return "Price cannot be negative.";

  if (!isHttpUrl(values.thumbnailUrl)) return "Thumbnail URL must start with http:// or https://.";

  return "";
}

export function getLectureFormError(values: {
  title: string;
  description: string;
  videoUrl: string;
}): string {
  if (values.title.trim() === "") return "Title is required.";
  if (values.title.trim().length > 120) return "Title must be 120 characters or fewer.";
  if (values.description.trim() === "") return "Description is required.";
  if (!isHttpUrl(values.videoUrl)) return "Video URL must start with http:// or https://.";
  return "";
}

export function getLoginFormError(email: string, password: string): string {
  if (email.trim() === "") return "Email is required.";
  if (password === "") return "Password is required.";
  return "";
}

