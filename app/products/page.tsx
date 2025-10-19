import ProductsClient from "@/components/product/ProductsClient";
import { categoryMapping, products } from "@/data/product.data";

export default function Products() {
  return <ProductsClient initialProducts={products} categoryMapping={categoryMapping} />;
}