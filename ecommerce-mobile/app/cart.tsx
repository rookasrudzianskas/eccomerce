import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useCart } from '@/store/cartStore';
import {View, FlatList, Alert} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Redirect } from 'expo-router';
import React, {useEffect} from 'react';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from './api/orders';
import {useStripe} from "@stripe/stripe-react-native";
import {createPaymentIntent} from "@/api/stripe";

export default function CartScreen() {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const paymentIntentMutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: async (data) => {
      const { customer, ephemeralKey, paymentIntent } = data;

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Stripe Demo Store',
        customerId: customer,
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
      });
      if (error) {
        Alert.alert('Error', error.message);
        console.log(error);
      }
      },
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    paymentIntentMutation.mutate();
  }, []);


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
  });

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Error', error.message);
      console.log(error);
    } else {
      Alert.alert('Success', 'PaymentSheet successfully opened');
      console.log('PaymentSheet successfully opened');
    }
  }

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
        <Button onPress={() => openPaymentSheet()}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
