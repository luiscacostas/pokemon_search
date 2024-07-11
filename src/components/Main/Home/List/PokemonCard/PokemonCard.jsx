import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const PokemonCard = ({ dataItem: { name, id, types=[] }, dataImg: { front_default }}) => {
  const typeOne = types[0]?.type?.name || 'unknown';
  return (
    <Card className={`custom-bg-color card ${typeOne}`} shadow="sm" isPressable onPress={() => console.log("item pressed")}>
      <CardBody className={`overflow-visible p-0`}>
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={name}
          className="w-full object-cover h-[140px]"
          src={front_default}
        />
      </CardBody>
      <CardFooter className="text-small justify-between design-text-p">
        <b>{name}</b>
        <p className="text-default-">{id}</p>
        <p className="text-default-">{typeOne}</p>
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;