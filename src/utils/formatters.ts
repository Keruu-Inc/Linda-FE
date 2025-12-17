export function formatProfileId(uuid: string): string {
  if (!uuid) return "";

  const cleaned = uuid.replace(/-/g, "");
  const prefix = cleaned.substring(0, 2).toUpperCase();
  const suffix = cleaned.substring(cleaned.length - 3);

  return `${prefix}${suffix}`;
}
