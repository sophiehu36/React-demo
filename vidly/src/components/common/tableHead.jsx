import React, { Component } from "react";

//columns: array
//onSort: function
//sortColumn: object

class TableHead extends Component {
    raiseSort = (path) => {
        // console.log(path);
        const sortColumn = { ...this.props.sortColumn };
        //如果点击连续点击同一个列表，则需要切换升序和降序
        if (sortColumn.path === path) {
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        } else {
            //如果点击的是不同的列表，则切换到新的path，升序排列
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        //冒泡，往handleSort里面传入变更的参数sorColumn
        this.props.onSort(sortColumn);
    };

    renderSortIcon = (column) => {
        const { path, order } = this.props.sortColumn;
        if (column.path !== path) return null;
        if (order === "asc") return <i className="fa fa-sort-asc"></i>;
        return <i className="fa fa-sort-desc"></i>;
    };

    render() {
        return (
            <thead>
                <tr>
                    {this.props.columns.map((column) => (
                        <th
                            className="clickable"
                            key={column.path || column.key}
                            onClick={() => this.raiseSort(column.path)}
                        >
                            {column.label}
                            {this.renderSortIcon(column)}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHead;
