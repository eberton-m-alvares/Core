import { Webhook } from "svix"
import { env } from "@/lib/env"

export type WebhookHeaders = {
  "svix-id": string
  "svix-timestamp": string
  "svix-signature": string
}

export async function verifyWebhookPayload<T>(
  payload: string,
  headers: WebhookHeaders,
  secret: string = env.WEBHOOK_SECRET || ""
): Promise<T> {
  const wh = new Webhook(secret)

  try {
    return wh.verify(payload, headers) as T
  } catch (err) {
    console.error("Webhook verification failed:", err)
    throw new Error("Invalid signature")
  }
}
