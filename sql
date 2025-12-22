export const createProduct = async (product) => {
  const result = await db.query(
    `
    INSERT INTO products (
      product_name,
      category_id,
      mrp,
      sp,
      cp,
      classification,
      size
    )
    SELECT
      data.name,
      data.category_id,
      data.mrp,
      data.sp,
      data.cp,
      data.classification,
      data.size
    FROM jsonb_to_record($1::jsonb) AS data(
      name TEXT,
      category_id INT,
      mrp NUMERIC,
      sp NUMERIC,
      cp NUMERIC,
      classification TEXT,
      size TEXT
    )
    RETURNING *;
    `,
    [product]
  );

  return result.rows;
};

// ✔ Call it like this (NAMED)
createProduct({
  name: "Soap",
  category_id: 2,
  mrp: 50,
  sp: 45,
  cp: 30,
  classification: "Daily",
  size: "100g",
});

// 🟢 Order doesn’t matter
// 🟢 Readable & scalable
// 🟢 Closest to named bind variables
