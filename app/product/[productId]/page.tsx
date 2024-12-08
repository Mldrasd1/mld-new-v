import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";
import { products } from "@/utls/products";
interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const product = products.find((item) => item.id === params.productId);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}></ProductDetails>
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
