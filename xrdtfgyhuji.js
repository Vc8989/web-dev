class AnalyzeProductData {
    constructor() {
        this.products = [];
        this.filterHistory = [];
    }

    async fetchData() {
        const response = await fetch('https://fakestoreapi.com/products');
        this.products = await response.json();
    }

    displayFirstFive() {
        console.log("First 5 Products:");
        this.products.slice(0, 5).forEach(product => {
            console.log(`${product.title} - $${product.price}`);
        });
    }

    filterByCategory(category) {
        const filteredProducts = this.products.filter(product => product.category === category);
        const timestamp = new Date().toISOString();
        this.filterHistory.push({ category, products: filteredProducts, timestamp });
        
        console.log(`\nFiltered Products in category '${category}':`);
        filteredProducts.forEach(product => {
            console.log(`${product.title} - $${product.price}`);
        });
    }

    highestPricedProduct() {
        const highest = this.products.reduce((prev, current) => (prev.price > current.price) ? prev : current);
        console.log(`\nHighest Priced Product: ${highest.title} - $${highest.price}`);
    }

    averagePrice() {
        const avgPrice = this.products.reduce((sum, product) => sum + product.price, 0) / this.products.length;
        console.log(`\nAverage Price of Products: $${avgPrice.toFixed(2)}`);
    }

    displayFilterHistory() {
        console.log("\nFilter History:");
        this.filterHistory.forEach(entry => {
            console.log(`Category: ${entry.category}, Timestamp: ${entry.timestamp}, Products: ${entry.products.map(p => p.title).join(', ')}`);
        });
    }

    async run() {
        await this.fetchData();
        this.displayFirstFive();
        this.highestPricedProduct();
        this.averagePrice();
    }
}

// Running the application
const app = new AnalyzeProductData();
app.run().then(() => {
    // Example of filtering by category
    app.filterByCategory("men's clothing");
    app.displayFilterHistory();
});