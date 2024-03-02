import React from 'react';
import { toast } from 'react-toastify';
import axios from "axios";


function AddNewCategory({setCategories}) {
    const [categoryname, setcategoryname] = React.useState("");
    const [categorydescription, setcategorydescription] = React.useState("");

    
    /* Adding new category  */
  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    if(categoryname === ""){
      toast.error("Please fill out the form")
    }
    else{
      /* Adding New Category */
    let result = await fetch("http://localhost:5000/api/addcategory",{
      method: "post",
      body: JSON.stringify({categoryname, categorydescription}),
      headers: {"Content-Type": "application/json"}
    });
    result = await result.json();
  

    if(result.Status === "504"){
      toast.warn("Error in connecting to server, please try again latter")
    }
    else if(result.Status === "present"){
      toast.error("Category Already Present")
    }
    else{
      toast.success("New Category Added!")

      /* Fetching records from categories table */
      axios.get("http://localhost:5000/api/getcategories")
        .then(categories => setCategories(categories.data))
        .catch(err => toast.error(err))
      setcategoryname("")
      setcategorydescription("")
    }
    }
  }

  return (
      <div className="col-12 col-md-4">
          <div className="card">
              <div className="card-header">
                  <h5 className="card-title mb-0">Add new Category</h5>
              </div>
              <div className="card-body">

                  {/* Add new Category Form */}
                  <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                          <label htmlFor="categoryname" className="form-label">Name</label>
                          <input type="text" className="form-control" name="categoryname" id="categoryname"
                              onChange={e => setcategoryname(e.target.value)} value={categoryname} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="categorydiscription" className="form-label">Description<span className="text-muted"> (optional)</span></label>
                          <textarea className="form-control" name="categorydiscription" id="categorydiscription" rows="5"
                              onChange={e => setcategorydescription(e.target.value)} value={categorydescription}></textarea>
                      </div>
                      <div className="mb-3">
                          <button type="submit" className="btn btn-primary">Add New Category</button>
                
                      </div>
                  </form>
                  {/* Add New Category Form End */}
              </div>
          </div>
      </div>
  )
}

export default AddNewCategory
