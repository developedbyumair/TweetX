"use server"

import { fetchTweet, Tweet } from "react-tweet/api"

type GenerateTweetResult = {
  data?: Tweet
  error?: Error
}

export async function generateTweetResult(
  id: string
): Promise<GenerateTweetResult> {
  try {
    const tweet = await fetchTweet(String(id))
    return { data: tweet as Tweet }
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Unknown error"),
    }
  }
}
