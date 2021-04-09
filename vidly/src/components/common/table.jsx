import React from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const Table = ({onSort, sortColumn,columns, data}) => {
    //直接用解构提取参数传进来
    //const {onSort, sortColumn,columns, data} = props
    return (
        <table className="table">
            <TableHead
                onSort={onSort}
                sortColumn={sortColumn}
                columns={columns}
            />
            <TableBody data={data} columns={columns} />
        </table>
    );
};

export default Table;
