import React,{useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from 'react-toastify';

function ListCategories({setCategories, categories, setEditData}) {


    /*  Loading the categories table  */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getcategories");
        setCategories(response.data);
      } catch (error) {
        toast.warn(error.message);
      }
    };

    fetchCategories();
  });

  /*  Deleting a category */
  const handleDelete = async(categoryId)=>{

    try {
      const result = await axios.delete(`http://localhost:5000/api/deletecategory/${categoryId}`);
      if (result.data.deletecategorystatus === "success") {
        toast.success("Category Deleted!");

        // Fetch updated categories after deletion
        axios.get("http://localhost:5000/api/getcategories")
        .then(categories => setCategories(categories.data))
        .catch(err => toast.error(err))

      } else {
        toast.warn("Error deleting category");
      }

    } catch (error) {
      toast.error(error.message);
    }

  }


  return (
      <div className="col-12 col-md-8">
          <div className="card">
              <div className="card-header">
                  <h5 className="card-title mb-0">Categories</h5>
              </div>
              <div className="card-body">
                  <div className="table-responsive">
                      <table className="table table-hover table-bordered">
                          <thead className="table-dark">
                              <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Description</th>
                                  <th scope="col">Created At</th>
                                  <th scope="col">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                  categories.length > 0 ? categories.map(category => (
                                      <tr key={category.categoryId}>

                                          <td>{category.categoryName}</td>
                                          <td>{category.categoryDescription}</td>
                                          <td>{new Date(category.createdAt).toLocaleDateString('en-US',
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
                                          <td>
                                              <div className="d-flex justify-content-between align-items-center">
                                                  <button type="button" className="btn btn-info btn-sm text-light"
                                                      data-bs-toggle="modal" data-bs-target="#editModal"
                                                      onClick={() => {
                                                          setEditData(category);
                                                      }
                                                      }
                                                  >
                                                      <FontAwesomeIcon icon={faPenToSquare} />
                                                  </button>

                                                  <button type="submit" className="btn btn-danger btn-sm m-2"
                                                      onClick={() => handleDelete(category.categoryId)}>
                                                      <FontAwesomeIcon icon={faTrash} />
                                                  </button>
                                              </div>
                                          </td>
                                      </tr>
                                  )) :
                                      <div className="mt-2 text-bold">No Categories Found</div>
                              }

                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ListCategories
