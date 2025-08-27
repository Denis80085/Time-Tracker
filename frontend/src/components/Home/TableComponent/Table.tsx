import { TableColumn } from "./TableModels/TableColumn.ts";

type TableProps<T> = {
  Columns: TableColumn<T>[];
  Rows: T[];
};

function Table<T extends object>({ Columns, Rows }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {Columns.map((column, index) => (
            <th key={index}>{column.Name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Rows.map((row, Rindex) => (
          <tr key={Rindex}>
            {Columns.map((column, Cindex) => (
              <td key={Cindex}>{String(row[column.Accesor])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
export { TableColumn };
