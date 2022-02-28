//Функция подсчета рандомных id
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
  }
//Задаём рандомные id
 var a = document.querySelectorAll('.product__card');
 for (var i=0; i < a.length; i++) {
    a[i].setAttribute("data-id", getRandomInt(2000,5000));
}
window.addEventListener('click',function (clickWindow){
	if (clickWindow.target.dataset.action === 'plus' || clickWindow.target.dataset.action === 'minus'){
		var product__wrapper = clickWindow.target.closest('.product__wrapper');
		var counter = product__wrapper.querySelector('[data-counter]');
	}
	if(clickWindow.target.dataset.action === 'plus') {
		counter.innerText = ++counter.innerText;
	}
	if(clickWindow.target.dataset.action === 'minus'){
		if (counter.innerText > 1){
			counter.innerText = --counter.innerText;
		}
	}
	const delivery = document.querySelector('.delivery');
	const fullPrice = document.querySelector('.fullPrice');
	const cartProductList = document.querySelector('.cart__content');
	const cartQuantity = document.querySelector('.cart__quantity');
	//Добавление в корзину
	if(clickWindow.target.dataset.action === 'addProduct'){
		var productCard = clickWindow.target.closest('.product__card');
		//Переменные каталога товаров
		const id = productCard.dataset.id;
		const title = productCard.querySelector('.product__title').textContent;
		const price = parseInt(productCard.querySelector('.productPriceSpan').textContent);
		const count = parseInt(productCard.querySelector('.productCounter').textContent);
		const priceCalc = parseInt(price * count);
		const img = productCard.querySelector('.prodImg').getAttribute('src');
		//Формат карточки товара в корзине
		const productItem = `
				<div class="cart-content-item" data-id="${id}">
					<img src="${img}">
					<div class="cart-product__info">
						<h3 class="cart-product__title">${title}</h3>
						<span class="cart-product__price">${priceCalc}</span><span>руб.</span>
						<span class="cart-product__count" data-counter>${count}</span><span>шт.</span>
					</div>
					<button class="cart-product__delete" data-action="removeProduct">X</button>
				</div>
		`;
		//Проверка есть ли такой товар в корзине(есои есть - добавить колчиество)
		const itemInCart = cartProductList.querySelector(`[data-id="${id}"]`);
		if (itemInCart) {
			//Пересчет количества
			let a = itemInCart.querySelector('[data-counter]');
			let b = productCard.querySelector('.productCounter');
			a.innerText = parseInt(a.innerText) + parseInt(b.innerText);
			//Пересчет суммы денег
			let c = itemInCart.querySelector('.cart-product__price');
			c.innerText = parseInt(c.innerText) + parseInt(priceCalc);
			calcFullPrice();

		}
		//Если товара нет - создать такой товар
		else{
		cartProductList.insertAdjacentHTML('afterbegin', productItem);
		calcFullPrice();

		}
	}
	//Удаление товара из корзины
	if(clickWindow.target.dataset.action === 'removeProduct'){
		var productCard = clickWindow.target.closest('.cart-content-item');
		productCard.remove();	
		calcFullPrice();
	}
	//Вывод количества товаров в корзине
	const sum = parseInt(cartProductList.children.length);
	cartQuantity.innerText = sum;
	// Подсчет итоговой стоимости товаров
	function calcFullPrice (){
		const cartItems = document.querySelectorAll('.cart-content-item');
		let calcedPrice = 0;
		cartItems.forEach(function (item){
			const a = parseInt(item.querySelector('.cart-product__price').innerText);
			calcedPrice = calcedPrice + a;
			fullPrice.innerText = calcedPrice;
		})
	} 
	//Подсчет стоимости доставки
	if (fullPrice.innerText > 500){
	delivery.innerText = 'Бесплатно';
	}
	else {
	delivery.innerText = '250р';
	}
	// Если количество товара в корзине = 0, то и сумма денег = 0
	if (cartQuantity.innerText == 0){
		fullPrice.textContent = 0;
		delivery.innerText = '250р';
	}
	
})
