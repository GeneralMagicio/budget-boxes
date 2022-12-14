import classNames from 'classnames'
import { useField } from 'formik'

interface IDatePicker {
  className?: string
  disabled?: boolean
  name: string
  title: string
}

export const DatePicker = ({
  className = '',
  disabled = false,
  name,
  title,
  ...props
}: IDatePicker) => {
  const [field, meta] = useField(name)

  return (
    <div className={className}>
      <label className={disabled ? 'text-gray-400' : ''} htmlFor={name}>
        {title}
      </label>
      <input
        disabled={disabled}
        placeholder="Select date"
        type="date"
        className={classNames(
          'peer mt-1 h-[42px] w-full rounded-lg border border-gray-300 bg-gray-50 px-4 placeholder-gray-200 transition duration-150 invalid:bg-opacity-10 hover:border-cyan-300/70 focus:border-cyan-300 focus:outline-0',
          disabled && 'bg-gray-200 bg-opacity-20 text-white'
        )}
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? (
        <div>
          <span className="text-xs text-red-400"> {meta.error}</span>
        </div>
      ) : null}
    </div>
  )
}
