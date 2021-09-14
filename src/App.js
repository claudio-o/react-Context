import React, {useState, useContext}  from 'react';
import { CurrencyContext } from './currency-context'; 

const DATA = [
  {
    id: '1',
    title: 'The Road to React',
    price: 19.99,
  },
  {
    id: '2',
    title: 'The Road to GraphQL',
    price: 29.99,
  },
];
 
const CURRENCIES = {
  Euro: {
    symbol: '€',
    label: 'Euro',
    code: 'EUR',
    conversionRate: 1
  },
  Usd: {
    symbol: '$',
    code: 'USD',
    label: 'US Dollar',
    conversionRate: 1.19,
  },
};

const App = () => {
  
  const [currency, setCurrency] = useState(CURRENCIES.Euro);
  
  return (
    
    <CurrencyContext.Provider value={currency} > 
      
      {Object.values(CURRENCIES).map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => setCurrency(item)}
        >
          {item.label}
        </button>
      ))};

      <Books list={DATA} />
    </CurrencyContext.Provider>  
    
  );
};
 
const Books = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <Book key={item.id} item={item} />
      ))}
    </ul>
  );
};
 
const Book = ({ item }) => {
  const currency = useContext(CurrencyContext); 
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
  }).format(item.price * currency.conversionRate);
  return (  
     <li>
        {item.title} - {price} 
      </li>
  );
};
 
export default App;