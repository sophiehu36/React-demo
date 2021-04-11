import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
    state = {
        posts: [],
    };

    async componentDidMount() {
        //pending > resolved(success) OR rejected(failure)
        const { data: posts } = await axios.get(apiEndpoint);
        this.setState({ posts });
    }

    handleAdd = async () => {
        // console.log("Add");
        const obj = { title: "a", body: "b" };
        //post发送数据，第一个参数是url，第二个参数是要发送的数据
        const { data: post } = await axios.post(apiEndpoint, obj);
        // console.log(post)
        const posts = [post, ...this.state.posts];
        this.setState({ posts });
    };

    handleUpdate = async (post) => {
        post.title = "Updated";
        //put方法更新所有post，第一个参数是url+id，第二个参数是所有post
        await axios.put(`${apiEndpoint}/${post.id}`, post);
        //patch方法更新一个或多个post，第一个参数是url+id，第二个参数是自定义对象
        // axios.patch(`${apiEndpoint}/${post.id}`, { title: post.title });
        const posts = [...this.state.posts];
        const index = posts.indexOf(post);
        posts[index] = { ...post };
        this.setState({ posts });
    };

    handleDelete = async (post) => {
        const originalPosts = this.state.posts;
        const posts = this.state.posts.filter((p) => p.id !== post.id);
        this.setState({ posts });
        //在服务器回应之前页面先显示
        try {
            await axios.delete(`${apiEndpoint}/${post.id}`);
            //模拟错误：throw new Error("error");
        } catch (ex) {
            // expected error has : ex.request  & ex.response
            // Expected (404: not found, 400: bad request) - CLIENT ERRORS
            // - Display a specific error message to the user
            if (ex.response && ex.response.status === 404)
                alert("This post has alreay been deleted.");
            else {
                // Unexpected (network down, server down, database down, bug)
                //- Log the error
                //- Display a generic and friendly error message
                console.log("Logging the error", ex);
                alert("An unexpected error occurred.");
            }

            this.setState({ posts: originalPosts });
        }
    };

    render() {
        return (
            <React.Fragment>
                <button className="btn btn-primary" onClick={this.handleAdd}>
                    Add
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => this.handleUpdate(post)}
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => this.handleDelete(post)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default App;
