import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useCart } from '@/store/cartStore';
import { View, FlatList } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Redirect } from 'expo-router';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from './api/orders';

export default function CartScreen() {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  if (items.length === 0) {
    return <Redirect href={'/'} />;
  }

  const createOrderMutation = useMutation({
    mutationFn: () => createOrder(
      items.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))
    ),
    onSuccess: () => {
      console.log(data);
      resetCart();
    },
    onError: (error) => {
      console.log(error);
    },
  })

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) => (
        <HStack className="bg-white p-3">
          <VStack space="sm">
            <Text bold>{item.product.name}</Text>
            <Text>$ {item.product.price}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={() => createOrderMutation.mutate()}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
