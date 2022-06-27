import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const defaultProducts: Array<PlpToPdp.Poduct> = [];
  const [products, setProducts] = useState(defaultProducts);
  const [aProductIsExpanded, setAProductIsExpanded] = useState(false);

  const toggleOtherProducts = async (index: number) => {
    if (aProductIsExpanded) {
      let callBack = (product: PlpToPdp.Poduct, i: number) => {
        product.hidden = false;
        product.expanded = false;
        return product;
      };
      const updatedProducts = products.map(callBack);
      setProducts(updatedProducts);
      setAProductIsExpanded(false);
      return;
    }

    let callBack = (product: PlpToPdp.Poduct, i: number) => {
      product.hidden = i !== index ? true : false;
      product.expanded = i === index ? true : false;
      return product;
    };

    const updatedProducts = products.map(callBack);
    setProducts(updatedProducts);
    setAProductIsExpanded(true);
    setTimeout(async () => {
      const res = await fetch("./data/p" + (index + 1) + ".json");
      const json = await res.json();
      const updatedProducts = products.map((product, i) => {
        if (i === index) {
          product.name = json.name;
          product.description = json.description;
          product.price = json.price;
          product.image = json.image;
        }
        return product;
      });
      console.log(setProducts);

      setProducts(updatedProducts);
    }, 500);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("./data/products.json");
      const json = await res.json();
      setProducts(json as Array<any>);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>PLP to PDP</h1>
      </header>
      <main>
        {products.map((product, index) => (
          <Card
            name={product.name}
            description={product.description}
            image={product.image}
            price={product.price}
            color={product.color}
            hidden={product.hidden}
            expanded={product.expanded}
            onClickHandler={() => {
              toggleOtherProducts(index);
            }}
            key={index}
          />
        ))}
      </main>
      <footer>
        Github:{" "}
        <a href="https://github.com/alexanderstoev/plp-to-pdp" target="_blank">
          https://github.com/alexanderstoev/plp-to-pdp
        </a>
      </footer>
    </div>
  );
}

export default App;
