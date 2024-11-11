"use client";
import Image from "next/image";
import {Button, ButtonText} from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button>
        <ButtonText>Hello</ButtonText>
        <ButtonText>World</ButtonText>
        <ButtonText>!</ButtonText>
        <ButtonText>!</ButtonText>
        <ButtonText>:)</ButtonText>
        <ButtonText>:)</ButtonText>
      </Button>
    </div>
  );
}
