import React from 'react'
import {Link} from 'react-router-dom'
import '../../css/elements/top-navigation-1.css'

function Menu({navigation}) {
    return (
        <ul className="list-unstyled">
            <li className="list-item">
                <a className="list-link">{navigation.title}</a>
                <ul className="list-unstyled d-flex flex-column">
                {navigation.items.map((item, i) => (
                    <li className="list-item" key={i}>
                    <Link to={item.url} className="list-link">
                        {item.title}
                    </Link>
                    </li>
                ))}
                </ul>
            </li>
        </ul>
    )
}

export default Menu