const formatadorArea = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

export function formatarArea(areaKm2) {
  return `${formatadorArea.format(areaKm2)} km²`;
}