import React, { Component } from "react";

class Counter extends Component {
    //这个方法在组件被更新后调用
    //可以用来判断什么时候用ajax
    componentDidUpdate(prevProps, prevState) {
        //console.log("prevProps", prevProps);
        //console.log("prevState", prevState);
        if (prevProps.counter.value !== this.props.counter.value) {
            // Ajax call and get new data from the server
        }
    }

    //只在一个组件从DOM卸载时调用
    componentWillUnmount() {
        console.log("Counter Unmount");
    }

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
    //用map来插入多个项，生成标签
    //                 <li key={tag}>{tag}</li>
    //             ))}
    //         </ul>
    //     );
    // }

    render() {
        const { onIncrement, onDelete, counter, onDecrement } = this.props;
        //利用this.props这个特殊属性，从父组件传递信息进来，props是只读的
        //console.log(this.props)
        return (
            //React.Fragment可以render多个元素，缩写是<>
            <div className="row">
                <div className="col-2">
                    <span className={this.getBadgeClasses()}>
                        {this.formatCount()}
                    </span>
                </div>
                <div className="col">
                    <button
                        onClick={() => onIncrement(counter)}
                        className="btn btn-secondary btn-sm"
                        disabled={counter.value === 10 ? "disabled" : ""}
                    >
                        +
                    </button>
                    <button
                        onClick={() => onDecrement(counter)}
                        className="btn btn-secondary btn-sm m-2"
                        //当counter.value是0时，让减量按钮失效，数值保持为0
                        disabled={counter.value === 0 ? "disabled" : ""}
                    >
                        -
                    </button>
                    <button
                        //子组件发起一个事件，由父组件处理，事件通过this.props传递
                        onClick={() => onDelete(counter.id)}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                </div>
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
