export function getauth() {
  return localStorage.getItem("hxskpet") || "no-session";
}
