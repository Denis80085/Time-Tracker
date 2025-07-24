import WK_Model from "../Model/WK_Model";

type TableProps = {
  WorlSesions?: Array<WK_Model>;
};

function Table({ WorlSesions }: TableProps) {
  return (
    <div>
      <table className="table-fixed w-full">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="">State</th>
            <th>Date</th>
            <th>tru</th>
          </tr>
        </thead>
        <tbody>
          {WorlSesions?.map((WS) => {
            return (
              <tr>
                <td>{WS.TimeUTC}</td>
                <td>{WS.Date}</td>
                <td>{WS.EndHours}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
