//layouts
import DefaultSidebar1 from '../layouts/DefaultSidebar1'
import CollapsedSidebar1 from '../layouts/CollapsedSidebar1'
import TopNavigation1 from '../layouts/TopNavigation1'

//charts
import Chartist from '../charts/chartist'
import Recharts from '../charts/recharts'

//demos
import Demo1 from '../demos/Demo1'
import Demo2 from '../demos/Demo2'
import Demo3 from '../demos/Demo3'
import Demo4 from '../demos/Demo4'
import Demo5 from '../demos/Demo5'
import Demo6 from '../demos/Demo6'

//dashboards
import Analytics from '../dashboards/analytics/Analytics.js'
import Geographic from '../dashboards/geographic'
import ECommerce from '../dashboards/e-commerce'

//documentation
import Installation from '../documentation/installation'
import CodeStructure from '../documentation/code-structure'
import Faq from '../documentation/faq'
import Changelog from '../documentation/changelog'
import Credits from '../documentation/credits'

//forms
import DefaultForms from '../forms/default-forms'
import InputGroups from '../forms/input-groups'
import Validation from '../forms/validation'
import Sliders from '../forms/sliders'
import ReactDatetime from '../forms/react-datetime'
import ReactSelect from '../forms/react-select'

//icons
import Flags from '../icons/flags'
import FontAwesome from '../icons/font-awesome'
import Ionicons from '../icons/ionicons'
import MaterialDesignIcons from '../icons/material-design-icons'
import SimpleLineIcons from '../icons/simple-line-icons'
import WeatherIcons from '../icons/weather-icons'

//maps
import GoogleMaps from '../maps/google-maps'
import VectorMaps from '../maps/vector-maps'

//pages
import Home from '../pages/home'
import ContactUs from '../pages/contact-us'
import EmptyPage from '../pages/empty-page'
import CreateAccount from '../pages/create-account'
import ErrorPage from '../pages/error-page'
import Login from '../pages/login'
import ResetPassword from '../pages/reset-password'
import Subscribe from '../pages/subscribe'
import UnderMaintenance from '../pages/under-maintenance'
import UnlockAccount from '../pages/unlock-account'

//tables
import DefaultTables from '../tables/default-tables'
import Reactable from '../tables/reactable'

//ui-elements
import Badges from '../ui-elements/badges'
import Breadcrumbs from '../ui-elements/breadcrumbs'
import Buttons from '../ui-elements/buttons'
import Images from '../ui-elements/images'
import Lists from '../ui-elements/lists'
import Pagination from '../ui-elements/pagination'
import ProgressBars from '../ui-elements/progress-bars'
import SocialMediaButtons from '../ui-elements/social-media-buttons'
import Tabs from '../ui-elements/tabs'
import Typography from '../ui-elements/typography'
import Tooltips from '../ui-elements/tooltips'

//notifications
import Alerts from '../ui-elements/alerts'
import Modals from '../ui-elements/modals'
import Reapop from '../notifications/reapop'

//widgets
import ActivityWidgets from '../widgets/activity-widgets'
import AreaChartWidgets from '../widgets/area-chart-widgets'
import BarChartWidgets from '../widgets/bar-chart-widgets'
import DonutChartWidgets from '../widgets/donut-chart-widgets'
import IconWidgets from '../widgets/icon-widgets'
import LineChartWidgets from '../widgets/line-chart-widgets'
import PieChartWidgets from '../widgets/pie-chart-widgets'
import TableWidgets from '../widgets/table-widgets'
import TextWidgets from '../widgets/text-widgets'
import TimelineWidgets from '../widgets/timeline-widgets'
import UserWidgets from '../widgets/user-widgets'

