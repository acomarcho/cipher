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
