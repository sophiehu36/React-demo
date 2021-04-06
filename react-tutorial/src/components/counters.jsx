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

    handleIncrement = (counter) => {
        //不要变动原始信息，用一个新变量拷贝
        const counters = [...this.state.counters];
        //找到点击的项对应的下标
        const index = counters.indexOf(counter);
        //深拷贝对应的值，不然会在原数据上变更
        counters[index] = { ...counter };
        counters[index].value++;
        this.setState({ counters });
    };

    handleDelete = (counterId) => {
        const counters = this.state.counters.filter((c) => c.id !== counterId);
        this.setState({ counters });
    };

    handleReset = () => {
        const counters = this.state.counters.map((c) => {
            c.value = 0;
            return c;
        });
        this.setState({ counters });
    };

    render() {
        return (
            <div>
                <button
                    onClick={this.handleReset}
                    className="btn btn-primary btn-sm m-2"
                >
                    Reset
                </button>
                {this.state.counters.map((counter) => (
                    <Counter
                        //key是内部使用的，外部无法访问
                        key={counter.id}
                        //通过props把处理的事件名传递给子组件
                        onDelete={this.handleDelete}
                        onIncrement={this.handleIncrement}
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
