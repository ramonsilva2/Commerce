import axios, { AxiosRequestConfig } from "axios";
import { Product } from "./components/Products/Products";
import { Address } from "./pages/Address/NewAddress/NewAddress";

const api = axios.create({
  baseURL: "https://milk-holanda.herokuapp.com/",
});

export const getProducts = () => api.get("/products").then((resp) => resp.data);

export const getProductsByClient = (idClient: string) => {
  return api
    .get(`/products/get-products-by-client/${idClient}`)
    .then((response) => response.data)
};

export const addProductForClient = (product: Product) => {
  api
    .post("/client-product/add-product-by-client", {
      idClient: product.idClient,
      idProduct: product.id,
    })
    .then((resp) => resp.data);
};

export const addAddress = (address: Address) =>
  api
    .post(`/address/save/${address.clientId}`, address)
    .then((resp) => resp.data);

export const updateAddress = (address: Address) =>
  api
    .put(`/address/update/${address.clientId}`, address)
    .then((response) => response.data);

export const getAddresses = (idClient: string) =>
  api.get(`/address/${idClient}`).then((resp) => resp.data);

export const deleteAddressById = (id: number) =>
  api.delete(`/address/delete/${id}`);

export const updateAddressById = (
  idClient: string,
  address: AxiosRequestConfig
) =>
  api.delete(`/address/$update/${idClient}`, address).then((resp) => resp.data);
