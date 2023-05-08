import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pt-br');

type Props = {
  format: 'DD/MM/YYYY' | 'HH:mm'
}
export function getDay({ format }: Props) {
  const day = dayjs().utcOffset(-180).format(format);
  return day;
}