import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | undefined) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // YYYY-MM-DD matching the PDF "2025-04-20" format
}

