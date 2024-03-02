import React, {useRef, useCallback, useEffect} from 'react';
import Nav from '../../Layout/Nav';
import TopNav from '../../Layout/TopNav';
import JoditEditor from 'jodit-react';
import {useDropzone} from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { TagsInput } from "react-tag-input-component";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Footer from '../../Layout/Footer';
import TopLoadingBar from '../../addons/TopLoadingBar';
import { TailSpin } from 'react-loader-spinner';




export default function Addproduct() {

  /* Text Editor */
  const [content, setContent] = React.useState('');
  const editor = useRef(null);
  const config = {
    placeholder: "Product Description",
    height: '300px',
    buttons: [ "bold", "italic", "underline", "|", "ul", "ol", "|", "center", "left", "right", "justify", "|", "link", "image", 'table'],
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ["brush", "file"],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
  }


  /* Media Dropzone */
  const [files, setFiles] = React.useState([]);
  const onDrop = useCallback(acceptedFiles => {
    if(acceptedFiles?.length){
      setFiles(previousFiles =>[
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file,{preview : URL.createObjectURL(file) })
          )
      ])
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept:{
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg']
  },
  maxSize: 1024 * 5000
})
  const removeFile = name =>{
    setFiles(files => files.filter(file => file.name !== name))
  }

  /*  Product Tags Input */
  const [selected, setSelected] = React.useState([]);


  /* Product Type */
  const [productType, setProductType] = React.useState("normal")
  

  /* State Variable for Select Categories  */
  const [categories, setCategories] = React.useState([]);

  /* Fetching Categories from DB  */
  useEffect(()=>{
    const fetchCategories = async () => {
      try{
        const response = await axios.get("http://localhost:5000/api/getcategories");
        setCategories(response.data)
      }catch(error){
        toast.error(error.message)
      }
    };
    fetchCategories();
  },[]);


  /*  State Variable for Select Vendors */
  const [vendors, setVendors] = React.useState([]);

  /*  Fetching Vendors from DB  */
  useEffect(()=>{
    const fetchVendors = async () => {
      try{
        const response = await axios.get("http://localhost:5000/api/getsellers");
        setVendors(response.data)
      }catch(error){
        toast.error(error.message)
      }
    };
    fetchVendors();
  },[]);


  /* State Variable for Inserting Product into DB  */
  const [title, setTitle] = React.useState("");
  const [quantity,setQuantity] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [deliveryDays, setDeliveryDays] = React.useState("");
  const [deliveryFee, setDeliveryFee] = React.useState("");
  const [basePrice, setBasePrice] = React.useState("");
  const [discountPrice, setDiscountPrice] = React.useState("");
  const [Instock, setInstock] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedVendor, setSelectedVendor] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [bidStartTime, setBidStartTime] = React.useState("");
  const [bidEndTime, setBidEndTime] = React.useState("");
  const [minBid, setMinBid] = React.useState("");
  const [bidIncrement, setBidIncrement] = React.useState("")
  /* State variable for loading icon  */
  const [loading, setLoading] = React.useState(false);



  /*  Inserting Product into DB   */
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if(!title  || files.length === 0 || !weight || !deliveryDays || !deliveryFee || !selectedVendor || !selectedCategory){
    toast.error("Please fill out the form")
    }
    else if(productType === "normal" && !basePrice){
      toast.error("Please fill out the form")
    }
    else{
      try{
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", content);
        formData.append("quantity", quantity);
        formData.append("weight", weight);
        formData.append("deliveryDays", deliveryDays);
        formData.append("deliveryFee", deliveryFee);
        formData.append("basePrice", basePrice);
        formData.append("discPrice", discountPrice);
        formData.append("inStock", Instock);
        formData.append("selectedVendor", selectedVendor);
        formData.append("selectedCategory", selectedCategory);
        formData.append("status", status);
        formData.append("tags", selected);
        formData.append("productType", productType);
        formData.append("bidStartTime", bidStartTime);
        formData.append("bidEndTime", bidEndTime);
        formData.append("minBid", minBid);
        formData.append("bidIncrement", bidIncrement);


        // Append each file to the FormData
        files.forEach((file) => {
          formData.append(`images`, file);
        });

        const result = await axios.post("http://localhost:5000/api/addproducts", formData)

        setTimeout(() => {
          setLoading(false); // set loading state back to false after 2 seconds
          if (result.data.addProdStatus === "400") {
            toast.error("Error uploading images");
          }
          else if (result.data.addProdStatus === "500") {
            toast.error("Internal Server Error")
          }
          else {
            toast.success("Product Added!")
            discardProductEntry();
          }
        }, 2000);

      }catch(err){
        toast.error(err.message);
      }
    }
  }

  // Empty the input fields upon click on the dicard button
  const discardProductEntry = () =>{
    setTitle("");
    setContent("");
    setFiles([]);
    setQuantity("");
    setWeight("");
    setDeliveryDays("");
    setDeliveryFee("");
    setBasePrice("");
    setDiscountPrice("");
    setInstock(true);
    setSelectedCategory("");
    setSelectedVendor("");
    setStatus("");
    setBidStartTime("");
    setBidEndTime("");
    setMinBid("");
    setBidIncrement("");
    setProductType("normal");
    setSelected([]);
  }


  return (
    <div id="wrapper">
      <Nav />
      <TopLoadingBar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <TopNav />

                <div className="container-fluid">
                  {/* Content */ }
                <h4 className="py-3 mb-4">
                  <span className="text-muted fw-light">Products /</span>
                  <span>Add Product</span>
                </h4>

                {/* Add Product*/}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">

                  <div className="d-flex flex-column justify-content-center">
                    <h4 className="mb-1 mt-3">Add a new Product</h4>
                  </div>

                  <div className="d-flex align-content-center flex-wrap gap-3">
                  <button className="btn btn-dark" onClick={discardProductEntry}>Discard</button>
                    <button className="btn btn-secondary">Save Draft</button>
                    <button type="submit" className="btn btn-primary"
                    onClick={handleProductSubmit}>
      
                      {
                      loading ? <TailSpin visible={true} height="18" width="18" color="#ffffff" /> : "Publish"
                      }
                      </button>
                  </div>
                </div>

                {/* Adding Product Form */}
                <form encType="multipart/form-data">
                <div className="row">

                  {/* Left Column Starts */}
                  <div className="col-12 col-lg-8">

                    {/* Product Information Card */}
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header #prod-card-header">
                        <h5 className="card-title mb-0">Product Information</h5>
                      </div>
                      <div className="card-body">

                        {/* Product Title Input */ }
                        <div className="mb-3">
                          <label className="form-label" htmlFor="productTitle">Title</label>
                          <input type="text" className="form-control" placeholder="Product Title" name="producttitle" id="productTitle" aria-label="Product Title"
                          onChange={(e)=>setTitle(e.target.value)} value={title} />
                        </div>
                        {/* Product Title end */ }

                        {/* Product Description Input */ }
                        <div>
                          <label className="form-label" htmlFor="productDescription">Description
                          <span className="text-muted"> (optional)</span></label>
                      <JoditEditor
                        
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={(newContent) => {}}
                      
                      />
                        </div>
                        {/* Product Description Input end */}
                      </div>
                    </div>
                    {/* Product Information Card End */ }

                    {/* Product Media Input */ }
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 card-title">Media</h5>
                      </div>
                      <div className="card-body">
                         

                          <div {...getRootProps()} className="p-5 mt-2 text-center border">
                          <input {...getInputProps()} />
                          {
                            isDragActive ?
                              <p>Drop the files here ...</p> :
                              <p>
                                <FontAwesomeIcon icon={faUpload} className="uploadIcon mb-3 text-primary" />  <br />
                                Drag and drop some files here, or click to select files<br />
                              <i className="text-muted">(Only *.jpeg, and *.png images will be accepted)</i>
                              </p>
                          }
                        </div>

                        {files.length > 0 && (
                          <h6 className="mt-4">Selected Images ({files.length})</h6>
                        )}
                        {/* Selected Files Preview */}
                        <ul className="mt-2 list-unstyled d-flex justify-content-center align-items-center">
                          {files.map(file =>{
                           return (
                           <li key={file.name} className="mx-3">
                            <img 
                            src={file.preview} 
                            alt={file.name} 
                            width={100} 
                            height={100}
                            onLoad={()=>{
                              URL.revokeObjectURL(file.preview)
                            }}
                            className="img-thumbnail rounded"
                            />
                            <button type="button" className="btn bg-danger btn-close rounded-circle p-2 btn-sm mb-5"
                            onClick={()=>removeFile(file.name)}>
                              
                            </button>
                           </li>
                           )
                          })}
                        </ul>
                          

                      </div>
                    </div>
                    {/* Product Media End */}

                    {/* Inventry Details*/}
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h5 className="card-title mb-0">Inventory</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">

                          <div className="col-12 col-md-4 mx-auto card-separator">

                            <div className="d-flex justify-content-between flex-column mb-3 mb-md-0 pe-md-3">
                              <div className="nav flex-column nav-pills me-3 text-light" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <li className="nav-link active" id="v-pills-inventory-tab" data-bs-toggle="pill" data-bs-target="#v-pills-inventory" type="button" role="tab" aria-controls="v-pills-inventory" aria-selected="true">Inventory</li>
                                <li className="nav-link" id="v-pills-shipping-tab" data-bs-toggle="pill" data-bs-target="#v-pills-shipping" type="button" role="tab" aria-controls="v-pills-shipping" aria-selected="false">Shipping</li>
                                <li className="nav-link" id="v-pills-delivery-tab" data-bs-toggle="pill" data-bs-target="#v-pills-delivery" type="button" role="tab" aria-controls="v-pills-delivery" aria-selected="false">Delivery</li>
                              </div>
                            </div>

                          </div>
                          <div className="col-12 col-md-8 pt-4 pt-md-0">
                            {/* Inventory Tabs Content */}
                          <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-inventory" role="tabpanel" aria-labelledby="v-pills-inventory-tab" tabIndex="0">
                                  <label htmlFor="quantity" className="form-label">Quantity</label>
                                  <input type="number" className="form-control" name="quantity" placeholder="Quantity" id="quantity"
                                  onChange={e=>setQuantity(e.target.value)} value={quantity} />
                                </div>
                                <div className="tab-pane fade" id="v-pills-shipping" role="tabpanel" aria-labelledby="v-pills-shipping-tab" tabIndex="0">
                                  <label htmlFor="weight" className="form-label">Weight (g)</label>
                                  <input type="number" className="form-control" name="weight" placeholder="Weight in grams" id="weight"
                                  onChange={e=>setWeight(e.target.value)} value={weight} />
                                </div>
                                <div className="tab-pane fade" id="v-pills-delivery" role="tabpanel" aria-labelledby="v-pills-delivery-tab" tabIndex="0">
                                  <div className="mb-3">
                                    <label htmlFor="deliverydays" className="form-label">Deliver in (days)</label>
                                    <input type="number" className="form-control" name="deliverydays" placeholder="Eg. 5" id="deliverydays"
                                    onChange={e=>setDeliveryDays(e.target.value)} value={deliveryDays} />
                                  </div>
                                  <div className="mb-2">
                                    <label htmlFor="deliveryfee" className="form-label">Delivery Fee</label>
                                    <div className="input-group">
                                      <span className="input-group-text">RS.</span>
                                      <input type="number" className="form-control" name="deliveryfee" id="deliveryfee" placeholder="0.00"
                                     onChange={e=>setDeliveryFee(e.target.value)} value={deliveryFee} />
                                    </div>
                                    <p className='text-muted fs-14 mt-1'>If the delivery is Free, please enter 0 above.</p>
                                  </div>
                                </div>
                              </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Left Column End */}

                  {/* Right Column Starts*/}
                  <div className="col-12 col-lg-4">

                  {/* Product Type */}
                  <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h5 className="card-title mb-0">Product Type</h5>
                      </div>
                      <div className="card-body">

                        <div className="mb-3">
                          <label htmlFor="productType" className="form-label">Product Type</label>
                          <select className="form-select" value={productType} onChange={e=>setProductType(e.target.value)} name="productType" id="productType">
                            
                            <option value="normal">Normal Product</option>
                            <option value="bid">Bid Product</option>
                          </select>
                        </div>

                        {/* Additional Input fields if the product type is 'bid' */}
                        {productType === "bid" &&(
                          <div>
                        <div className="mb-3">
                          <label htmlFor="bidStartTime" className="form-label">Bid Start Time</label>
                          <input type="datetime-local" className="form-control" name="bidStartTime" id="bidStartTime"
                          onChange={e=>setBidStartTime(e.target.value)} value={bidStartTime} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="bidEndTime" className="form-label">Bid End Time</label>
                          <input type="datetime-local" className="form-control" name="bidEndTime" id="bidEndTime"
                          onChange={e=>setBidEndTime(e.target.value)} value={bidEndTime} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="minBid" className="form-label">Minimum Bid</label>
                          <div className="input-group">
                            <span className="input-group-text">RS.</span>
                            <input type="number" className="form-control" name="minBid" id="minBid"
                            onChange={e=>setMinBid(e.target.value)} value={minBid} />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="bidIncrement" className="form-label">Bid Increment</label>
                          <div className="input-group">
                            <span className="input-group-text">RS.</span>
                            <input type="number" className="form-control" name="bidIncrement" id="bidIncrement"
                            onChange={e=>setBidIncrement(e.target.value)} value={bidIncrement} />
                          </div>
                        </div>
                          </div>
                        )}

                      </div>
                    </div>
                    {/* Pricing Card */}
                    {productType === "normal" &&(
                      <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h5 className="card-title mb-0">Pricing</h5>
                      </div>
                      <div className="card-body">

                        {/* Product Base Price */}
                        <div className="mb-3">
                          <label htmlFor="productPrice" className="form-label">Base Price</label>
                          <div className="input-group">
                            <span className="input-group-text">RS.</span>
                            <input type="number" className="form-control" name="productPrice" id="productPrice" placeholder="0.00"
                            onChange={e=>setBasePrice(e.target.value)} value={basePrice} />
                          </div>
                        </div>

                        {/* Product Discounted Price */}
                        <div className="mb-4">
                          <label htmlFor="discountPrice" className="form-label">Discounted Price</label>
                          <div className="input-group">
                            <span className="input-group-text">RS.</span>
                            <input type="number" className="form-control" name="discountPrice" id="discountPrice" placeholder="0.00"
                            onChange={e=>setDiscountPrice(e.target.value)} value={discountPrice} />
                          </div>
                        </div>

                        {/* Instock Switch */}
                        <div className="d-flex justify-content-between align-items-center border-top pt-3">
                          <label htmlFor="Instock" className="mb-0 h6 form-label">In stock</label>
                          <div className="w-25 d-flex justify-content-end form-check form-switch">
                            <input type="checkbox" className="form-check-input" name="instock" role="switch" id="Instock" checked={Instock}
                            onChange={e=>setInstock(e.target.checked)} />
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                    
                    {/* Pricing Card End */}

                    {/* Product Organization Card */}
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h5 className="card-title mb-0">Product Organization</h5>
                      </div>
                      <div className="card-body">

                        {/* Vendor Select */}
                        <div className="mb-3">
                          <label htmlFor="vendor" className="form-label">Vendor</label>
                          <select className="form-select" id="vendor" name="vendor" data-placeholder="Select Vendor" aria-hidden="true" aria-label="product-vendor-select"
                          onChange={e=>setSelectedVendor(e.target.value)} value={selectedVendor}>
                            <option value="">Select Vendor</option>
                            {vendors.map((vendor)=>(
                              <option key={vendor.vendorId} value={vendor.vendorId}>{vendor.businessName}</option>
                              ))} 
                          </select>
                        </div>

                        {/* Category Select */}
                        <div className="mb-3">
                          <label htmlFor="category" className="form-label">Category</label>
                          <select className="form-select" id="category" name="category" data-placeholder="Select Category" aria-hidden="true" aria-label="product-category-select"
                          onChange={e=>setSelectedCategory(e.target.value)} value={selectedCategory}>
                            <option value="">Select Category</option>
                            {categories.map((category)=>(
                              <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                            ))}
                            
                          </select>
                        </div>

                        {/* Status Select */}
                        <div className="mb-3">
                          <label htmlFor="productStatus" className="form-label">Status</label>
                          <select className="form-select" id="productStatus" name="productStatus" data-placeholder="Select Status" aria-hidden="true" aria-label="product-status-select"
                          onChange={e=>setStatus(e.target.value)} value={status}>
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Draft">Draft</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="productTags" className="form-label">Tags</label>
                      <TagsInput
                        value={selected}
                        onChange={newTags=>setSelected(newTags)}
                        name="productTags"
                        placeHolder="Enter Tags"
                      />
                        </div>
                      </div>
                    </div>

                   
                    
                  </div>
                </div>
                </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    </div>
  )
}
