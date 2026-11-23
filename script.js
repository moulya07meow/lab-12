// Fetch and parse XML catalog
function fetchProductsFromXML(callback) {
    fetch('products.xml')
        .then(res => res.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            const productNodes = xmlDoc.getElementsByTagName("product");
            
            const products = [];
            for (let i = 0; i < productNodes.length; i++) {
                const node = productNodes[i];
                products.push({
                    id: node.getElementsByTagName("id")[0]?.textContent || "",
                    name: node.getElementsByTagName("name")[0]?.textContent || "",
                    category: node.getElementsByTagName("category")[0]?.textContent || "",
                    price: parseFloat(node.getElementsByTagName("price")[0]?.textContent || "0"),
                    description: node.getElementsByTagName("description")[0]?.textContent || "",
                    image: node.getElementsByTagName("image")[0]?.textContent || ""
                });
            }
            callback(products);
        });
}

// Shopping Cart (Persistent using localStorage)
function getCart() {
    return JSON.parse(localStorage.getItem("shopping_cart") || "[]");
}

function addToCart(id, name, price, image, quantity = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id == id);
    if (existing) {
        existing.quantity += parseInt(quantity);
    } else {
        cart.push({ id, name, price: parseFloat(price), image, quantity: parseInt(quantity) });
    }
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
    updateCartBadge();
    alert(`"${name}" added to cart!`);
}
