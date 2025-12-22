import db from './db.js';

export const getAllProducts = async(limit=10, offset=0) => {
    const result = await db.query(`
      SELECT p.*, c.category
      FROM products p
      INNER JOIN category c
      ON p.category_id = c.category_id
      ORDER BY p.id ASC
      LIMIT $1 OFFSET $2;
    `, [limit, offset]
    );
    return result.rows;
}


export const getFilteredProducts = async(filterCategory, search, limit, offset) => {
        const result = await db.query(`
        SELECT p.*, c.category 
        FROM products p
        INNER JOIN category c ON p.category_id = c.category_id
        WHERE ${filterCategory}::text ILIKE $1
        ORDER BY p.id ASC LIMIT $2 OFFSET $3;
      `, [`%${search}%`, limit, offset] // safe parameter
      );
      return result.rows;
}

export const createProduct = async(name, category_id, mrp, sp, cp, classification, size) => {
    const result = await db.query(
      `INSERT INTO products 
        (product_name, category_id, mrp, sp, cp, classification, size) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [name, category_id, mrp, sp, cp, classification, size]
    );
    return result.rows;
}


export const getProductById = async(id) => {
        const result = await db.query(
      `
      SELECT p.*, c.category
      FROM products p
      INNER JOIN category c
      ON p.category_id = c.category_id
      WHERE p.id=$1
      `,
      [id]
    );
    return result.rows;
}


export const updateProduct = async(id, name, category_id, mrp, sp, cp, classification, size) => {
    const result = await db.query(
      `UPDATE products SET 
        product_name = $1, category_id = $2, mrp = $3, sp = $4, cp = $5, classification = $6, size = $7 
       WHERE id = $8 RETURNING *`,
      [name, category_id, mrp, sp, cp, classification, size, id]
    );
    return result.rows[0];
}


export const deleteProduct = async(id) => {
    const result = await db.query(`
         DELETE FROM products WHERE id = $1 RETURNING *
        `, [id]);
    return result.rows;
}