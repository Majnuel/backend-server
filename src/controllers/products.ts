import express from "express";
import { isValidObjectId } from "mongoose";
import {
  allProducts,
  deleteProduct,
  getById,
  newProduct,
  update
} from "../api/products";

export const getProducts = async (
  req: express.Request,
  res: express.Response
) => {
  if (req.params.id) {
    try {
      const id = req.params.id;
      const product = await getById(id);
      if (!product) {
        res.status(404).json({ msg: "product not found" });
      } else {
        res.status(200).json({ product: product });
      }
    } catch (err: any) {
      res
        .status(401)
        .json({ msg: "not a valid product ID", error: err.message });
    }
  } else {
    try {
      const products = await allProducts();
      res.status(200).json({ products: products });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
};

export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const product = { ...req.body };
    await newProduct(product);
    res.status(201).json({ "new product": product });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteByID = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    if (isValidObjectId(id) && (await getById(id))) {
      deleteProduct(id);
      res.status(200).json({ msg: "product deleted" });
    } else {
      res
        .status(404)
        .json({ msg: "product not found or not a valid productId" });
    }
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id) && (await getById(id))) {
      const {
        name,
        description,
        stock,
        categoryID,
        price,
        thumbnailURL,
        images
      } = req.body;
      update(
        id,
        name,
        description,
        stock,
        price,
        categoryID,
        thumbnailURL,
        images
      );

      res.status(200).json({ msg: "product updated" });
    } else {
      res.status(400).json({ msg: "bad request" });
    }
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
