import type { Route } from "./+types/home";
import { MainPage } from "../main_page/main_page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <MainPage />;
}
