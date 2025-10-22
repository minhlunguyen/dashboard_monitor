import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { Calendar, DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment-timezone'
import { vi, enUS } from 'date-fns/locale'
import { TypeDate } from '@/lib/interfaces/report'
import { CalendarIcon, CaretDownIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

interface IInstructorCalendar {
  value?: Date
  typeDate?: TypeDate
  setDateSelected: (date: any) => void
  setValueDate: (date: any) => void
  valueDate: any
}
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
export default function InstructorCalendar({
  typeDate,
  setDateSelected,
  setValueDate,
  valueDate
}: IInstructorCalendar) {
  const [range, setRange] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ])
  const { t, i18n } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const calendarRef = useRef(null)
  const divRef = useRef(null)

  // handle change date range for typeDate weekly
  const handleChangeRangeDate = (item: any) => {
    setIsOpen(false)
    const startDate = item?.range1?.startDate
    if (typeDate === 'weekly') {
      const startOfWeek = moment(startDate).startOf('week').toDate()
      const endOfWeek = moment(startDate).endOf('week').toDate()
      setRange([{ startDate: startOfWeek, endDate: endOfWeek }])
      setDateSelected(format(startOfWeek, 'yyyy-MM-dd'))
      setValueDate(`${format(startOfWeek, 'dd/MM/yyyy')} - ${format(endOfWeek, 'dd/MM/yyyy')}`)
    }
  }

  // handle change date when select calendar
  // format date: daily => dd/MM/yyyy, monthly=> Tháng MM yyyy, yearly=> yyyy
  const handleChangeCalendar = (date: any) => {
    setIsOpen(false)
    setDateSelected(format(date, 'yyyy-MM-dd'))
    setValueDate(format(date, 'dd/MM/yyyy'))
    if (typeDate === 'daily') {
      setValueDate(format(date, 'dd/MM/yyyy'))
    } else if (typeDate === 'yearly') {
      setValueDate(new Date(date).getFullYear())
    } else if (typeDate === 'monthly') {
      setValueDate(() => {
        if (i18n.language === 'vi') {
          return `Tháng ${new Date(date).getMonth() + 1} ${new Date(date).getFullYear()}`
        } else {
          return `${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`
        }
      })
    }
  }

  // set initial value for date if user dont choose calendar
  useEffect(() => {
    let initialValue
    if (typeDate === 'weekly') {
      const date = new Date()
      const startOfWeek = moment(date).startOf('week').toDate()
      const endOfWeek = moment(date).endOf('week').toDate()
      setRange([{ startDate: startOfWeek, endDate: endOfWeek }])
      initialValue = `${format(new Date(startOfWeek), 'dd/MM/yyyy')} - ${format(new Date(endOfWeek), 'dd/MM/yyyy')}`
    } else if (typeDate === 'monthly') {
      initialValue =
        i18n.language === 'vi'
          ? `Tháng ${new Date().getMonth() + 1} ${new Date().getFullYear()}`
          : `${months[new Date().getMonth()]} ${new Date().getFullYear()}`
    } else if (typeDate === 'yearly') {
      initialValue = new Date().getFullYear()
    } else {
      initialValue = t('report.today')
    }
    setValueDate(initialValue)
  }, [typeDate])

  //handle close calendar when click outside
  useEffect(() => {
    const handleClick = (e: any) => {
      if (
        calendarRef.current &&
        !(calendarRef.current as HTMLDivElement).contains(e.target) &&
        !(divRef.current as unknown as HTMLDivElement).contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className='relative z-[19]'>
      <div
        ref={divRef}
        onClick={() => setIsOpen(true)}
        className='w-fit min-w-[200px] justify-between relative cursor-pointer flex gap-[8px] items-center text-body1 text-neutral-black px-[12px] h-[32px] rounded-[4px] border-neutral-light border'
      >
        <CalendarIcon className='w-5 h-5' />
        <span>{valueDate}</span>
        <CaretDownIcon className='w-5 h-5' />
      </div>
      {isOpen && (
        <div ref={calendarRef} className='absolute left-0 right-auto sm:left-auto sm:right-0 top-[40px]'>
          {typeDate === 'weekly' ? (
            <DateRange
              className='border-neutral-lighter border rounded-[8px]'
              editableDateInputs={true}
              onChange={handleChangeRangeDate}
              moveRangeOnFirstSelection={false}
              ranges={range}
              rangeColors={['#04A375']}
              locale={i18n.language === 'vi' ? vi : enUS}
            />
          ) : (
            <Calendar
              className='border-neutral-lighter border rounded-[8px]'
              onChange={handleChangeCalendar}
              locale={i18n.language === 'vi' ? vi : enUS}
            />
          )}
        </div>
      )}
    </div>
  )
}
