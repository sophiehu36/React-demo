import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
    render() {
        const {
            onDelete,
            onReset,
            onIncrement,
            counters,
            onDecrement,
        } = this.props;
        return (
            <div>
                <button
                    onClick={onReset}
                    className="btn btn-primary btn-sm m-2"
                >
                    Reset
                </button>
                {counters.map((counter) => (
                    <Counter
                        //key是内部使用的，外部无法访问
                        key={counter.id}
                        //通过props把处理的事件名传递给子组件
                        onDelete={onDelete}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        // id={counter.id}
                        // value={counter.value}
                        // 使用counter替代id和value，传入counter的所有内容
                        counter={counter}
                        // selected={true}
                    ></Counter>
                ))}
            </div>
        );
    }
}

export default Counters;
