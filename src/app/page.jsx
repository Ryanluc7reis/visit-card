"use client";
import { useParams } from "next/navigation";
import Navigations from "@/components/navigations/Navigations";

export default function HomePage() {
  const { user } = useParams();

  return (
    <>
      <Navigations />
      <h1>Perfil do Usuário: {user}</h1>
    </>
  );
}
