import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
    //其他组件无法访问到state里的值
    state = {
        counters: [
            { id: 1, value: 0 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 },
        ],
    };
    render() {
        return (
            <div>
                {this.state.counters.map((counter) => (
                    <Counter
                        key={counter.id}
                        value={counter.value}
                        // selected={true}
                    ></Counter>
                ))}
            </div>
        );
    }
}

export default Counters;
