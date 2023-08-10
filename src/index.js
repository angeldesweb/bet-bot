import { Telegraf , Markup , message } from 'telegraf';
import {} from 'dotenv/config';
import { session } from './services/betfair';
import { dateFromNow, formatDate } from './services/dates';
import { actions, commands, init } from './services/telegraf';


const token = process.env.BOT_TOKEN;

export const bot = new Telegraf(token);

bot.start(init);

Object.entries(commands).forEach(arr => {
    const [command,callback] = arr;
    bot.command(command,callback);
});

Object.entries(actions).forEach(arr => {
    const [action,callback] = arr;
    bot.action(action,callback); 
})


bot.action('dummy', (ctx,next) => {
    console.log('callback triggered')
    ctx.reply('Dummy action').then(() => next())
})
// bot.hears('oio', ctx => {
//     session.listEvents({filter:{eventTypeIds:['1']}}, async (err,res) => {
//         if(err) ctx.reply('Hubo un error en la petición');

//         let events = 
//         console.log(JSON.stringify(res.response.result.map(item => ({event:item.event.name,open:dateFromNow(item.event.openDate)}))))
//     })
// });

const sports = {
    soccer: '1'
}

// bot.on('message', (ctx) => {
//     let msg = ctx.message.text;
//     if(msg.startsWith('get:')) {
//         let args = msg.split(' ');
//         let [,sport,dates,] = args;
//         if(!sports[sport]) return ctx.reply('Deporte aún no está optimizado');

//         dates = dates.split('-');

//         formatDate(dates[0])

//         console.log({sport,dates});
//     };
// });



bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));