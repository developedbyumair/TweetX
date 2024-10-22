"use server"

import { fetchTweet } from "react-tweet/api"

export async function generateTweetResult(id: string) {
  try {
    const tweet = await fetchTweet(String(id))
    return tweet.data
  } catch (error) {
    return error
  }
}
