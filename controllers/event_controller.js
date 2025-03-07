const events = require('express').Router();
const db = require('../models');
const {Event, Meet_Greet, Set_Time} = db;
const {Op} = require('sequelize')

// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [['date', 'ASC']],
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A EVENT

events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {name: req.params.name},
            include: [
                {
                    model: Meet_Greet,
                    as: "meet_greets",
                    include: {
                        model: Event,
                        as: "event",
                        where: {name: {[Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                    }
        
                },
                {
                    model: Set_Time,
                    as: "set_times",
                    include: {
                        model: Event,
                        as: "event",
                        where: {name: {[Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                    }

                }
            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE A EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: "successfully added event.",
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE
events.delete('/:id', async (req, res) => {
    try {
        const deleteEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteEvents} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = events;