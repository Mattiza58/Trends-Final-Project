import {Link} from "react-router-dom"

const NavBar = (()=>{
    return  <nav>
        <div>
            <Link to = "/">
            <img src = "../../public/logo(small)v2.png" style = {{width: "5%", height: "auto", padding: "1em"}}>
            </img>
            </Link>
        </div>
        <ul>
            <li>
                <Link to = "/profile">Profile</Link>
            </li>
            <li>
                <Link to = "/performances">Perfomances</Link>
            </li>
            <li>
                <Link to ="/connect" >Connect</Link>
            </li>
            <li>
                <Link to = "/music">Music</Link>
            </li>
        </ul>
    </nav>
})

// function CustomLink({to, children, ...props}){
//     const resolvedPath = useResolvedPath(to)
//     const isActive = useMatch({path: resolvedPath.pathname, end: true})
//     return (
//         <li className = {path === to ? "active" : ""}>
//             <Link to = {to} {...props}>
//                 {children}
//             </Link>
//         </li>
//     )
// }

export default NavBar;