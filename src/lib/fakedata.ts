const FIRST = ["Ali", "Sara", "Omar", "Layla", "Yusuf", "Noor", "Zaid", "Mona", "Karim", "Rana", "Sami", "Dina"];
const LAST = ["Hassan", "Ahmed", "Karimi", "Saleh", "Jaber", "Nasser", "Mansour", "Rashid", "Fadel", "Odeh"];
const DOMAINS = ["example.com", "mail.dev", "workspace.io", "forge.app"];
const CITIES = ["Baghdad", "Basra", "Erbil", "Kut", "Najaf", "Mosul", "Karbala", "Sulaymaniyah"];
const WORDS = ["forge", "build", "workspace", "local", "premium", "speed", "focus", "tool", "developer", "flow"];

export type FieldType =
  | "fullName" | "firstName" | "lastName" | "email" | "phone" | "city"
  | "number" | "boolean" | "uuid" | "date" | "sentence" | "id";

export function generateValue(type: FieldType, index: number): string | number | boolean {
  switch (type) {
    case "firstName":
      return pick(FIRST);
    case "lastName":
      return pick(LAST);
    case "fullName":
      return `${pick(FIRST)} ${pick(LAST)}`;
    case "email":
      return `${pick(FIRST).toLowerCase()}.${pick(LAST).toLowerCase()}@${pick(DOMAINS)}`;
    case "phone":
      return `+964 7${rand(10, 99)} ${rand(100, 999)} ${rand(1000, 9999)}`;
    case "city":
      return pick(CITIES);
    case "number":
      return rand(1, 1000);
    case "boolean":
      return Math.random() > 0.5;
    case "uuid":
      return crypto.randomUUID();
    case "date":
      return new Date(Date.now() - rand(0, 1000) * 86400000).toISOString().slice(0, 10);
    case "sentence":
      return `${pick(WORDS)} ${pick(WORDS)} ${pick(WORDS)}`.replace(/^\w/, (c) => c.toUpperCase()) + ".";
    case "id":
    default:
      return index + 1;
  }
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
