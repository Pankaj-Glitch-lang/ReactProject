// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { useEffect, useRef } from 'react';
// const Products = () => {

//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPage] = useState(1);
//     const filterRef = useRef(null)
//     const sortingRef = useRef(null);
//     const [filter, setFilter] = useState("");
//     const [sort, setSort] = useState("");



//     const handleChange = (e) => {
//         const category = filterRef.current.value;
//         setFilter(category)
//         setPage(1);



//     }

//     const paginationData = () => {

//         axios
//             .get((`https://fakestoreapi.com/products`)).then((res) => {


//                 const totalCount = res.data.length;
//                 console.log(totalCount)
//                 setTotalPage(Math.ceil(totalCount / 6))

//                 console.log(res.data)
//             }).catch((error) => {

//                 console.log("Somethong Went Wrong", error)
//             })



//     }

//     const getData = () => {

//       //  console.log(category)
//         const category = filter || filterRef.current.value || "";
//         const sortBy = sort || sortingRef.current.value || "";
//         axios
//             .get((`https://fakestoreapi.com/products/category/${category}?page=${page}&limit=6&sort=${sortBy}`)).then((res) => {

//                 setData(res.data)

//                 // console.log(`https://fakestoreapi.com/products?page=${page}&limit=6&category=${category}`)


//                 console.log(res.data)
//             }).catch((error) => {

//                 console.log("Somethong Went Wrong", error)
//             })
//     }
//     useEffect(() => {
//         getData()
//         paginationData()
//     }, [page,filter,sort])

//     const handleClick = (pageNumber) => {

//         setPage(pageNumber)
//     }

//     const handleSorting = () => {

//         const sortBy = sortingRef.current.value;
//         setSort(sortBy)
//         setPage(1)



//     }


//     return (
//         <>
//             <h2>Products</h2>

//             <div>
//                 <select ref={filterRef} onChange={handleChange} name="" id="">
//                     <option value="">Select By Category</option>
//                     <option value="men's clothing">Men's Clothing</option>
//                     <option value="electronics">Electronics</option>
//                     <option value="women's clothing">Woment's Clothing</option>
//                     <option value="jewelery">Jewelery</option>
//                 </select>

//                 <select name="" id="" ref={sortingRef} onChange={handleSorting}>
//                     <option value="">Sort By Price</option>
//                     <option value="asc">Low to High</option>
//                     <option value="desc">High To Low</option>

//                 </select>
//             </div>
//             <div className='Products'>
//                 {data.map((elem) => {
//                     return (
//                         <div>
//                             <img src={elem.image} alt="" width={250} />
//                             <h2>Title : {elem.title}</h2>
//                             <h3>Price :{elem.price}</h3>
//                         </div>
//                     )
//                 })}
//             </div>

//             <div className='Pagination'>
//                 {Array(totalPages).fill(0).map((elem, i) => {
//                     return (
//                         <button onClick={() => handleClick(i + 1)}>{i + 1}</button>
//                     )
//                 })}
//             </div>

//         </>
//     )
// }

// export default Products


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Products = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");

    const filterRef = useRef(null);
    const sortingRef = useRef(null);

    // Fetch products based on filter, sort, and pagination
    const getData = () => {
        const category = filter || filterRef.current.value || "";
        const sortBy = sort || sortingRef.current.value || "";
        
        axios.get(`https://fakestoreapi.com/products/category/${category}?page=${page}&limit=6&sort=${sortBy}`)
            .then((res) => {
                setData(res.data);
                const totalCount = res.data.length; // Adjust this as needed based on the API response
                setTotalPages(Math.ceil(20 / 6));
            })
            .catch((error) => {
                console.log("Something Went Wrong", error);
            });
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setPage(1); // Reset to the first page when the filter changes
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1); // Reset to the first page when the sort order changes
    };

    useEffect(() => {
        getData();
    }, [filter, sort, page]);

    return (
        <>
            <h2>Products</h2>
            <div>
                <select ref={filterRef} onChange={handleFilterChange}>
                    <option value="">Select By Category</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="jewelery">Jewelery</option>
                </select>

                <select ref={sortingRef} onChange={handleSortChange}>
                    <option value="">Sort By Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High To Low</option>
                </select>
            </div>

            <div className='Products'>
            {(data) ? (
        data.map((elem) => (
            <div key={elem.id}>
                <img src={elem.image} alt={elem.title} width={250} />
                <h2>Title: {elem.title}</h2>
                <h3>Price: ${elem.price}</h3>
            </div>
        ))
    ) : (
        <p>No products available</p>
    )}
            </div>

            <div className='Pagination'>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Products;
