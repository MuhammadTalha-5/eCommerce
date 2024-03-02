import React from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

function EditCategories({editData, setEditData, setCategories}) {
    /* Edit Category Method  */
  const handleEdit = async(e) => {
    e.preventDefault();

    if(editData.categoryName === ""){
      toast.error("Please fill out the form")
    }
    else{
      let result = await axios.put(`http://localhost:5000/api/updatecategory/${editData.categoryId}`,{
      categoryName: editData.categoryName,
      categoryDescription: editData.categoryDescription,
    });

    if(result.editStatus === "504"){
      toast.warn("Error Updating Category")
    }
    else{
      toast.success("Category Updated")
      axios.get("http://localhost:5000/api/getcategories")
        .then(categories => setCategories(categories.data))
        .catch(err => toast.error(err))
    }
    }
  }
  return (
    <div className="modal fade"  tabIndex="-1" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Category</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                      ></button>
                  </div>
                  <div className="modal-body">
                      <div className="mb-3">
                          <label htmlFor="categoryName" className="form-label">Name</label>
                          <input type="text" className="form-control" name="categoryName" id="categoryName"
                          value={editData?.categoryName || ''}
                          onChange={(e) => setEditData({ ...editData, categoryName: e.target.value })} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="categoryDescription" className="form-label">Description
                           <span className="text-muted"> (optional)</span>
                          </label>
                          <textarea className="form-control" name="categoryDescription" id="categoryDescription" rows="5"
                          value={editData?.categoryDescription || ''}
                          onChange={(e) => setEditData({ ...editData, categoryDescription: e.target.value })}></textarea>
                      </div>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                      >Cancel</button>
                      <button type="button" className="btn btn-primary"
                      onClick={handleEdit}>Save changes</button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default EditCategories
