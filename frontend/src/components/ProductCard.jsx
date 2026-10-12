import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  Dialog,
  Portal,
  CloseButton,
} from "@chakra-ui/react";

import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useColorModeValue } from "./ui/color-mode";
import { toaster } from "./ui/toaster";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isOpen, setIsOpen] = useState(false);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const showToast = (title, description, type) => {
    toaster.create({
      title,
      description,
      type,
      duration: 3000,
    });
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      showToast("Error", message, "error");
    } else {
      showToast("Success", message, "success");
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(
      pid,
      updatedProduct
    );

    if (!success) {
      showToast("Error", message, "error");
    } else {
      showToast(
        "Success",
        "Product updated successfully",
        "success"
      );
      setIsOpen(false);
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h="48"
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text
          fontWeight="bold"
          fontSize="xl"
          color={textColor}
          mb={4}
        >
          ${product.price}
        </Text>

        <HStack gap={2}>
          <IconButton
            aria-label="Edit product"
            colorPalette="blue"
            variant="solid"
            onClick={() => {
              setUpdatedProduct(product);
              setIsOpen(true);
            }}
          >
            <FaEdit />
          </IconButton>

          <IconButton
            aria-label="Delete product"
            colorPalette="red"
            variant="solid"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <FaTrash />
          </IconButton>
        </HStack>
      </Box>

      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
              </Dialog.Header>

              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  position="absolute"
                  top={2}
                  right={2}
                />
              </Dialog.CloseTrigger>

              <Dialog.Body>
                <VStack gap={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <Button
                  colorPalette="blue"
                  mr={3}
                  onClick={() =>
                    handleUpdateProduct(
                      product._id,
                      updatedProduct
                    )
                  }
                >
                  Update
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default ProductCard;