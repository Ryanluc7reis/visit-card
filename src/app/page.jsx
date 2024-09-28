"use client";
import { useParams } from "next/navigation";

export default function HomePage() {
  const { user } = useParams();

  return (
    <div>
      <h1>Perfil do Usuário: {user}</h1>
    </div>
  );
}
