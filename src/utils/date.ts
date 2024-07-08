import { DateTime } from "luxon"

export function getCurrentDate(): string {
   return DateTime.now().toString()
}