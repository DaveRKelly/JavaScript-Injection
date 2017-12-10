'use strict'

//The coupon code and discount
var code = '';
var discount = 0;

//Acceptable codes and their discounts
var acceptableCouponCodes = ['blackfriday', 'cybermonday', 'thanksgiving', 'christmas'];
var discounts = [.2, .4, .6, .8];


function formatPrice(price) {
	return "$"+Number(price).toFixed(2);
}

function calculatePrice(itemPrice, currentVal) {
	return formatPrice(itemPrice * currentVal);
}

function getPrice(price) {
	var _price = price.toString().split("$");
	return parseFloat(_price[1]);
}

function updateDiscount(total) {
	var discountAmount = total * discount;
	console.log("total: " + total + "\ndiscount: " + discount + "\ndiscountamount: " + discountAmount);
	if(discountAmount != 0) {
		$('#coupondiscount').html('-'+formatPrice(discountAmount));
	} else {
		$('#coupondiscount').html('');
	}
	return discountAmount;
}

function getCouponCodeDiscount() {
	var index = acceptableCouponCodes.indexOf(code);
	return acceptableCouponCodes.indexOf(code) == -1 ? 0 : discounts[index];
}

function getCouponCode() {
	return code;
}

function hasCouponCode() {
	return getCouponCode() === '' ? false : true;
}

function updateTotal() {
	var total = 0;
	total += ($('#subtotal').html()       === '' ?      0 : getPrice($('#subtotal').html()));
	total += ($('#tax').html()            === '' ?      0 : getPrice($('#tax').html()));
	total += ($('#shipping').html()       === '' ?      0 : getPrice($('#shipping').html()));
	var _discount = updateDiscount(total);
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
	var subtotal = 0;
	for(var i=1; i<=4; i++) {
		subtotal += getPrice($('.item'+i+'price').html());
	}
	$('#subtotal').html(formatPrice(subtotal));
	discount = hasCouponCode() ? getCouponCodeDiscount() : 0;
	updateTax();
}

function updateItemPrice(fieldName, currentVal) {
	var updatedField = '.'+fieldName+'price';
	//the item cost
	var itemPrice = $(updatedField).attr('field');
	$(updatedField).html(calculatePrice(itemPrice, currentVal));
	updateSubtotal();
}

jQuery(document).ready(function() {
	//Insert all of the values for the document
	for(var i=1; i<=4; i++) {
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
		var fieldName = $(this).attr('field');
		//Get its current value
		var currentVal = parseInt($('input[name='+fieldName+']').val());
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
		var fieldName = $(this).attr('field');
		//Get its current value
		var currentVal = parseInt($('input[name='+fieldName+']').val());
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