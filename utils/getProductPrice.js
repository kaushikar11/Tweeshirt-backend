async function getProductPrice(tshirtSize,cPrice)
{
    // Convert INR prices to USD (approximate conversion: 1 USD = 83 INR)
    const USD_RATE = 83;
    var basePrice, gst = 5, courierCharge, printingPrice, profit, subtotal = 0, total = 0;
    
    // Convert courier charge from INR to USD
    courierCharge = cPrice / USD_RATE;
    
    // Base prices in USD
    if (tshirtSize == "S" || tshirtSize == "M" || tshirtSize == "L" || tshirtSize == "XL")
    {
        basePrice = 2.75; // ~204.75 INR / 83
    }
    else if (tshirtSize == "2XL")
    {
        basePrice = 2.95; // ~220.50 INR / 83
    }
    else if (tshirtSize == "3XL")
    {
        basePrice = 3.20; // ~241.50 INR / 83
    }
    else if (tshirtSize == "4XL")
    {
        basePrice = 3.45; // ~262.50 INR / 83
    }
    else if (tshirtSize == "5XL")
    {
        basePrice = 3.60; // ~273 INR / 83
    }
    
    printingPrice = 2.00; // ~160 INR / 83
    
    // Calculate subtotal (cost before profit)
    subtotal = courierCharge + basePrice + printingPrice;
    
    // Profit should be 150% of subtotal
    profit = subtotal * 1.50;
    
    // Calculate total with GST
    // GST is 5% on (subtotal + profit)
    const totalBeforeGST = subtotal + profit;
    const gstAmount = (totalBeforeGST * gst) / 100;
    total = totalBeforeGST + gstAmount;
    
    return total;
}

export default getProductPrice;