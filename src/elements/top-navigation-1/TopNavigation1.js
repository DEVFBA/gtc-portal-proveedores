import React from 'react'
import {Link} from 'react-router-dom'
import '../../css/elements/top-navigation-1.css'
import Menu from "./Menu.js"

function TopNavigation1 ({navigation}) {
  //console.log(navigation)
  const items = navigation
    .map(item => item.items)
    .reduce((a, b) => [...a, ...b])
  return (
    <div className="top-navigation top-navigation-1 d-flex flex-row justify-content-start align-items-center flex-nowrap">
      {items && items.map((item, i) => <Menu key={i} navigation={item} />)}
    </div>
  )
}

export default TopNavigation1
