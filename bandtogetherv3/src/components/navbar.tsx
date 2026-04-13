import {Link} from "react-router-dom"
import styles from "./maintext.module.css"

const NavBar = (()=>{
    return  <nav>
        <div>
            <Link to = "/">
            <img src = "../../public/logo(small)v2.png" className = {styles.small_logo}>
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