//Stateless Functional Component
//替代class NavBar extends Component{}
// (props) => ({totalCounters}) 可以拆解参数props
const NavBar = ({totalCounters}) => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Navbar{" "}
                    <span className="badge badge-pill badge-secondary">
                        {totalCounters}
                    </span>
                </a>
            </div>
        </nav>
    );
};

export default NavBar;
