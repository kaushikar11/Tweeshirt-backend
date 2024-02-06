async function getProductPrice(tshirtSize,cPrice)
{
    var basePrice, gst = 5, courierCharge, printingPrice=160,profit=100,total=0;
    courierCharge = cPrice;
    if (tshirtSize == "S" || tshirtSize == "M" || tshirtSize == "L" || tshirtSize == "XL")
    {
        basePrice=204.75    
    }
    else if (tshirtSize == "2XL")
    {
        basePrice=220.50
    }
    else if (tshirtSize == "3XL")
    {
        basePrice=241.50
    }
    else if (tshirtSize == "4XL")
    {
        basePrice=262.50
    }
    else if (tshirtSize == "5XL")
    {
        basePrice=273    
    }
    total = courierCharge + basePrice + printingPrice;
    return (total+profit+((total * gst) / 100));

}

export default getProductPrice;