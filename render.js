var productsContainer = document.querySelector('#products-container');
console.log(productsContainer);
async function getProducts() {
	const response = await fetch ('.products.json');
	console.log(response);
}
getProducts();
