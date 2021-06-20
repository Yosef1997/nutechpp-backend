const productModal = require('../modals/product')
const response = require('../helpers/response')
const qs = require('querystring')
const fs = require('fs')
const { APP_URL } = process.env

exports.createProduct = async (req, res) => {
  try {
    const data = req.body
    const productData = {
      productName: data.productName,
      buyPrice: data.buyPrice,
      soldPrice: data.soldPrice,
      stock: data.stock,
      picture: req.file.filename
    }
    const createProduct = await productModal.createProduct(productData)
    if (createProduct.affectedRows > 0) {
      const results = await productModal.getProductByCondition({ id: createProduct.insertId })
      if (results.length > 0) {
        return response(res, 200, true, 'Product input success', results)
      }
      return response(res, 400, false, 'Product input failed')
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Product input failed')
  }
}

exports.getProduct = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 4
    cond.offset = (cond.page - 1) * cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    let totalPage
    let totalData

    if (cond.search) {
      totalData = await productModal.getCountProductByCondition(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await productModal.getCountProduct(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }
    console.log(totalData)
    const results = await productModal.getAllProductByCondition(cond)
    console.log(results)

    return response(
      res,
      200,
      true,
      'List of all product',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}product?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}product?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}

exports.getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params
    const results = await productModal.getProductByCondition({ id })
    console.log(results)
    if (results.length === 1) {
      return response(res, 200, true, `Detail's ${results[0].name}`, results[0])
    }
    return response(res, 404, false, 'Product not found')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const initialResults = await productModal.getProductByCondition({ id })
    if (initialResults.length < 1) {
      return response(res, 404, false, 'Product Not Found')
    }
    const deleteProduct = await productModal.deleteProduct(id)
    if (deleteProduct.affectedRows > 0) {
      if (initialResults[0].picture !== null) {
        fs.unlinkSync(`upload/product/${initialResults[0].picture}`)
      }
      return response(res, 200, true, 'Product delete success')
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params
    const {
      productName,
      buyPrice,
      soldPrice,
      stock
    } = req.body
    const initialResults = await productModal.getProductByCondition({ id })
    if (initialResults.length < 1) {
      return response(res, 404, false, 'Product Not Found')
    }

    // ProductName
    if (productName !== '' && productName !== undefined) {
      await productModal.updateProduct(id, { productName: productName })
    }

    // BuyPrice
    if (buyPrice !== '' && buyPrice !== undefined) {
      await productModal.updateProduct(id, { buyPrice: buyPrice })
    }

    // SoldPrice
    if (soldPrice !== '' && soldPrice !== undefined) {
      await productModal.updateProduct(id, { soldPrice: soldPrice })
    }

    // Stock
    if (stock !== '' && stock !== undefined) {
      await productModal.updateProduct(id, { stock: stock })
    }

    if (req.file) {
      const picture = req.file.filename
      const updatePicture = await productModal.updateProduct(id, { picture })
      if (updatePicture.affectedRows > 0) {
        if (initialResults[0].picture !== null) {
          fs.unlinkSync(`upload/product/${initialResults[0].picture}`)
        }
      }
    }

    // info
    const finalResult = await productModal.getProductByCondition({ id })
    if (finalResult.length > 0) {
      return response(res, 200, true, 'Product information has been updated', finalResult[0])
    }
    return response(res, 400, false, 'Edit product information fail')
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
