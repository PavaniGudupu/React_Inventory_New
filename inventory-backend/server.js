import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from "cors";
import { field_Validation, id_Validation } from "./middleware/validation.js";
import * as categoryModel from "./models/categoryModel.js";
import * as productModel from "./models/productModel.js";

const app = express();
const port = 4000;

env.config();

// const db = new pg.Client({
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });
// db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/ProductList", async (req, res) => {
  try {
    const { filterCategory, search, limit = 10, offset = 0 } = req.body;
    // let productResult;
    // const sqlQuery = `
    //     SELECT p.*, c.category 
    //     FROM products p
    //     INNER JOIN category c ON p.category_id = c.category_id
    // `;

    // if (filterCategory && search) {
    //   productResult = await db.query(
    //     sqlQuery +
    //       `
    //     WHERE ${filterCategory}::text ILIKE $1
    //     ORDER BY p.id ASC LIMIT $2 OFFSET $3;
    //   `,
    //     [`${search}%`, limit, offset] // safe parameter
    //   );
    // } else {
    //   productResult = await db.query(
    //     sqlQuery +
    //       `
    //   ORDER BY p.id ASC
    //   LIMIT $1 OFFSET $2;
    // `,
    //     [limit, offset]
    //   );
    // }

    // return res.json({
    //   products: productResult.rows,
    // });

    let products;
    if (filterCategory && search) {
      products = await productModel.getFilteredProducts(filterCategory, search, limit, offset);
    } else {
      products = await productModel.getAllProducts(limit, offset);
    }

    return res.json({
      products: products,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/getCategories", async (req, res) => {
  try {
    // const categoryResult = await db.query(`
    //   SELECT * FROM category ORDER BY category_id ASC
    //   `);
    // const categoryResp = categoryResult.rows;
    const categoryResp = await categoryModel.getAllCategories();
    //console.log(categoryResp);
    res.json(categoryResp);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/AddProduct", field_Validation, async (req, res) => {
  try {
    const { name, category_id, mrp, sp, cp, classification, size } = req.body;

    // const result = await db.query(
    //   `INSERT INTO products
    //     (product_name, category_id, mrp, sp, cp, classification, size)
    //    VALUES ($1, $2, $3, $4, $5, $6, $7)
    //    RETURNING *`,
    //   [name, category_id, mrp, sp, cp, classification, size]
    // );

    const result = await productModel.createProduct(name, category_id, mrp, sp, cp, classification, size);
    res.json({
      message: "Product added successfully",
      product: result,
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/EditProduct/:id", id_Validation, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // const editResult = await db.query(
    //   `
    //   SELECT p.*, c.category
    //   FROM products p
    //   INNER JOIN category c
    //   ON p.category_id = c.category_id
    //   WHERE p.id=$1
    //   `,
    //   [id]
    // );

    const editResult = await productModel.getProductById(id);
    if (editResult.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(editResult[0]); // return single product object
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/UpdateProduct/:id", id_Validation, field_Validation, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, category_id, mrp, sp, cp, classification, size } = req.body;

      // const result = await db.query(
      //   `UPDATE products SET
      //     product_name = $1, category_id = $2, mrp = $3, sp = $4, cp = $5, classification = $6, size = $7
      //    WHERE id = $8 RETURNING *`,
      //   [name, category_id, mrp, sp, cp, classification, size, id]
      // );

      const updatedProduct = await productModel.updateProduct(id, name, category_id, mrp, sp, cp, classification, size);
      res.json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.post("/DeleteProduct/:id", id_Validation, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // const deleteProduct = await db.query(
    //   `
    //    DELETE FROM products WHERE id = $1 RETURNING *
    //   `,
    //   [id]
    // );

    const deleteResp = await productModel.deleteProduct(id);
    res.json(deleteResp);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, (req, res) => {
  console.log(`Server running on port: http://localhost:${port}`);
});
