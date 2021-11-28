class NFT{
    asset;
    asset_name;
    collection;
    collection_description;
    collection_name;
    link;
    image;
    thumbnail;
    last_sale;
    last_sale_price_with_decimals;
    last_sale_date;
    last_sale_payment;
    last_sale_symbol;
    last_sale_usd_value;
    last_sale_price;
    last_sale_usd_price;

    constructor(json){
        this.asset = json
        this.asset_name = json.name
        if(this.asset_name == null)
        {
            this.asset_name = json.token_id
        }
        this.collection = json.collection
        this.collection_description = this.collection.description
        this.collection_name = this.collection.name
        this.link = json.link
        this.image = json.image_url
        this.thumbnail = json.image_thumbnail_url
        this.last_sale = json.last_sale
        this.last_sale_price_with_decimals = this.last_sale.total_price
        this.last_sale_date = this.last_sale.event_timestamp
        this.last_sale_payment = this.last_sale.payment_token
        this.last_sale_symbol = this.last_sale_payment.symbol
        this.last_sale_usd_value = this.last_sale_payment.usd_price
        this.last_sale_price = parseFloat(parseInt(this.last_sale_price_with_decimals)/(10**this.last_sale_payment.decimals))
        this.last_sale_usd_price = Math.round(parseFloat(Math.round(parseFloat(this.last_sale_usd_value), 4))*this.last_sale_price,2)
    }

    

    
}

module.exports = NFT