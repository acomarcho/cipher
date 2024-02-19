import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const safeBtoa = (v: string) => {
  try {
    const result = btoa(v);
    return result;
  } catch {
    return "Cannot convert to base64";
  }
};

export const safeAtob = (v: string) => {
  try {
    const result = atob(v);
    return result;
  } catch {
    return "Invalid base64";
  }
};

export function downloadBufferAsFile(buffer: Buffer, fileName: string) {
  const blob = new Blob([buffer], { type: "application/octet-stream" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
