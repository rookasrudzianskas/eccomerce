import { Text } from 'react-native';

interface Product {
    name: string;
    id: number;
    description: string;
    price: number;
  }

export default function ProductListItem({ product }: { product: Product }) {
  return <Text style={{ fontSize: 30 }}>{product.name}</Text>;
}