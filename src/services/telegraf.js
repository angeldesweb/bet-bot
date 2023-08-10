import { Telegraf , Markup , message } from 'telegraf';
import { session } from './betfair';
import {} from 'dotenv/config';
import { dateFromNow, formatDate } from './dates';
//import { dateFromNow, formatDate } from './services/dates';

const username = process.env.USER_NAME;
const password = process.env.USER_PASS;

let eventID = '';
let sports = {};
let startDate;
let endDate;

export const init = (ctx) => {
    session.login(username,password, err => {
        ctx.reply(err ? 'No se pudo autenticar' + err : 'Bienvenido de nuevo');
    })
}

export const keyboards = {
    deportes: async (deportes) => {
        deportes = deportes.map(item => item.eventType);
        deportes = await Promise.all(deportes);
        sports = deportes.reduce((acc,item) => ({...acc,[item.id]:item.name.toLowerCase()}),{});
        console.log({sports});
        let buttons = deportes.map(item => (Markup.button.callback(item.name,!!actions[item.name.toLowerCase()] ? item.name.toLowerCase() : 'dummy')));
        const keyboard = Markup.inlineKeyboard(buttons,{
            wrap: (_,index) =>  index % 2 === 0
        });
        return keyboard
    }
}

export const commands = {
    deportes: (ctx) => {
        session.listEventTypes({filter:{}},async (err,res) => {
            if(res?.result) {
                let keyboard = await keyboards.deportes(res.response.result)
                return ctx.reply("Eventos",keyboard); 
            } else {
                ctx.reply('Hubo un error en la petición')
            }
        })
    },
    dates: (ctx) => {
        let [,dates] = ctx.message.text.split(' ');
        let [start,end] = dates.split('-');

        startDate = formatDate(start);
        endDate = formatDate(end);

        ctx.reply('Hecho');
    },
    filters: (ctx) => {
        ctx.reply(`

            Deporte: ${eventID ? sports[eventID] : 'Sin definir'}.
            
            Tiempos: inicio ${startDate ? dateFromNow(startDate) : 'Sin definir'} | final ${endDate ? dateFromNow(endDate) : 'Sin definir'}.
        `)
    }
};



export const actions = {
    soccer: ctx => {
        eventID = String(1);
        ctx.reply('Hecho');
    }
}
