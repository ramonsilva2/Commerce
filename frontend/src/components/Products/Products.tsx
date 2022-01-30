import axios from "axios";
import { useEffect, useState } from "react";
import {
  ProductsContainer,
  ProductContainer,
  ProductImage,
  ProductName,
  ProductPrice,
  AddButton,
} from "./styles";
import { useCommerceContext } from "../../contexts/ComerceContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { useQuery } from "react-query";
import * as api from "../../commerceAPI";

interface Product {
  id: Long;
  name: string;
  price: Number;
  urlImage: string;
  item: Item;
}

interface Item {
  id: Long;
  quantity: number;
  subtotal: number;
}

interface AllProducts {
  data: Product[];
}

const Products = () => {
  const { addProductForClient } = useCommerceContext();
  const { user } = useAuthContext();
  const [products, setProducts] = useState<AllProducts>();
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [tryGetProducts, setTryGetProducts] = useState<number>(0);
  const { data, isLoading, isError } = useQuery(
    "allProducts",
    api.getProducts
  );

  useEffect(() => {
    axios
      .get("https://milk-holanda.herokuapp.com/products")
      .then((result) => {
        setProducts(result);
        setLoadingProducts(false);
      })
      .catch((error) => {
        if (tryGetProducts < 2)
          setTimeout(() => setTryGetProducts(tryGetProducts + 1), 1000);
        else throw new Error("Erro ao carregar produtos! " + error.message);
      });
  }, [tryGetProducts]);

  return <>{isLoading ? (
    <h1>Carregando...</h1>
  ) : isError ? (
    <h1>Erro ao carregar produtos</h1>
  ) : data.length === 0 ? (
    <h1>Sem produtos</h1>
  ) : (
    <div style={{ marginTop: "2rem" }}>
      <ProductsContainer>
        {data.map((product: Product, index: number) => (
          <ProductContainer index={index + 1} key={Number(product.id)}>
            <ProductName>{product.name}</ProductName>
            <ProductImage src={product.urlImage} alt={product.name} />
            <ProductPrice>
              Preço -{" "}
              {product.price.toLocaleString("pt-br", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}{" "}
              $
            </ProductPrice>
            <AddButton onClick={() => addProductForClient(user?.id, product)}>
              Adicionar
            </AddButton>
            {/* <BuyButton onClick={() => buy(product)}>Comprar agora</BuyButton> */}
          </ProductContainer>
        ))}
      </ProductsContainer>
    </div>
  )}
  <h1>{isError}</h1>
  </>
};

export default Products;
