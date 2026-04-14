import { db } from "@/lib/db"

type AuditAction = 
  | "LOGIN" 
  | "LOGOUT" 
  | "WEBHOOK_RECEIVED" 
  | "PASSWORD_CHANGE" 
  | "SETTINGS_UPDATE"
  | "SECURITY_ALERT"

interface AuditOptions {
  action: AuditAction
  entity: "USER" | "SYSTEM" | "WEBHOOK"
  entityId: string
  userId?: string
  details?: Record<string, any>
}

export async function createAuditLog({
  action,
  entity,
  entityId,
  userId,
  details,
}: AuditOptions) {
  try {
    await db.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        userId,
        details: details ? JSON.stringify(details) : undefined,
      },
    })
  } catch (error) {
    console.error("Failed to create audit log:", error)
  }
}
