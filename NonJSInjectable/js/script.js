'use strict'

var Database = (function() {

	function Database() {
		this.item1basePrice = Number(79);
		this.item2basePrice = Number(8.95);
		this.item3basePrice = Number(75);
		this.item4basePrice = Number(27.5);
		this.numOf_item1 = Number(1);
		this.numOf_item2 = Number(1);
		this.numOf_item3 = Number(1);
		this.numOf_item4 = Number(1);
		this.item1price = Number(79);
		this.item2price = Number(8.95);
		this.item3price = Number(75);
		this.item4price = Number(27.5);
		this.code = '';
		this.subtotal = Number(0);
		this.tax = Number(0);
		this.shipping = Number(0);
		this.discount = Number(0);
		this.discountAmount = Number(0);
		this.total = Number(0);
	}

	Database.prototype.setPrice = function(item) {
		switch(item) {
			case 'item1':
				setItem1Price.call(this);
				break;
			case 'item2':
				setItem2Price.call(this);
				break;
			case 'item3':
				setItem3Price.call(this);
				break;
			case 'item4':
				setItem4Price.call(this);
				break;
			default:
				console.log("Error in setPrice function " + item);
		}
	}

	function verifyNumItems(numItems) {
		return (!isNaN(numItems) && numItems >= 0) ? true : false;
	}

	Database.prototype.setNumOfItem1 = function(num) {
		if(verifyNumItems.call(this, num)) {
			this.numOf_item1 = num;
		} else {
			this.numOf_item1 = 0;
		}
	}

	Database.prototype.setNumOfItem2 = function(num) {
		if(verifyNumItems.call(this, num)) {
			this.numOf_item2 = num;
		} else {
			this.numOf_item2 = 0;
		}
	}

	Database.prototype.setNumOfItem3 = function(num) {
		if(verifyNumItems.call(this, num)) {
			this.numOf_item3 = num;
		} else {
			this.numOf_item3 = 0;
		}
	}

	Database.prototype.setNumOfItem4 = function(num) {
		if(verifyNumItems.call(this, num)) {
			this.numOf_item4 = num;
		} else {
			this.numOf_item4 = 0;
		}
	}

	function setItem1Price() {
		this.item1price = Number(getItem1BasePrice.call(this) * getNumOfItem1.call(this)).toFixed(2);
	}

	function setItem2Price() {
		this.item2price = Number(getItem2BasePrice.call(this) * getNumOfItem2.call(this)).toFixed(2);
	}

	function setItem3Price() {
		this.item3price = Number(getItem3BasePrice.call(this) * getNumOfItem3.call(this)).toFixed(2);
	}

	function setItem4Price() {
		this.item4price = Number(getItem4BasePrice.call(this) * getNumOfItem4.call(this)).toFixed(2);
	}

	Database.prototype.setCode = function(code) {
		setDiscount(code);
		this.code = code;
	}

	Database.prototype.update = function() {
		//Update subtotal, tax, shipping, and total
		let __subtotal = 0;
			__subtotal += this.item1price;
			__subtotal += this.item2price;
			__subtotal += this.item3price;
			__subtotal += this.item4price;
		setSubtotal.call(this, __subtotal);
		setTax.call(this, __subtotal*0.07);
		setShipping.call(this, __subtotal*0.05);
		setTotal.call(this, getSubtotal.call(this)+getTax.call(this)+getShipping.call(this)-getDiscountAmount.call(this));
	}

	function setSubtotal(subtotal) {
		this.subtotal = Number(subtotal).toFixed(2);
		$('#subtotal').html(this.subtotal);
	}

	function setTax(tax) {
		this.tax = Number(tax).toFixed(2);
		$('#tax').html(this.tax);
	}

	function setShipping(shipping) {
		this.shipping = Number(shipping).toFixed(2);
		$('#shipping').html(this.shipping);
	}

	function setDiscount(code) {
		switch(code) {
			case "blackfriday":
				this.discount = .2;
				break;
			case "cybermonday":
				this.discount = .4;
				break;
			case "thanksgiving":
				this.discount = .6;
				break;
			case "christmas":
				this.discount = .8;
				break;
			default:
				console.log("Error in setDiscount");
			setDiscountAmount(getSubtotal()+getShipping()+getTax());
		}
	}

	function setDiscountAmount(discountAmount) {
		this.discountAmount = Number(discountAmount).toFixed(2);
		if(this.discountAmount == 0) {
			$('#coupondiscount').html('');
		} else {
			$('#coupondiscount').html('-'+formatPrice(this.discountAmount));
		}
	}

	function setTotal(total) {
		this.total = Number(total).toFixed(2);
		$('.thick').html(this.total);
	}

	Database.prototype.getPrice = function(item) {
		switch(item) {
			case 'item1':
				return Number(getItem1Price.call(this));
			case 'item2':
				return Number(getItem2Price.call(this));
			case 'item3':
				return Number(getItem3Price.call(this));
			case 'item4':
				return Number(getItem4Price.call(this));
			default:
				console.log("Error in getPrice " + item);
		}
	}

	function getItem1BasePrice() {
		return this.item1basePrice;
	}

	function getItem2BasePrice() {
		return this.item2basePrice;
	}

	function getItem3BasePrice() {
		return this.item3basePrice;
	}

	function getItem4BasePrice() {
		return this.item4basePrice;
	}

	function getNumOfItem1() {
		return this.numOf_item1;
	}

	function getNumOfItem2() {
		return this.numOf_item2;
	}

	function getNumOfItem3() {
		return this.numOf_item3;
	}

	function getNumOfItem4() {
		return this.numOf_item4;
	}

	function getItem1Price() {
		return this.item1price;
	}

	function getItem2Price() {
		return this.item2price;
	}

	function getItem3Price() {
		return this.item3price;
	}

	function getItem4Price() {
		return this.item4price;
	}

	Database.prototype.getCode = function() {
		return this.code;
	}

	function getSubtotal() {
		return this.subtotal;
	}

	function getTax() {
		return this.tax;
	}

	function getShipping() {
		return this.shipping;
	}

	function getDiscount() {
		return this.discount;
	}

	function getDiscountAmount() {
		return this.discountAmount;
	}

	function getTotal() {
		return this.total;
	}

	function verify() {
		var flag = true;
		//TODO
		//verify coupon code
		//verify discount
		//verify price of items equals basic quantity
		//verify tax and shipping is correct
		//verify total price
		return flag;
	}

	Database.prototype.verifyPrice = function() {
		return verify.call(this);
	}

	Database.prototype.getNumOfItem = function(num) {
		switch(num) {
			case 1: 
				return getNumOfItem1.call(this);
			case 2:
				return getNumOfItem2.call(this);
			case 3:
				return getNumOfItem3.call(this);
			case 4:
				return getNumOfItem4.call(this);
			default:
				console.log("Error in getNumOfItem");
		}
	}

	return Database;

})();

