import { TableColumn } from "./TableModels/TableColumn.ts";

type TableProps<T> = {
  Columns: TableColumn<T>[];
  Rows: T[];
};

function Table<T extends object>({ Columns, Rows }: TableProps<T>) {
  return (
    <table className="w-full h-full">
      <thead className="bg-gray-900 text-white h-1/9  text-2xl">
        <tr>
          {Columns.map((column, index) => (
            <th className="relative" key={index}>
              {column.Name}
              {index < Columns.length - 1 && (
                <div className="absolute right-0 top-[10%] h-[80%] w-1 border-l border-white"></div>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="h-6/7 text-center">
        {Rows.map((row, Rindex) => (
          <tr
            className="bg-gray-800 text-[1.8rem] border-b border-gray-500 text-gray-200"
            key={Rindex}
          >
            {Columns.map((column, Cindex) => (
              <td className="relative" key={Cindex}>
                {column.Render != null
                  ? column.Render(row)
                  : String(row[column.Accesor!])}
                {Cindex < Columns.length - 1 && (
                  <div className="absolute right-0 top-[10%] h-[80%] w-1 border-l border-gray-500"></div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
export { TableColumn };
