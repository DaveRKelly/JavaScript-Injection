'use strict'

jQuery(document).ready(function() {

	//Insert all of the values for the document
	for(var i=1; i<=4; i++) {
		updateItemPrice('item'+i, parseInt($('input[name=item'+i+']').val()));
	}

	//Decrement value
	$('.minus-btn').click(function (e) {
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
	$('.plus-btn').click(function (e) {
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

	$('.numItems').focusin((e) => {
		console.log("Num items focus in");
	});

	$('.numItems').focusout((e) => {
		console.log("Num items focus out");
	});
})

function updateItemPrice(fieldName, currentVal) {
	var updatedField = '.'+fieldName+'price';
	//the item cost
	var itemPrice = $(updatedField).attr('field');
	$(updatedField).html(calculatePrice(itemPrice, currentVal));
	updateSubtotal();
}

function updateSubtotal() {
	var subtotal = 0;
	for(var i=1; i<=4; i++) {
		subtotal += getPrice($('.item'+i+'price').html());
	}
	$('#subtotal').html(formatPrice(subtotal));
	if(hasCouponCode()) {}
		updateTax();
}

function hasCouponCode() {
	var hasCode;
	console.log("hascouponcode");
	return hasCode;
}

function updateTax() {
	$('#tax').html(formatPrice(getPrice($('#subtotal').html())*0.07));
	updateShipping();
}

function updateShipping() {
	$('#shipping').html(formatPrice(getPrice($('#subtotal').html())*0.05));
	updateTotal();
}

function updateTotal() {
	var total = 0;
	total += ($('#subtotal').html() != '' ? getPrice($('#subtotal').html())       : 0);
	total += ($('#tax').html()      != '' ? getPrice($('#tax').html())            : 0);
	total += ($('#shipping').html() != '' ? getPrice($('#shipping').html())       : 0);
	total += ($('#coupondiscount').html()    != '' ? getPrice($('#coupondiscount').html()) : 0);
	$('.thick').html(formatPrice(total));
}

function getPrice(price) {
	var _price = price.toString().split("$");
	return parseFloat(_price[1]);
}

function calculatePrice(itemPrice, currentVal) {
	return formatPrice(itemPrice * currentVal);
}

function formatPrice(price) {
	return "$"+Number(price).toFixed(2);
}