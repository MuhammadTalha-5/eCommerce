import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


function ListNormalProducts({normalProducts}) {
   
  return (
      <div className="tab-pane fade show active" id="normal-products-tab" role="tabpanel" aria-labelledby="normal-products" tabindex="0">
          <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead className="table-dark">
                      <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Quantity</th>
                          <th>Weight</th>
                          <th>Delivery Days</th>
                          <th>Delivery Fee</th>
                          <th>Base Price</th>
                          <th>Discounted Price</th>
                          <th>Stock Status</th>
                          <th>Vendor</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Tags</th>
                          <th>Published Date</th>

                      </tr>
                  </thead>
                  <tfoot className="table-dark">
                      <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Quantity</th>
                          <th>Weight</th>
                          <th>Delivery Days</th>
                          <th>Delivery Fee</th>
                          <th>Base Price</th>
                          <th>Discounted Price</th>
                          <th>Stock Status</th>
                          <th>Vendor</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Tags</th>
                          <th>Published Date</th>
                      </tr>
                  </tfoot>
                  <tbody>
                      {normalProducts.length > 0 ? normalProducts.map((product) =>
                          <tr key={product.productId}>
                              <td>#{product.productId}</td>
                              <td>{product.title}</td>
                              <td>{product.quantity}</td>
                              <td>{product.weight}</td>
                              <td>{product.deliveryDays}</td>
                              <td>{product.deliveryFee}</td>
                              <td>{product.basePrice}</td>
                              <td>{product.discPrice}</td>
                              <td>
                                  <span className={`badge ${product.inStock ? 'bg-success' : 'bg-danger'}`}>
                                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                                  </span>
                              </td>
                              <td>{product.businessName}</td>
                              <td>{product.categoryName}</td>
                              <td>{product.status === "Active" ?
                                  <span className="d-flex justify-content-center align-items-center"><FontAwesomeIcon icon={faCircle} className="text-success mx-1" />Active</span>
                                  :
                                  <span><FontAwesomeIcon icon={faCircle} className="text-secondary" /> Draft</span>
                              }</td>
                              <td>{product.tags}</td>
                              <td>
                                  {new Date(product.createdAt).toLocaleDateString('en-US',
                                      {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric',
                                          hour12: true
                                      }
                                  )}
                              </td>

                          </tr>
                      ) :
                          (
                              <tr>
                                  <td colSpan="13" className="mt-2 text-center"><span>No Products Found</span></td>
                              </tr>
                          )}
                  </tbody>
              </table>

          </div>
      </div>
  )
}

export default ListNormalProducts;
