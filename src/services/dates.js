import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
import arraySupport from 'dayjs/plugin/arraySupport';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(arraySupport);

dayjs.updateLocale('en', {
    months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    weekdays: ['Lunes','Martes','Miércoles','Jueves','Viernes'],
  	relativeTime: {
    	future: "en %s",
    	past: "hace %s",
    	s: 'algunos segundos',
    	m: "un minuto",
    	mm: "%d minutos",
    	h: "una hora",
    	hh: "%d horas",
    	d: "un día",
    	dd: "%d días",
    	M: "un mes",
    	MM: "%d meses",
    	y: "un año",
    	yy: "%d años"
  	}
})

export const dateFromNow = (date) =>  {
	return dayjs(date).fromNow()
};

const fixMonth = (month) => {
	month = parseInt(month);
	return month <= 10 ? String(`0${month - 1}`) : String(month - 1);
}

export const formatDate = (exp) => {
	let cYear = `${dayjs().year()}`;
	let cMonth = `${dayjs().month()}`;
	let cDay = `${dayjs().date()}`;
	let cHour = `${dayjs().hour()}`;
	let cMin = `${dayjs().minute()}`;

	let [date,time] = exp.split('|');
	
	if(!time) time = `${cHour}:${cMin}`
	
	time = time.split(':')
	date = date.split('/');
	let [hour,min] = time;
	if(date.length === 3) {
		let [day,month,year] = date;
		month = fixMonth(month);
		return new Date(dayjs([year,month,day,hour,min]));
	};
	if(date.length === 2) {
		let [day,month] = date;
		month = fixMonth(month);
		return new Date(dayjs([cYear,month,day,hour,min]));
	}
	if(date.length === 1) {

		if(date[0] === 'hoy') {
			return new Date(dayjs([cYear,cMonth,cDay,hour,min]));
		};
		return new Date(dayjs([cYear,cMonth,date[0],hour,min]))
	}
	
}