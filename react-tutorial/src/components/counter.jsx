import React, { Component } from "react";

class Counter extends Component {
    //controlled component doesn't has its own state, it is controlled by its parent component
    //state includes all the data the component needs
    //其他组件无法访问到state里的值
    // state = {
    //     value: this.props.counter.value,
    //     //imageUrl: "https://picsum.photos/200",
    //     tags: ["tag1", "tag2", "tag3"],
    // };

    // 绑定this的原始办法，在constructor中用bind方法
    // constructor() {
    //     super();
    //     this.handleIncrement.bind(this)返回一个新实例
    //     this.handleIncrement = this.handleIncrement.bind(this);
    // }

    //用箭头函数解决this绑定问题
    //jsx的格式中无法直接调用函数或传参数，可以用箭头函数返回值的形式
    //onClick={() => this.handleIncrement(product)}

    //handleDecrement = (product) => {
    //console.log(product);
    // setState方法告诉react有state要改变了
    //    this.setState({ value: this.state.value - 1 });
    //};
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
                    onClick={() => this.props.onIncrement(this.props.counter)}
                    className="btn btn-secondary btn-sm m-2"
                >
                    Increment
                </button>
                <button
                    //子组件发起一个事件，由父组件处理，事件通过this.props传递
                    onClick={() => this.props.onDelete(this.props.counter.id)}
                    className="btn btn-danger btn-sm m-2"
                >
                    Delete
                </button>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const { value } = this.props.counter;
        return value === 0 ? "Zero" : value;
    }
}

//导出默认模块
export default Counter;
