"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { formatarArea } from "./formatarArea";

const MapaVetorial = dynamic(() => import("./MapaVetorial"), {
  ssr: false,
  loading: () => <p role="status">Carregando o mapa…</p>,
});

export default function Home() {
  const [municipio, setMunicipio] = useState(null);
  return (
    <main style={{ maxWidth: 1024, margin: "0 auto", padding: "1rem" }}>
      <h1>Municípios da região de Limeira</h1>
      <p>Limites municipais do IBGE · Malha Municipal 2024</p>
      <MapaVetorial aoSelecionarMunicipio={setMunicipio} />

    <section aria-labelledby="titulo-atributos">
      <h2 id="titulo-atributos">Tabela de atributos</h2>
    
      {municipio ? (
        <table aria-labelledby="titulo-atributos">
          <tbody>
            <tr>
              <th scope="row">Município</th>
              <td>{municipio.NM_MUN}</td>
            </tr>
            <tr>
              <th scope="row">Código IBGE</th>
              <td>{municipio.CD_MUN}</td>
            </tr>
            <tr>
              <th scope="row">Área territorial</th>
              <td>{formatarArea(municipio.AREA_KM2)}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Toque em um município no mapa para consultar seus atributos.</p>
      )}
    </section>
    </main>
  );
}