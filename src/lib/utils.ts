import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function checkValidTweetUrl(url: string) {
  const tweetUrlRegex =
    /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+$/
  return tweetUrlRegex.test(url)
}
export function formatTweetUrlId(url: string) {
  return url.split("/").pop()
}
