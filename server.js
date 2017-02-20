var express = require('express');
var _ = require('lodash');

var app = express();

app.use(require('body-parser').json());
app.use(require('cors')());
app.use(require('morgan')('dev'));

const ITEM_ATTRS = [
    'Description',
    'Done',
    'Likes',
    'Tags'
];

var items = {};

function getCtx(){
    return Math.random();
}

app.get('/item', (req, res) => {
    res.json({
        Context: getCtx(),
        items: Object.keys(items).sort((a, b) => items[b]._added - items[a]._added).reduce((ret, id) => {
            ret.push(items[id]);
            return ret;
        }, [])
    });
});

app.post('/item/:itemId', (req, res) => {
    var itemId=  req.params['itemId'];
    var item = _.pick(req.body, ITEM_ATTRS);
    Object.assign(item, {id: itemId, _added: Date.now()});
    items[itemId] = item;
    res.json(Object.assign({Context: getCtx()},item));
});

app.delete('/item/:itemId', (req, res) => {
    var itemId=  req.params['itemId'];
    delete items[itemId];
    res.json({
        Context: getCtx(),
        id: itemId
    });
});

app.put('/item/:itemId', (req, res) => {
    var itemId=  req.params['itemId'];
    var item = _.pick(req.body, ITEM_ATTRS);
    item = Object.assign({}, items[itemId], item);
    items[itemId] = item;
    res.json(Object.assign({Context: getCtx()},item));
});

app.listen(3300, () => {
    console.log("Listen on 3300");
});