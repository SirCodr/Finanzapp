import { SideBarItem } from "../types/navigation";

export const SIDEBAR_ITEMS: SideBarItem[] = [
  {
    name: 'incomes',
    label: 'Ingresos',
    path: '/incomes',
    children: [
      {
        name: 'list',
        label: 'Lista',
        path: '/incomes/'
      },
      {
        name: 'upload',
        label: 'Subir',
        path: '/incomes/upload'
      },
      {
        name: 'create',
        label: 'Crear',
        path: '/incomes/create'
      }
    ]
  },
  {
    name: 'expenses',
    label: 'Gastos',
    path: '/expenses',
    children: [
      {
        name: 'list',
        label: 'Lista',
        path: '/expenses/'
      },
      {
        name: 'upload',
        label: 'Subir',
        path: '/expenses/upload'
      },
      {
        name: 'create',
        label: 'Crear',
        path: '/expenses/create'
      },
    ]
  }
]
