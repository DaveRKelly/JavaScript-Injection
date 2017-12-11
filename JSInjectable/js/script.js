'use strict'

//acceptableCouponCodes.push('z');
//discounts.push(1);

//$('.item1price').attr("field", 0);
//$('.item2price').attr("field", 0);
//$('.item3price').attr("field", 0);
//$('.item4price').attr("field", 0);

//$('.thick').html(formatPrice(0));

//The coupon code and discount
let code = '';
let discount = 0;

//Acceptable codes and their discounts
let acceptableCouponCodes = ['blackfriday', 'cybermonday', 'thanksgiving', 'christmas'];
let discounts = [.2, .4, .6, .8];


function formatPrice(price) {
	return "$"+Number(price).toFixed(2);
}

function calculatePrice(itemPrice, currentVal) {
	return formatPrice(itemPrice * currentVal);
}

function getPrice(price) {
	let _price = price.toString().split("$");
	return parseFloat(_price[1]);
}

function updateDiscount(total) {
	let discountAmount = total * discount;
	if(discountAmount != 0) {
		$('#coupondiscount').html('-'+formatPrice(discountAmount));
	} else {
		$('#coupondiscount').html('');
	}
	return discountAmount;
}

function getCouponCodeDiscount() {
	let index = acceptableCouponCodes.indexOf(code);
	return acceptableCouponCodes.indexOf(code) == -1 ? 0 : discounts[index];
}

function getCouponCode() {
	return code;
}

function hasCouponCode() {
	return getCouponCode() === '' ? false : true;
}

function updateTotal() {
	let total = 0;
	total += ($('#subtotal').html()       === '' ? 0 : getPrice($('#subtotal').html()));
	total += ($('#tax').html()            === '' ? 0 : getPrice($('#tax').html()));
	total += ($('#shipping').html()       === '' ? 0 : getPrice($('#shipping').html()));
	let _discount = updateDiscount(total);
	total  = _discount === 0 ? total : total - _discount;
	$('.thick').html(formatPrice(total));
}

function updateShipping() {
	$('#shipping').html(formatPrice(getPrice($('#subtotal').html())*0.05));
	updateTotal();
}

function updateTax() {
	$('#tax').html(formatPrice(getPrice($('#subtotal').html())*0.07));
	updateShipping();
}

function updateSubtotal() {
	let subtotal = 0;
	for(let i=1; i<=4; i++) {
		subtotal += getPrice($('.item'+i+'price').html());
	}
	$('#subtotal').html(formatPrice(subtotal));
	discount = hasCouponCode() ? getCouponCodeDiscount() : 0;
	updateTax();
}

function updateItemPrice(fieldName, currentVal) {
	let updatedField = '.'+fieldName+'price';
	//the item cost
	let itemPrice = $(updatedField).attr('field');
	$(updatedField).html(calculatePrice(itemPrice, currentVal));
	updateSubtotal();
}

jQuery(document).ready(function() {
	//Insert all of the values for the document
	for(let i=1; i<=4; i++) {
		updateItemPrice('item'+i, parseInt($('input[name=item'+i+']').val()));
	}

	//Submit button redirect
	$('#submitbtn').click(function(e) {
		$('#cart').hide();
		$('#hidden').show();
		$('#amountpaid').html(formatPrice(getPrice($('.thick').html())));
	});

	//Decrement value
	$('.minus-btn').click(function(e) {
		//Have the button stop acting like a button
		e.preventDefault();
		//Get the field name
		let fieldName = $(this).attr('field');
		//Get its current value
		let currentVal = parseInt($('input[name='+fieldName+']').val());
		//Check that the value is not undefined and > 0
		if(!isNaN(currentVal) && currentVal > 0) {
			//Decrement
			$('input[name='+fieldName+']').val(currentVal - 1);
			updateItemPrice(fieldName, currentVal - 1);
		} else {
			//If it isn't a number or is already zero, set it to zero.
			$('input[name='+fieldName+']').val(0);
			updateItemPrice(fieldName, 0);
		}
	});

	//Increment value
	$('.plus-btn').click(function(e) {
		//Have the button stop acting like a button
		e.preventDefault();
		//Get the field name
		let fieldName = $(this).attr('field');
		//Get its current value
		let currentVal = parseInt($('input[name='+fieldName+']').val());
		//Check that the value is not undefined
		if(!isNaN(currentVal)) {
			//Increment
			$('input[name='+fieldName+']').val(currentVal + 1);
			updateItemPrice(fieldName, currentVal + 1);
		} else {
			//If it isn't a number, set it to zero
			$('input[name='+fieldName+']').val(0);
			updateItemPrice(fieldName, 0);
		}
	});

	$('#submitcode').click(function(e) {
		code = $('input[name=couponcode]').val();
		updateSubtotal();
	});
})