const urls = [
    {
      title: 'Navigation',
      items: [
        {
          url: '',
          icon: 'dashboard',
          title: 'Dashboards',
          badge: {
            className: 'badge badge-danger badge-sm badge-outline',
            title: 'New'
          },
          items: [
            {
              url: '/analytics',
              icon: '',
              title: 'Analytics',
              layout: "/admin",
              component: Analytics,
              items: []
            },
            {
              url: '/geographic',
              icon: '',
              title: 'Geographic',
              layout: "/admin",
              component: Geographic,
              items: []
            },
            {
              url: '/dashboards/e-commerce',
              icon: '',
              title: 'E-commerce',
              layout: "/admin",
              items: []
            }
          ]
        },
        {
          url: '',
          icon: 'bookmark_border',
          title: 'Demos',
          items: [
            {
              url: '/demos/demo-1',
              icon: '',
              title: 'Demo 1',
              layout: "/admin",
              items: []
            },
            {
              url: '/demos/demo-2',
              icon: '',
              title: 'Demo 2',
              layout: "/admin",
              items: []
            },
            {
              url: '/demos/demo-3',
              icon: '',
              title: 'Demo 3',
              layout: "/admin",
              items: []
            },
            {
              url: '/demos/demo-4',
              icon: '',
              title: 'Demo 4',
              layout: "/admin",
              items: []
            },
            {
              url: '/demos/demo-5',
              icon: '',
              title: 'Demo 5',
              layout: "/admin",
              items: []
            },
            {
              url: '/demos/demo-6',
              icon: '',
              title: 'Demo 6',
              layout: "/admin",
              items: []
            }
          ]
        },
        {
          url: '',
          icon: 'code',
          title: 'Layouts',
          badge: {
            className: 'badge badge-info badge-sm badge-rounded badge-outline',
            title: '3'
          },
          items: [
            {
              url: '/layouts/default-sidebar-1',
              icon: '',
              title: 'Default sidebar 1',
              layout: "/admin",
              items: []
            },
            {
              url: '/layouts/collapsed-sidebar-1',
              icon: '',
              title: 'Collapsed sidebar 1',
              layout: "/admin",
              items: []
            },
            {
              url: '/layouts/top-navigation-1',
              icon: '',
              title: 'Top navigation 1',
              layout: "/admin",
              items: []
            }
          ]
        },
        {
          url: '',
          icon: 'extension',
          title: 'Widgets',
          items: [
            {
              url: '/widgets/activity-widgets',
              icon: '',
              title: 'Activity widgets',
              layout: "/admin",
              items: []
            },
            {
              url: '/widgets/area-chart-widgets',
              icon: '',
              title: 'Area chart widgets',
              layout: "/admin",
              items: []
            },
            {
              url: '/widgets/bar-chart-widgets',
              icon: '',
              title: 'Bar chart widgets',
              layout: "/admin",
              items: []
            },
            {
              url: '/widgets/donut-chart-widgets',
              icon: '',
              title: 'Donut chart widgets',
              layout: "/admin",
              items: []
            },
            {
              url: '/widgets/icon-widgets',
              icon: '',
              title: 'Icon widgets',
              layout: "/admin",
              items: []
            },
            {
              url: '/widgets/line-chart-widgets',
              icon: '',
              title: 'Line chart widgets',
              layout: "/admin",
              items: []
            },
            {
              url: '/widgets/pie-chart-widgets',
              icon: '',
              title: 'Pie chart widgets',
              layout: "/admin",
              items: []
            },
            {
              url: '/widgets/table-widgets',
              icon: '',
              title: 'Table widgets',
              layout: "/admin",
              items: []
            },
            {
              url: '/widgets/text-widgets',
              icon: '',
              title: 'Text widgets',
              layout: "/admin",
              items: []
            },
            //          {
            //            url: '/widgets/timeline-widgets',
            //            icon: '',
            //            title: 'Timeline widgets',
            //            items: []
            //          },
            {
              url: '/widgets/user-widgets',
              icon: '',
              title: 'User widgets',
              layout: "/admin",
              items: []
            }
          ]
        }
      ]
    },
    {
      title: 'Components',
      items: [
        {
          url: '',
          icon: 'label',
          title: 'UI Elements',
          items: [
            {
              url: '/ui-elements/badges',
              icon: '',
              title: 'Badges',
              layout: "/admin",
              items: []
            },
            {
              url: '/ui-elements/breadcrumbs',
              icon: '',
              title: 'Breadcrumbs',
              layout: "/admin",
              items: []
            },
            {
              url: '/ui-elements/buttons',
              icon: '',
              title: 'Buttons',
              layout: "/admin",
              items: []
            },
            //          {
            //            url: '/ui-elements/cards',
            //            icon: '',
            //            title: 'Cards',
            //            items: []
            //          },
            //          {
            //            url: '/ui-elements/dropdowns',
            //            icon: '',
            //            title: 'Dropdowns',
            //            items: []
            //          },
            {
              url: '/ui-elements/images',
              icon: '',
              title: 'Images',
              layout: "/admin",
              items: []
            },
            {
              url: '/ui-elements/lists',
              icon: '',
              title: 'Lists',
              layout: "/admin",
              items: []
            },
            {
              url: '/ui-elements/pagination',
              icon: '',
              title: 'Pagination',
              layout: "/admin",
              items: []
            },
            {
              url: '/ui-elements/progress-bars',
              icon: '',
              title: 'Progress bars',
              layout: "/admin",
              items: []
            },
            {
              url: '/ui-elements/social-media-buttons',
              icon: '',
              title: 'Social media buttons',
              layout: "/admin",
              items: []
            },
            {
              url: '/ui-elements/tabs',
              icon: '',
              title: 'Tabs',
              layout: "/admin",
              items: []
            },
            {
              url: '/ui-elements/typography',
              icon: '',
              title: 'Typography',
              layout: "/admin",
              items: []
            }
          ]
        },
        {
          url: '',
          icon: 'assignment',
          title: 'Forms',
          badge: {
            className: 'badge badge-success badge-sm badge-outline',
            title: 'Important'
          },
          items: [
            {
              url: '/forms/default-forms',
              icon: '',
              title: 'Default forms',
              layout: "/admin",
              items: []
            },
            {
              url: '/forms/input-groups',
              icon: '',
              title: 'Input groups',
              layout: "/admin",
              items: []
            },
            //          {
            //            url: '/forms/steps',
            //            icon: '',
            //            title: 'Form steps',
            //            items: []
            //          },
            {
              url: '/forms/validation',
              icon: '',
              title: 'Form validation',
              layout: "/admin",
              items: []
            },
            {
              url: '/forms/sliders',
              icon: '',
              title: 'Sliders',
              layout: "/admin",
              items: []
            },
            {
              url: '/forms/react-datetime',
              icon: '',
              title: 'Date picker',
              layout: "/admin",
              items: []
            },
            {
              url: '/forms/react-select',
              icon: '',
              title: 'React select',
              layout: "/admin",
              items: []
            }
          ]
        },
        {
          url: '',
          icon: 'format_list_bulleted',
          title: 'Tables',
          items: [
            {
              url: '/tables/reactable',
              icon: '',
              title: 'Reactable',
              layout: "/admin",
              items: []
            },
            {
              url: '/tables/default-tables',
              icon: '',
              title: 'Default tables',
              layout: "/admin",
              items: []
            }
          ]
        },
        {
          url: '',
          icon: 'notifications',
          title: 'Notifications',
          badge: {
            className: 'badge badge-warning badge-sm badge-rounded badge-outline',
            title: '3'
          },
          items: [
            {
              url: '/ui-elements/alerts',
              icon: '',
              title: 'Alerts',
              layout: "/admin",
              items: []
            },
            {
              url: '/ui-elements/modals',
              icon: '',
              title: 'Modals',
              layout: "/admin",
              items: []
            },
            {
              url: '/notifications/reapop',
              icon: '',
              title: 'Reapop',
              layout: "/admin",
              items: []
            }
          ]
        }
      ]
    },
    {
      title: 'Other',
      items: [
        {
          url: '',
          icon: 'map',
          title: 'Maps',
          badge: {
            className: 'badge badge-danger badge-sm badge-rounded badge-outline',
            title: '3'
          },
          items: [
            {
              url: '/maps/google-maps',
              icon: '',
              title: 'Google maps',
              layout: "/admin",
              items: []
            },
            {
              url: '/maps/vector-maps',
              icon: '',
              title: 'Vector maps',
              layout: "/admin",
              items: []
            }
          ]
        },
        {
          url: '',
          icon: 'explore',
          title: 'Icons',
          badge: {
            className: 'badge badge-info badge-sm badge-outline',
            title: 'New'
          },
          items: [
            {
              url: '/icons/flags',
              icon: '',
              title: 'Flags',
              layout: "/admin",
              items: []
            },
            {
              url: '/icons/font-awesome',
              icon: '',
              title: 'Font awesome',
              layout: "/admin",
              items: []
            },
            {
              url: '/icons/ionicons',
              icon: '',
              title: 'Ionicons',
              layout: "/admin",
              items: []
            },
            {
              url: '/icons/material-design-icons',
              icon: '',
              title: 'Material design icons',
              layout: "/admin",
              items: []
            },
            {
              url: '/icons/simple-line-icons',
              icon: '',
              title: 'Simple line icons',
              layout: "/admin",
              items: []
            },
            {
              url: '/icons/weather-icons',
              icon: '',
              title: 'Weather icons',
              layout: "/admin",
              items: []
            }
          ]
        }
      ]
    },
    {
      title: 'Extras',
      items: [
        {
          url: '',
          icon: 'insert_drive_file',
          title: 'Pages',
          items: [
            {
              url: '/pages/contact-us',
              icon: '',
              title: 'Contact us',
              layout: "/admin",
              items: []
            },
            {
              url: '/pages/create-account',
              icon: '',
              title: 'Create account',
              layout: "/admin",
              items: []
            },
            {
              url: '/pages/empty-page',
              icon: '',
              title: 'Empty page',
              layout: "/admin",
              items: []
            },
            {
              url: '/pages/error-page',
              icon: '',
              title: 'Error page',
              layout: "/admin",
              items: []
            },
            {
              url: '/pages/login',
              icon: '',
              title: 'Login',
              layout: "/admin",
              items: []
            },
            {
              url: '/pages/reset-password',
              icon: '',
              title: 'Reset password',
              layout: "/admin",
              items: []
            },
            {
              url: '/pages/subscribe',
              icon: '',
              title: 'Subscribe',
              layout: "/admin",
              items: []
            },
            {
              url: '/pages/under-maintenance',
              icon: '',
              title: 'Under maintenance',
              layout: "/admin",
              items: []
            },
            {
              url: '/pages/unlock-account',
              icon: '',
              title: 'Unlock account',
              layout: "/admin",
              items: []
            }
          ]
        },
        {
          url: '',
          icon: 'pie_chart',
          title: 'Charts',
          badge: {
            className: 'badge badge-primary badge-sm badge-rounded badge-outline',
            title: '2'
          },
          items: [
            {
              url: '/charts/chartist',
              icon: '',
              title: 'Chartist',
              layout: "/admin",
              items: []
            },
            {
              url: '/charts/recharts',
              icon: '',
              title: 'Recharts',
              layout: "/admin",
              items: []
            }
          ]
        }
      ]
    },
    {
      title: 'Docs',
      items: [
        {
          url: '',
          icon: 'info',
          title: 'Documentation',
          badge: {
            className: 'badge badge-danger badge-sm badge-outline',
            title: 'New'
          },
          items: [
            {
              url: '/documentation/installation',
              icon: '',
              title: 'Installation',
              layout: "/admin",
              items: []
            },
            {
              url: '/documentation/code-structure',
              icon: '',
              title: 'Code structure',
              layout: "/admin",
              items: []
            },
            {
              url: '/documentation/faq',
              icon: '',
              title: 'FAQ',
              layout: "/admin",
              items: []
            },
            {
              url: '/documentation/change-log',
              icon: '',
              title: 'Change log',
              layout: "/admin",
              items: []
            },
            {
              url: '/documentation/credits',
              icon: '',
              title: 'Credits',
              layout: "/admin",
              items: []
            }
          ]
        }
      ]
    }
  ]

export default urls;

  