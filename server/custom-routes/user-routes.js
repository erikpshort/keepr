let decks = require('../models/deck')

export default {
    pushCardToDeck: {
        path: '/pushCardToDeck/:id',
        reqType: 'put',
        method(req, res, next) {
            var id = req.params.id || req.query.id || '';
            console.log(id)
            if (!req.session.uid) {
                return res.status(401).send(handleResponse(null, null, new Error("User Not Authenticated")))
            }
            let action = 'Pushing Card To Deck'
            decks.findById(id)
                .then(data => {
                    data.cardId.push(req.body)
                    console.log(data)
                    decks.findOneAndUpdate({_id: id}, data)
                    res.send(handleResponse(action, data))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
}


function handleResponse(action, data, error) {
    var response = {
        action: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}