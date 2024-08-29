export type SideBarItem = {
  name: string
  label: string
  path: string
  children?: SidebarItemChild[]
}

export type SidebarItemChild = Omit<SideBarItem, 'children'>