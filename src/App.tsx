import React, { useState } from "react";
import "./App.css";

interface ItemPrices {
  [key: string]: number;
}

const validFruits = ["Apple", "Banana", "Melon", "Lime"];

function App() {
  const [basket, setBasket] = useState<string[]>([]);
  const [item, setItem] = useState<string>('');
  const [totalCost, setTotalCost] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const prices: ItemPrices = {
    "Apple": 35,
    "Banana": 20,
    "Melon": 50,
    "Lime": 15
  };

  const handleAddItem = () => {
    if (validFruits.includes(item)) {
      setBasket([...basket, item]);
      setItem('');
      setError(null);
    } else {
      setError("Please enter a valid fruit name.");
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedBasket = [...basket];
    updatedBasket.splice(index, 1);
    setBasket(updatedBasket);
    calculateTotalCost(updatedBasket);
  };

  const calculateTotalCost = (updatedBasket: string[]) => {
    let total = 0;
    const itemCount: ItemPrices = {};

    updatedBasket.forEach(item => {
      itemCount[item] = (itemCount[item] || 0) + 1;
    });

    for (const item in itemCount) {
      if (item === "Melon") {
        total += Math.ceil(itemCount[item] / 2) * prices[item];
      } else if (item === "Lime") {
        total += Math.floor(itemCount[item] / 3) * 2 * prices[item] + (itemCount[item] % 3) * prices[item];
      } else {
        total += itemCount[item] * prices[item];
      }
    }

    setTotalCost(total);
  };

  return (
    <div className="App">
      <h1>Fruit Basket</h1>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter item name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="basket">
        <ul>
          {basket.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => calculateTotalCost(basket)}>Calculate Total Cost</button>
      <div className="total-cost">Total Cost: {totalCost}p</div>
    </div>
  );
}

export default App;
