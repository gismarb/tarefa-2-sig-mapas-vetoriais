# Municípios da região de Limeira

Aplicação web desenvolvida em JavaScript com Next.js e Leaflet para o **Exercício 7 da aula SIG#07** da disciplina de **Sistemas de Informações Geográficas**.

A aplicação exibe os limites de Americana, Cordeirópolis, Iracemápolis, Limeira e Piracicaba. Ao tocar em um município, o mapa abre um popup e apresenta os mesmos dados na tabela de atributos.

## Objetivo

Aplicar, de forma simples e prática, os conceitos de mapas vetoriais e tabelas de atributos, relacionando os limites municipais às informações que descrevem cada município.

Usei a atividade para demonstrar a integração entre:

- a Malha Municipal 2024 do IBGE;
- a representação dos limites e dos atributos em GeoJSON;
- o mapa interativo com Leaflet;
- a seleção de uma feição e a exibição de seus dados na interface.

## Funcionalidades

- Exibição dos cinco municípios com enquadramento inicial calculado a partir da camada vetorial;
- deslocamento e controle de zoom do mapa;
- abertura do popup ao clicar ou tocar em um município;
- exibição do nome, do código IBGE e da área territorial na tabela de atributos;
- destaque em laranja do município selecionado, inclusive depois de fechar o popup;
- ajuste do mapa e da tabela para telas pequenas.

## Funcionamento

Ao abrir a página, o componente do mapa carrega o arquivo `municipios-regiao-limeira.geojson` com `fetch`. O Leaflet usa a geometria de cada feição para desenhar os limites. Ao tocar em um polígono, o Leaflet abre o popup associado a ele e a página recebe os atributos para atualizar a tabela e o destaque.

Este é o trecho de atributos da feição de Limeira no GeoJSON:

```json
{
  "properties": {
    "CD_MUN": "3526902",
    "NM_MUN": "Limeira",
    "AREA_KM2": 580.711
  }
}
```

O código IBGE identifica o município e é mantido como texto. A área é armazenada como número e aparece como **580,711 km²** no popup e na tabela.

## Tecnologias e recursos utilizados

- JavaScript;
- Node.js 24 e npm;
- Next.js com App Router;
- React;
- Leaflet e React Leaflet;
- CSS Modules;
- GeoJSON e Mapshaper;
- OpenStreetMap.

## Dados cartográficos

Usei a [Malha Municipal 2024 do IBGE para São Paulo](https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2024/UFs/SP/). Com o Mapshaper, filtrei os cinco municípios, mantive os campos usados na interface, reprojetei para WGS 84 e simplifiquei os limites com `-simplify 20% keep-shapes`. Mantive a área territorial da tabela original do IBGE.

A camada vetorial é servida com a aplicação. O mapa de fundo é carregado pela internet e tem atribuição visível aos [colaboradores do OpenStreetMap](https://www.openstreetmap.org/copyright).

## Estrutura principal

```text
.
├── app/
│   ├── MapaVetorial.jsx
│   ├── formatarArea.js
│   ├── page.js
│   └── page.module.css
└── public/
    └── municipios-regiao-limeira.geojson
```

- `MapaVetorial.jsx` carrega a camada, enquadra o mapa e vincula um popup a cada feição;
- `formatarArea.js` aplica a mesma formatação de área no popup e na tabela;
- `page.js` carrega o mapa no navegador com `next/dynamic`, guarda o município selecionado e exibe a tabela;
- `page.module.css` define as dimensões do mapa e o espaçamento da interface;
- `municipios-regiao-limeira.geojson` reúne os limites e os atributos dos cinco municípios.

## Como executar

### Pré-requisitos

- Node.js 24 e npm;
- navegador web;
- conexão com a internet para instalar as dependências e carregar o mapa de fundo.

### Execução

1. Clone ou baixe este repositório.
2. Abra o terminal na pasta do projeto.
3. Instale as dependências e inicie o servidor de desenvolvimento:

   ```bash
   npm ci
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) ou use a porta indicada no terminal.
5. Clique ou toque em um município e confira seus dados no popup e na tabela.

Para executar a versão de produção na rede local, encerre o servidor de desenvolvimento e rode:

```bash
npm run build && npm run start -- --hostname 0.0.0.0
```

No celular conectado à mesma rede, abra `http://IP_DO_COMPUTADOR:3000`, substituindo `IP_DO_COMPUTADOR` pelo endereço local do computador.

## Validação

Conferi o layout no navegador em desktop e em uma tela simulada de 360 px. Também testei a aplicação no celular. Durante o teste no aparelho:

- conferi o enquadramento inicial da camada;
- toquei em Limeira, Piracicaba e Cordeirópolis;
- verifiquei a correspondência dos dados no popup e na tabela;
- fechei o popup e conferi que o polígono continuou destacado.

## Delimitação do escopo

Concentrei a atividade na visualização de um recorte de cinco municípios e na consulta aos seus atributos. A aplicação usa o GeoJSON preparado para a atividade, uma camada de fundo e uma tabela que mostra os dados do município selecionado.

## Possíveis melhorias futuras

- Buscar municípios pelo nome ou pelo código IBGE;
- incluir uma opção para voltar ao enquadramento inicial;
- ampliar o recorte com outros municípios da malha paulista.

## Licença

O código deste projeto é disponibilizado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE).

## Autor

**Gismar Pereira Barbosa**

Desenvolvi este projeto para a disciplina de **Sistemas de Informações Geográficas na Web**, com base na `aula SIG#07 do professor José Rui`.

