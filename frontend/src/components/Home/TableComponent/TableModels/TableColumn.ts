class TableColumn<T> {
  Name!: string;
  Accesor?: keyof T;
  Render?: (row: T) => React.ReactNode;
}

export { TableColumn };
