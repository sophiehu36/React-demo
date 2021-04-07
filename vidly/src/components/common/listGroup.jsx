import React from "react";
import PropTypes from "prop-types";

//Input: items: array
//Output: onClick
const ListGroup = (props) => {
    const {
        items,
        onItemSelect,
        selectedItem,
        textProperty,
        valueProperty,
    } = props;
    //console.log(items);
    return (
        <div className="list-group">
            {/* <a
                class="list-group-item list-group-item-action active"
                aria-current="true"
            >
                All Genres
            </a> */}
            {items.map((item) => (
                <button
                    onClick={() => onItemSelect(item)}
                    // 访问item的valueProperty项，变更props传入的值就可以复用组件
                    key={item[valueProperty]}
                    className={
                        //判断这个元素是不是选中的元素，选中的元素多一个active样式
                        item === selectedItem
                            ? "list-group-item list-group-item-action active"
                            : "list-group-item list-group-item-action"
                    }
                >
                    {/* 访问item的textProperty项，变更props传入的值就可以复用组件 */}
                    {item[textProperty]}
                </button>
            ))}
        </div>
    );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id",
};

ListGroup.propTypes = {
    items: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
};
export default ListGroup;
