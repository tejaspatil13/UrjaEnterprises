export function sanitizeForFirestore<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForFirestore(item)) as T;
  }

  if (value && typeof value === "object") {
    const cleaned = Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>(
      (acc, [key, val]) => {
        if (val !== undefined) {
          acc[key] = sanitizeForFirestore(val);
        }
        return acc;
      },
      {}
    );
    return cleaned as T;
  }

  return value;
}

