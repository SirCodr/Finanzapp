import { HTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLProps<HTMLAnchorElement> {
  label: string
  active?: boolean
}

const Anchor = (props: Props) => {
  const { href, className, label, active } = props

  const inactiveClasses =
    'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 '
  const activeClasses =
    'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
  const currentClasses = active ? activeClasses : inactiveClasses

  return (
    <a
      href={href}
      className={twMerge(
        'block py-2 px-3 rounded md:border-0 md:p-0 transition-all delay-75 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500 dark:hover:bg-gray-700',
        currentClasses,
        className
      )}
      {...props}
    >
      {label}
    </a>
  )
}

export default Anchor
