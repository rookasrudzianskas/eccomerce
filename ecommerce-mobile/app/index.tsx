import { View, Text, FlatList } from 'react-native';
import products from '../assets/products.json';
import ProductListItem from '../components/ProductListItem';
import { Button, ButtonText } from '@/components/ui/button';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';

export default function HomeScreen() {
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  return (
    <FlatList
      data={products}
      key={numColumns}
      numColumns={numColumns}
      renderItem={({ item }) => <ProductListItem product={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName='gap-2'
    />
  );
}