function initialSetup(item) {
	database.setPrice(item);
	var x = database.getPrice(item);
	$('.'+item+'price').html(x);
}

function changeItem(fieldName, val) {
	switch (fieldName) {
		case "item1":
			database.setNumOfItem1(val);
			$('input[name='+fieldName+']').val(database.getNumOfItem(1));
			database.setPrice(fieldName);
			break;
		case "item2":
			database.setNumOfItem2(val);
			$('input[name='+fieldName+']').val(database.getNumOfItem(2));
			database.setPrice(fieldName);
			break;
		case "item3":
			database.setNumOfItem3(val);
			$('input[name='+fieldName+']').val(database.getNumOfItem(3));
			database.setPrice(fieldName);
			break;
		case "item4":
			database.setNumOfItem4(val);
			$('input[name='+fieldName+']').val(database.getNumOfItem(4));
			database.setPrice(fieldName);
			break;
		default:
			console.log("Error in changeItem " + fieldName);
	}
}

function formatPrice(price) {
	return "$"+Number(price).toFixed(2);
}

var database = new Database();

jQuery(document).ready(function() {

	//Insert all of the values for the document
	for(let i=1; i<=4; i++) {
		initialSetup('item'+i);
	}
	database.update();

	//Submit button redirect
	$('#submitbtn').click(function(e) {
		if(database.verifyPrice()) {
			$('#cart').hide();
			$('#hidden').show();
			$('#amountpaid').html(formatPrice(getPrice($('.thick').html())));
		} else {
			console.log("database.verifyPrice evaluted false");
		}
	});

	//Decrement value
	$('.minus-btn').click(function(e) {
		//Have the button stop acting like a button
		e.preventDefault();
		//Get the field name
		let fieldName = $(this).attr('field');
		//Get its current value
		let currentVal = parseInt($('input[name='+fieldName+']').val());
		changeItem(fieldName, currentVal - 1);
		$('.'+fieldName+'price').html(database.getPrice(fieldName));
		database.update();
	});

	//Increment value
	$('.plus-btn').click(function(e) {
		//Have the button stop acting like a button
		e.preventDefault();
		//Get the field name
		let fieldName = $(this).attr('field');
		//Get its current value
		let currentVal = parseInt($('input[name='+fieldName+']').val());
		changeItem(fieldName, currentVal + 1);
		$('.'+fieldName+'price').html(database.getPrice(fieldName));
		database.update();
	});

	$('#submitcode').click(function(e) {
		database.setCode($('input[name=couponcode]').val());
		database.update();
	});
})