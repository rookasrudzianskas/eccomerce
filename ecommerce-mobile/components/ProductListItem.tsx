import { Card } from './ui/card';
import { Image } from './ui/image';
import { VStack } from './ui/vstack';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { Box } from './ui/box';
import { Button, ButtonText } from './ui/button';
import { Link, router, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';


interface Product {
  name: string;
  id: number;
  price: number;
  description: string;
  image: string;
}

export default function ProductListItem({ product }: { product: Product }) {
  const router = useRouter()
  return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(`/product/${product.id}`)} className="flex-1">
        <Card className="p-5 rounded-lg max-w-[360px] flex-1">
          <Image
            source={{
              uri: product.image,
            }}
            className="mb-6 h-[240px] w-full rounded-md"
            alt={`${product.name} image`}
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">
            {product.name}
          </Text>
          <Heading size="md" className="mb-4">
            ${product.price}
          </Heading>
        </Card>
      </TouchableOpacity>
  );
}
