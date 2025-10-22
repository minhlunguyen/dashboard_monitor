import { TypeDate } from '@/lib/interfaces/report'
import Calendar from './Calendar'
import { useTranslation } from 'react-i18next'
interface IDateTab {
  setTypeDate: (type: TypeDate) => void
  typeDate: TypeDate
  setDateSelected: (date: any) => void
  valueDate: any
  setValueDate: (date: any) => void
}
export default function DateTab({ valueDate, typeDate, setTypeDate, setDateSelected, setValueDate }: IDateTab) {
  const { t } = useTranslation('common')
  return (
    <div className='flex gap-[8px] flex-wrap lg:flex-nowrap'>
      <button
        onClick={() => {
          setTypeDate('weekly')
          setDateSelected(new Date())
        }}
        className={`${
          typeDate === 'weekly' ? '!bg-emerald-500 !text-white' : ''
        } flex justify-center items-center text-body1 text-neutral-black px-[12px] h-[32px] rounded-[4px] border-neutral-light border capitalize`}
      >
        <span>{t('week')}</span>
      </button>
      <button
        onClick={() => {
          setTypeDate('monthly')
          setDateSelected(new Date())
        }}
        className={`${
          typeDate === 'monthly' ? '!bg-emerald-500 !text-white' : ''
        } flex justify-center items-center text-body1 text-neutral-black px-[12px] h-[32px] rounded-[4px] border-neutral-light border capitalize`}
      >
        <span>{t('month')}</span>
      </button>
      <button
        onClick={() => {
          setTypeDate('yearly')
          setDateSelected(new Date())
        }}
        className={`${
          typeDate === 'yearly' ? '!bg-emerald-500 !text-white' : ''
        } flex justify-center items-center text-body1 text-neutral-black px-[12px] h-[32px] rounded-[4px] border-neutral-light border capitalize`}
      >
        <span>{t('year')}</span>
      </button>
      <Calendar
        typeDate={typeDate}
        setDateSelected={setDateSelected}
        valueDate={valueDate}
        setValueDate={setValueDate}
      />
    </div>
  )
}
