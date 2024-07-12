import { DateTime } from "luxon"

export function getCurrentDate(): string {
   return DateTime.now().toString()
}

export function getCurrentIsoDate(): string {
   return DateTime.now().toISODate()
}