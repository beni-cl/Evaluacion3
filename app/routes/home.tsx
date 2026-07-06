import type { Route } from "./+types/home";
import Welcome from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Adopta a tu Pokémon" },
    { name: "description", content: "Explora Pokémon disponibles para adopción con una experiencia moderna y dinámica." },
  ];
}

export default function Home() {
  return <Welcome />;
}
