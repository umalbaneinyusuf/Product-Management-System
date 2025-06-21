# CRUDs - Product Management System

A simple CRUD app to manage products. You can create, read, update, and delete products with price calculations. The data is saved locally in the browser using `localStorage`.

## Features

- Add products with title, price, taxes, ads, discount, count, and category.
- Automatically calculates total price (price + taxes + ads - discount).
- Add multiple products at once using the count field.
- Display products in a table with update and delete buttons.
- Delete all products at once.
- Search products by title or category.
- Update existing products.
- Data is stored locally in browser's `localStorage`.
- Clean and simple UI with green and dark theme.

## How to Use

1. Fill the product details and press **Create** to add a product.
2. Total price updates automatically as you enter price and fees.
3. To update a product, click the **UPDATE** button, edit the data, then click **Update**.
4. To delete a product, click the **DELETE** button next to it.
5. To delete all products, click the **Delete All** button.
6. Use the search input to find products by title or category. Switch search mode using the buttons.


## Requirements

- Modern web browser with JavaScript and `localStorage` support.

## Notes

- Data persists in `localStorage` even if you reload or close the browser.
- No backend or database needed.
