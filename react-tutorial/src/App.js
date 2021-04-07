import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

class App extends Component {
    //其他组件无法访问到state里的值
    state = {
        counters: [
            { id: 1, value: 0 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 },
        ],
    };

    //用constructor初始化属性，只在文件创建时调用一次
    //如果要用props，必须作为参数传入
    // constructor(props) {
    //     super(props);
    //     console.log("app-constructor", this.props);
    //     this.state = this.props.something;
    // }

    //这个钩子只在组件被加入DOM后调用，组件加载完成
    componentDidMount() {
        //在这个里面调用ajax
        console.log("app-mounted");
    }

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

    handleDecrement = (counter) => {
        //不要变动原始信息，用一个新变量拷贝
        const counters = [...this.state.counters];
        //找到点击的项对应的下标
        const index = counters.indexOf(counter);
        //深拷贝对应的值，不然会在原数据上变更
        counters[index] = { ...counter };
        counters[index].value--;
        this.setState({ counters });
    };

    handleDelete = (counterId) => {
        //用filter方法筛除点击了delete的项
        const counters = this.state.counters.filter((c) => c.id !== counterId);
        this.setState({ counters });
    };

    handleReset = () => {
        const counters = this.state.counters.map((c) => {
            //运用map把每一项设置为0
            c.value = 0;
            return c;
        });
        this.setState({ counters });
    };

    render() {
        return (
            <>
                <NavBar
                    totalCounters={
                        this.state.counters.filter((c) => c.value > 0).length
                    }
                />
                <main className="container">
                    <Counters
                        //组件里的props可以传递给子组件
                        counters={this.state.counters}
                        onDelete={this.handleDelete}
                        onIncrement={this.handleIncrement}
                        onDecrement={this.handleDecrement}
                        onReset={this.handleReset}
                    />
                </main>
            </>
        );
    }
}

export default App;
