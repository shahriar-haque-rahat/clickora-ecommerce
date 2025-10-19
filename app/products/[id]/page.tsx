import ProductDetailClient from "@/components/product/ProductDetailClient";
import { products } from "@/data/product.data";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id));
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== Number.parseInt(params.id))
    .slice(0, 4);
  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}