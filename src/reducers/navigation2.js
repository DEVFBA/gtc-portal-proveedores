const urls = [
    {
        title: 'Navegación',
        items: [
            {
            url: '/admin/dashboard',
            icon: 'dashboard',
            title: 'Dashboard',
            items: []
            },
            {
            url: '',
            icon: 'bookmark_border',
            title: 'Carta Porte',
            items: [
                {
                url: '/admin/monitor',
                icon: '',
                title: 'Monitor',
                items: []
                },
                {
                url: '/admin/carga',
                icon: '',
                title: 'Carga',
                items: []
                },
            ]
            },
        ]
    },
  ]
  export function navigation(state = Array.from(urls), action) {
    switch (action.type) {
      case 'SET_NAVIGATION':
        return Object.assign({}, state, {
          ...action.navigation
        })
      default:
        return state
    }
  }