const { response } = require('express');
const express = require('express')
const app = express()

const fetch = require('node-fetch');

var NFT = require('./nft')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

var Nfts = []

var collection = ""

const getNfts = () =>{
    url = 'https://api.opensea.io/api/v1/assets?order_by=sale_date&order_direction=desc&offset=0&limit=20&collection='+collection
    return fetch(url)
        .then(response => response.json())
        .then(myJson => {
            Nfts = []
            Object.values(myJson.assets).forEach(val => {
                Nfts.push(new NFT(val))
            })
            
            return Nfts
        })
    

}


app.get('/' ,(req,res) => {
    res.render('index')
})

app.post('/game', (req, res) => {
    collection = req.body.collection
    console.log(collection)
    res.redirect('/game')
})

app.post('/', (req, res) => {
    collection = req.body.collection
    console.log(collection)
    res.redirect('/game')
})

app.get('/game', (req,res) => {
    /*
    var Nfts = [];
    fetch('https://api.opensea.io/api/v1/assets?order_by=sale_date&order_direction=desc&offset=0&limit=20&collection=doodles-official')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            Object.values(myJson.assets).forEach(val => {
                Nfts.push(new NFT(val))
            })
            
        }).then(() => {
            res.render('index',{nft_left: Nfts[0], nft_right: Nfts[1]})
        })
    */

        getNfts().then(Nfts => {
            res.render('game',{nft_left: Nfts[0], nft_right: Nfts[1]})})
          
})

    


app.get('/nfts', (req, res) => {
    Nfts.splice(0,1)
    res.send(Nfts[0].asset_name +"::"+
    Nfts[0].image+"::"+
    Nfts[0].last_sale_price+"::"+
    Nfts[0].last_sale_usd_price+"::"+
    Nfts[0].last_sale_date+"::"+
    Nfts[0].last_sale_symbol+
    "$$$"+
    Nfts[1].asset_name +"::"+
    Nfts[1].image+"::"+
    Nfts[1].last_sale_price+"::"+
    Nfts[1].last_sale_usd_price+"::"+
    Nfts[1].last_sale_date+"::"+
    Nfts[1].last_sale_symbol
    )
   
})

app.listen(3030)
console.log("Server running: http://localhost:3030")