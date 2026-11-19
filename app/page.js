"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { formatarArea } from "./formatarArea";
import styles from "./page.module.css";

const MapaVetorial = dynamic(() => import("./MapaVetorial"), {
  ssr: false,
  loading: () => <p role="status">Carregando o mapa…</p>,
});

export default function Home() {
  const [municipio, setMunicipio] = useState(null);
  return (
    <main className={styles.pagina}>
      <header className={styles.cabecalho}>
        <h1>Municípios da região de Limeira</h1>
        <p>Limites municipais do IBGE · Malha Municipal 2024</p>
      </header>
      <MapaVetorial
        aoSelecionarMunicipio={setMunicipio}
        codigoSelecionado={municipio?.CD_MUN}
      />

    <section className={styles.atributos} aria-labelledby="titulo-atributos">
      <h2 id="titulo-atributos">Tabela de atributos</h2>
    
      {municipio ? (
        <table className={styles.tabela} aria-labelledby="titulo-atributos">
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