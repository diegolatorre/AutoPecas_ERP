export enum StatusVendaEnum {
  Aberta = 0,
  Finalizada = 1,
}

export const StatusVendaLabel = new Map<StatusVendaEnum, string>([
  [StatusVendaEnum.Aberta, 'Em aberto'],
  [StatusVendaEnum.Finalizada, 'Finalizada'],
]);
