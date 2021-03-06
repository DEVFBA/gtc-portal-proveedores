//layouts
import DefaultSidebar1 from '../layouts/DefaultSidebar1'
import CollapsedSidebar1 from '../layouts/CollapsedSidebar1'
import TopNavigation1 from '../layouts/TopNavigation1'

//charts
import Chartist from '../charts/chartist'
import Recharts from '../charts/recharts'

//dashboards
import Analytics from '../dashboards/analytics/Analytics.js'
import Carga from "../pages/carga/Carga.js"

const ambiente = process.env.REACT_APP_ENVIRONMENT

const urls = [
    {
      collapse: true,
      name: 'GTC Portal Proveedores',
      views: [
        {
          collapse: false,
          path: '/analytics',
          icon: 'dashboard',
          name: 'Dashboard',
          layout: ambiente + "/admin", 
          component: Analytics,
          views: []
        },
        {
          collapse: true,
          icon: 'bookmark_border',
          name: 'Carta Porte',
          views: [
            {
              path: '/monitor',
              icon: '',
              name: 'Monitor',
              layout: ambiente + "/admin",
              component: Analytics,
              views: []
            },
            {
              path: '/carga',
              icon: '',
              name: 'Carga',
              layout: ambiente + "/admin",
              component: Carga,
              views: []
            }
          ]
        },
        {
          collapse: true,
          icon: 'code',
          name: 'Configuracion',
          views: [
            {
              path: '/usuarios',
              icon: '',
              name: 'Usuarios',
              layout: ambiente + "/admin",
              component: Analytics,
              views: []
            }
          ]
        }
      ]
    }
]

export default urls;
