'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
	 'treasury' :0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
	'treasury' :0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(truckers);
console.log(deliveries);
console.log(actors);

shipp_price();



/* Exercise 1 - Euro-Volume */

/*distance component: the number of kilometers multiplied by the trucker price per km */
/*volume component: the used volume multiplied by the trucker price per m3*/
// fonction qui calcule le prix comp 
function price_comp (Id, distance, volume)
{
	var vol =0;
	var dist=0; 
	for (var n_truckers of truckers)
		{
			if ( n_truckers.id == Id)
				{
					dist= n_truckers.pricePerKm * distance; 
					vol = n_truckers.pricePerVolume * volume; 
				}	
		}
	return vol + dist;
}


/*Exercise 2 - Send more, pay less*/
/*
decreases by 10% after 5 m3
decreases by 30% after 10 m3
decreases by 50% after 25 m3
*/


/*retourne le prix avec sa reduction en fonction du volume */
function decrease ( price, volume)
{
	  if ( volume >5 && volume <10)
            {
               price =price -(price * 0.1);
            }
        if ( volume >10 && volume <25)
            {
                price = price -(price * 0.3);
            }
        if ( volume >25)
            {
                price = price-(price * 0.5);
            } 
	return price ; 
}


/*
Exercise 3 - Give me all your money
Convargo take a 30% commission on the shipping price to cover their costs.
*/


/*
insurance: half of commission
the Treasury: 1€ by 500km range
convargo: the rest
*/

function get_comission (prix)
{
	return prix + (prix *0.3);
}

function get_treasury (distance)
{
	var i = 0; 
	while ( distance >500)
		{
			distance = distance -500; 
			i=i+1;
		}
	return i; 
}

/*Exercice 4 - The famous deductible */


/*The shipper can reduce the deductible amount from 1000€ to 200€ with a deductible option for a few more euros per volume.
The deductible
The driver is charged an additional 1€/m3 when he chooses the deductible reduction option.*/


function is_deductible (option, prix, volume)
{
	if (option == true)
		{
			return  prix + volume;
		}
	else {
		return prix; 
	}
}

function shipp_price(){ 
for (var n_deliverie of deliveries)
    {
		//calcul du prix 
		var n_price = price_comp(n_deliverie.truckerId,n_deliverie.distance, n_deliverie.volume); 	
		console.log(n_deliverie.id);
		console.log("Comptant : "+n_price);
		n_price = decrease(n_price,n_deliverie.volume)
		console.log("Decrease : "+n_price);
		
		// deductible
		n_price = is_deductible(n_deliverie.options.deductibleReduction, n_price,n_deliverie.volume);
		console.log("deductible : " + n_deliverie.options.deductibleReduction);
		console.log("new price :" +n_price);
		
		// commission 
		n_deliverie.commission.treasury =get_treasury(n_deliverie.distance);
		n_deliverie.commission.insurance = (n_price*0.3)/2;
		n_deliverie.commission.convargo = n_deliverie.commission.insurance - n_deliverie.commission.treasury;
		n_price = get_comission(n_price);
		
		//prix finaux
		n_deliverie.price=n_price;
		console.log("TTC : "+n_price);
		console.log("Details : ");
		console.log(n_deliverie.commission);
		
    }
}
