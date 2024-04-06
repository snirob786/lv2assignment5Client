/* eslint-disable prefer-const */
import { Form, Flex, Select, Slider, Button, InputNumber, Input } from "antd";
import { ChangeEvent, useState } from "react";

interface filterPropsType {
  setFilter: any;
  refetch: any;
}

const Filter = ({ setFilter, refetch }: filterPropsType) => {
  const [selectedValue, setSelectedValue] = useState("price");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState<number>(50000);
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedValue(value);
  };

  const priceSliderOnChangeComplete = (value: number | number[]) => {
    const [minPriceValue, maxPriceValue]: any = value;
    setMinPrice(minPriceValue);
    setMaxPrice(maxPriceValue);
  };
  const quantitySliderOnChangeComplete = (value: number | number[]) => {
    const [minQuantityValue, maxQuantityValue]: any = value;
    setMinQuantity(minQuantityValue);
    setMaxQuantity(maxQuantityValue);
  };

  const filterButtonTrigger = () => {
    let newFilter = null;
    if (selectedValue === "price") {
      newFilter = {
        minPrice: minPrice,
        maxPrice: maxPrice,
      };
    } else if (selectedValue === "quantity") {
      newFilter = {
        minQuantity: minQuantity,
        maxQuantity: maxQuantity,
      };
    } else if (selectedValue === "brand") {
      newFilter = {
        brand: brand,
      };
    } else if (selectedValue === "model") {
      newFilter = {
        model: model,
      };
    } else if (selectedValue === "type") {
      newFilter = {
        type: type,
      };
    } else if (selectedValue === "color") {
      newFilter = {
        color: color,
      };
    }
    setFilter(newFilter);
    refetch();
  };
  return (
    <>
      <Form>
        <Flex gap="middle" align="center">
          <Select
            defaultValue="price"
            style={{ width: 250 }}
            onChange={handleChangeSelect}
            options={[
              { value: "price", label: "Filter by Price" },
              { value: "quantity", label: "Filter by Quantity" },
              // { value: "releaseDate", label: "Filter by Release Date" },
              { value: "brand", label: "Filter by Brand" },
              { value: "model", label: "Filter by Model" },
              { value: "type", label: "Filter by Type" },
              { value: "color", label: "Filter by Color" },
            ]}
          />
          {selectedValue === "price" && (
            <Flex gap="middle" align="center">
              <Form.Item
                label="Min Price"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 18 }}
                style={{ margin: 0 }}
              >
                <InputNumber
                  value={minPrice}
                  onChange={(value: any) => setMinPrice(value)}
                />
              </Form.Item>
              <div style={{ width: "300px" }}>
                <Slider
                  range={{ draggableTrack: true }}
                  step={1000}
                  min={0}
                  max={500000}
                  value={[minPrice, maxPrice]}
                  defaultValue={[minPrice, maxPrice]}
                  onChange={priceSliderOnChangeComplete}
                />
              </div>
              <Form.Item label="Max Price" style={{ margin: 0 }}>
                <InputNumber
                  value={maxPrice}
                  onChange={(value: any) => setMaxPrice(value)}
                />
              </Form.Item>
            </Flex>
          )}
          {selectedValue === "quantity" && (
            <Flex gap="middle" align="center">
              <Form.Item
                label="Min Quantity"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 18 }}
                style={{ margin: 0 }}
              >
                <InputNumber
                  value={minQuantity}
                  onChange={(value: any) => setMinQuantity(value)}
                />
              </Form.Item>
              <div style={{ width: "300px" }}>
                <Slider
                  range={{ draggableTrack: true }}
                  step={1000}
                  min={0}
                  max={500000}
                  value={[minQuantity, maxQuantity]}
                  defaultValue={[minQuantity, maxQuantity]}
                  onChange={quantitySliderOnChangeComplete}
                />
              </div>
              <Form.Item label="Max Quantity" style={{ margin: 0 }}>
                <InputNumber
                  value={maxQuantity}
                  onChange={(value: any) => setMaxQuantity(value)}
                />
              </Form.Item>
            </Flex>
          )}
          {selectedValue === "brand" && (
            <Flex gap="middle" align="center">
              <Form.Item
                label="Input brand"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ margin: 0 }}
              >
                <Input
                  placeholder="Brand"
                  style={{ width: "250px" }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBrand(e.target.value)
                  }
                />
              </Form.Item>
            </Flex>
          )}
          {selectedValue === "model" && (
            <Flex gap="middle" align="center">
              <Form.Item
                label="Input model"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ margin: 0 }}
              >
                <Input
                  placeholder="Model"
                  style={{ width: "250px" }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setModel(e.target.value)
                  }
                />
              </Form.Item>
            </Flex>
          )}
          {selectedValue === "type" && (
            <Flex gap="middle" align="center">
              <Form.Item
                label="Input type"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ margin: 0 }}
              >
                <Input
                  placeholder="Type"
                  style={{ width: "250px" }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setType(e.target.value)
                  }
                />
              </Form.Item>
            </Flex>
          )}
          {selectedValue === "color" && (
            <Flex gap="middle" align="center">
              <Form.Item
                label="Input color"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ margin: 0 }}
              >
                <Input
                  placeholder="Color"
                  style={{ width: "250px" }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setColor(e.target.value)
                  }
                />
              </Form.Item>
            </Flex>
          )}

          <Button type="primary" onClick={filterButtonTrigger}>
            Filter
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default Filter;
