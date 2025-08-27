class TableColumn<T> {
  Name!: string;
  Accesor!: keyof T;
}

export { TableColumn };
