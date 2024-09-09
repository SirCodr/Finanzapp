import { SIDEBAR_ITEMS } from '../../consts/navigation'
import Item from './item'
import ItemMultilevel from './item-multi-level'

const Sidebar = () => {
  return (
    <>
      <aside
        id='sidebar-multi-level-sidebar'
        className='sticky top-0 w-full h-screen transition-transform'
        aria-label='Sidebar'
      >
        <div className='h-auto px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <h5
            id='drawer-navigation-label'
            className='text-base font-semibold text-gray-500 uppercase dark:text-gray-400'
          >
            Menu
          </h5>
          <button
            type='button'
            data-drawer-hide='drawer-navigation'
            aria-controls='drawer-navigation'
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
          >
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Close menu</span>
          </button>
        </div>
        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            {SIDEBAR_ITEMS.map((item) =>
              item.children ? (
                <ItemMultilevel key={item.name} item={item} />
              ) : (
                <Item key={item.name} item={item} />
              )
            )}
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
