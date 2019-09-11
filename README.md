﻿# Flowlity-data-front
Before run this project, make sure the backend is working before.

## Feature

- A graph of inventory level(y-axis) vs. date(x-axis) of the selected product 

- Table of data filtered on the selected product: product_id; product_name; date; inventory_level

- Dropdown/Select option to choose the product ID or product name to visualize

- **(Bonus)** Add a button that allows data table editing. Add the possibility to change the "inventory level"  and send request to change it in the back-end 

- (**Bonus)** Add the possibility to choose multiple products and visualize them in the same graph

---

## Preparation:
- Install Node.js from office website https://nodejs.org/en/ (Ps. the NodeJs version should be >= 10.16.3)
- Chack the NodeJs and npm (or yarn) version

```bash
npm --version
6.4.1

node --version
v10.15.0
```

- Clone the Project into you local disk.

## Installation:
- Go into the root of the project.
run:

```bash
npm install
or
yarn
```

## Usage:

run the server:
```bash
npm run start
```
when there is the conosole log show that "server ready at http://localhost:3000"
