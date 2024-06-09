const db = require('mongoose')
const events = require('../model/event')


let New_event = [
    new events({
        title:'this is event 1',
        descraption:'this the best',
        location:"oman",
        date:Date.now(),
        created_at:Date.now()
    }),
    new events({
        title:'this is event 1',
        descraption:'this the best',
        location:"sur",
        date:Date.now(),
        created_at:Date.now()
    }),
    new events({
        title:'this is event 1',
        descraption:'this the best',
        location:"seria",
        date:Date.now(),
        created_at:Date.now()
    }),
    new events({
        title:'this is event 1',
        descraption:'this the best',
        location:"eraq",
        date:Date.now(),
        created_at:Date.now()
    }),
    new events({
        title:'this is event 1',
        descraption:'this the best',
        location:"ordan",
        date:Date.now(),
        created_at:Date.now()
    }),
    new events({
        title:'this is event 1',
        descraption:'this the best',
        location:"egabt",
        date:Date.now(),
        created_at:Date.now()
    }),
    new events({
        title:'this is event 1',
        descraption:'this the best',
        location:"soaodya",
        date:Date.now(),
        created_at:Date.now()
    }),
    new events({
        title:'this is event 1',
        descraption:'this the best',
        location:"niesan",
        date:Date.now(),
        created_at:Date.now()
    }),
    new events({
        title:'this is event 1',
        descraption:'this the best',
        location:"wissam",
        date:Date.now(),
        created_at:Date.now()
    })
]
 New_event.forEach(async(events)=>{{
    await events.save()
}})

async()=>{await events.insertOne({title:'this is event 1',
descraption:'this the best',
location:"ooo",
date:Date.now(),
created_at:Date.now()})}