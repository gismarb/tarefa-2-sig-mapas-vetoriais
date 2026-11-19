"use client";

import dynamic from "next/dynamic";

const MapaVetorial = dynamic(() => import("./MapaVetorial"), {
  ssr: false,
  loading: () => <p role="status">Carregando o mapa…</p>,
});

export default function Home() {
  return (
    <main style={{ maxWidth: 1024, margin: "0 auto", padding: "1rem" }}>
      <h1>Municípios da região de Limeira</h1>
      <p>Limites municipais do IBGE · Malha Municipal 2024</p>
      <MapaVetorial />
    </main>
  );
}