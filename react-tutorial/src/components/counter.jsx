import React, { Component } from "react";

class Counter extends Component {
    //state includes all the data the component needs
    //其他组件无法访问到state里的值
    state = {
        value: this.props.value,
        //imageUrl: "https://picsum.photos/200",
        tags: ["tag1", "tag2", "tag3"],
    };

    // 绑定this的原始办法，在constructor中用bind方法
    // constructor() {
    //     super();
    //     this.handleIncrement.bind(this)返回一个新实例
    //     this.handleIncrement = this.handleIncrement.bind(this);
    // }

    //用箭头函数解决this绑定问题
    //jsx的格式中无法直接调用函数或传参数，可以用箭头函数返回值的形式
    //onClick={() => this.handleIncrement(product)}
    handleIncrement = (product) => {
        //console.log(product);
        // setState方法告诉react有东西改变了
        this.setState({ value: this.state.value + 1 });
    };

    handleDecrement = (product) => {
        //console.log(product);
        // setState方法告诉react有state要改变了
        this.setState({ value: this.state.value - 1 });
    };
    // styles = {
    //     fontSize: "50px",
    //     fontWeight: "bold",
    // };

    // renderTags() {
    //     if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    //     return (
    //         <ul>
    //             {this.state.tags.map((tag) => (
    //                 <li key={tag}>{tag}</li>
    //             ))}
    //         </ul>
    //     );
    // }

    render() {
        //利用this.props这个特殊属性，可以在组件间传递信息，props是只读的
        //console.log(this.props)
        return (
            //React.Fragment可以render多个元素，缩写是<>
            <div>
                <span className={this.getBadgeClasses()}>
                    {this.formatCount()}
                </span>
                <button
                    onClick={() => this.handleIncrement()}
                    className="btn btn-secondary btn-sm m-2"
                >
                    Increment
                </button>
                <button
                    onClick={() => this.handleDecrement()}
                    className="btn btn-secondary btn-sm"
                >
                    Decrement
                </button>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.state.value === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const { value } = this.state;
        return value === 0 ? "Zero" : value;
    }
}

//导出默认模块
export default Counter;
