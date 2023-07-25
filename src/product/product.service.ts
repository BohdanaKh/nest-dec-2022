import { Injectable } from '@nestjs/common';
import { FilterProductDto } from './dto/filter-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  private products = [
    {
      id: 1,
      name: 'apple',
      description: 'jiu',
      price: 77,
      category: 'fruits',
    },
    {
      id: 2,
      name: 'apple',
      description: 'red',
      price: 25,
      category: 'fruits',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getFilteredProducts(filterProductDTO: FilterProductDto): Promise<any> {
    const { category, search } = filterProductDTO;
    let products = await this.getAllProducts();

    if (search) {
      products = products.filter(
        (product) =>
          product.name.includes(search) || product.description.includes(search),
      );
    }

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    return products;
  }

  async getAllProducts() {
    return this.products;
  }

  async getProduct(id: string) {
    const product = this.products.find((item) => item.id.toString() === id);
    console.log(product);
    return product;
  }

  async addProduct(createProductDTO: CreateProductDTO) {
    return this.products.push({
      id: this.products.length + 1,
      ...createProductDTO,
    });
  }

  async updateProduct(id: string, createProductDTO: CreateProductDTO) {
    let updatedProduct = this.products.find(
      (item) => item.id.toString() === id,
    );
    // @ts-ignore
    updatedProduct = { id: +id, createProductDTO };
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const deletedProduct = this.products.find(
      (item) => item.id.toString() === id,
    );
    const i = this.products.indexOf(deletedProduct);
    return this.products.splice(i, 1);
  }
}
