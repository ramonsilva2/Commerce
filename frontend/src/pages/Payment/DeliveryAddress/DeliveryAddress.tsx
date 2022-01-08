import { useAuthContext } from "../../../contexts/AuthContext";
import {
  DeliveryAddressContainer,
  DeliveryAddressTitle,
  AddressContainer,
  OptionAddress,
  OptionAddressLabel,
  InfoAddressContainer,
} from "./styles";

interface Address {
  id: Long;
  street: string;
  number: number;
  complement: string;
  cep: string;
  city: string;
}

interface DeliveryAddressProps {
  selectDeliveryAddress: (
    addressOption: string,
    address: Address
  ) => void;
  deliveryAddressOption: string;
  deliveryAddress: Address | undefined;
}

const DeliveryAddress = ({
  selectDeliveryAddress,
  deliveryAddressOption,
}: DeliveryAddressProps) => {
  const { user } = useAuthContext();

  return (
    <DeliveryAddressContainer>
      <DeliveryAddressTitle>Escolha o endereço</DeliveryAddressTitle>
      {user?.address?.map((deliveryAddress, index) =>  (
        <AddressContainer
          key={Number(deliveryAddress.id)}
          onClick={() => selectDeliveryAddress(`address ${index}`, deliveryAddress)}
        >
          <OptionAddress
            type={"radio"}
            checked={deliveryAddressOption === `address ${index}`}
            onChange={()=>{}}
            value={`address ${index}`}
            name="address"
          />
          <InfoAddressContainer>
            <OptionAddressLabel>
              {deliveryAddress.street}, {deliveryAddress.number} 
            </OptionAddressLabel>
            <OptionAddressLabel>
              {deliveryAddress.district} - {deliveryAddress.city} - {deliveryAddress.cep}
            </OptionAddressLabel>
          </InfoAddressContainer>
        </AddressContainer>
      ))}
    </DeliveryAddressContainer>
  );
};

export default DeliveryAddress;
