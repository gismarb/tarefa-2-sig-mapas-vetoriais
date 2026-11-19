"use client";

import { useEffect, useState } from "react";
import { geoJSON } from "leaflet";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CAMINHO_MALHA = "/municipios-regiao-limeira.geojson";

const ESTILO_MUNICIPIOS = {
  color: "#0369a1",
  weight: 2,
  fillOpacity: 0.2,
};

const FORMATADOR_AREA = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

function vincularPopupMunicipio(feicao, camadaMunicipio) {
  const { NM_MUN, CD_MUN, AREA_KM2 } = feicao.properties;

  const conteudo = document.createElement("div");

  const nome = document.createElement("strong");
  nome.textContent = NM_MUN;

  const codigo = document.createElement("div");
  codigo.textContent = `Código IBGE: ${CD_MUN}`;

  const area = document.createElement("div");
  area.textContent = `Área territorial: ${FORMATADOR_AREA.format(AREA_KM2)} km²`;

  conteudo.append(nome, codigo, area);
  camadaMunicipio.bindPopup(conteudo);
}

export default function MapaVetorial() {
  const [camada, setCamada] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const controle = new AbortController();

    async function carregarMalha() {
      try {
        const resposta = await fetch(CAMINHO_MALHA, {
          signal: controle.signal,
        });

        if (!resposta.ok) {
          throw new Error(`Falha ao carregar a malha (HTTP ${resposta.status}).`);
        }

        const dados = await resposta.json();

        // Calculo o enquadramento a partir dos limites dos municípios.
        const limites = geoJSON(dados).getBounds();

        if (!limites.isValid()) {
          throw new Error("A malha não contém geometrias para exibir.");
        }

        setCamada({ dados, limites });
      } catch (erro) {
        if (!controle.signal.aborted) {
          setErro(erro.message);
        }
      }
    }

    carregarMalha();

    return () => controle.abort();
  }, []);

  if (erro) {
    return <p role="alert">{erro}</p>;
  }

  if (!camada) {
    return <p role="status">Carregando os limites municipais…</p>;
  }

  return (
    <MapContainer
      bounds={camada.limites}
      boundsOptions={{ padding: [24, 24] }}
      style={{ height: "clamp(320px, 65vh, 600px)" }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        data={camada.dados}
        style={ESTILO_MUNICIPIOS}
        onEachFeature={vincularPopupMunicipio}
      />
    </MapContainer>
  );
}