import React, { useEffect } from 'react'
import { useState } from 'react'
import Card from '../../components/card'
import useAxiosPublic from '../../hook/useAxiosPublic'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filterItemed, setFilterItemed] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOptions, setSortOptions] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const response = await fetch("/product.json");
                const response = await axiosPublic.get( "/product");
                const data = await response.data;
                setProducts(data);
                setFilterItemed(data);
                setCategories(["all", ...new Set(data.map((item) => item.category))])
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const filterItems = (category) => {
        const filterItems = category === "all" ? products : products.filter((item) => item.category === category);
        setFilterItemed(filterItemed);
        setSelectedCategory(category);
        setCurrentPage(1);
    }

    const handleSortChange = (option, products) => {
        setSortOptions(option);
        let sortedItems = { ...products };
        switch (option) {
            case "A-Z": sortedItems.sort((a, b) => a.name.localeCompare(b.name)); break;
            case "Z-A": sortedItems.sort((a, b) => b.name.localeCompare(a.name)); break;
            case "L-to-H": sortedItems.sort((a, b) => a.price - b.price); break; default: 
            case "H-to-L": sortedItems.sort((a, b) => b.price - a.price); break;
            break;
        }
        setFilterItemed(sortedItems);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = itemsPerPage - indexOfLastItem;
    const currentItems = filterItemed.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>
            {/**Product List Banner */}
            <div className='section-container bg-gradient-to-r from-#FAFAFA from-0% to-#FCFCFC to-100%'>
                <div className=' py-48 flex flex-col justify-center items-center'>
                    <div className='text-center space-y-7 px-4'>
                        <h2 className='md:text-4xl font-bold md:leading-snug leading-snug'>
                            Unleash Your Inner <span className=' text-red'>Geek</span>  Shop Our Exclusive Tech-themed Merchandises!
                        </h2>
                        <p className=' text-xl text-#4A4a4a'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe
                            rerum mollitia ipsum assumenda delectus, eos nobis magnam quas
                            voluptates distinctio dolor suscipit deleniti tempore libero
                            laborum eveniet accusamus repellat adipisci!
                        </p>
                        <button className=' btn bg-red px-8 py-3 font-semibold text-white rounded-full'>
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
            <div className=' section-container'>
                <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
                    {/**Filter */}
                    <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
                        {categories.map((category, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={() => filterItems(category)}
                                    className={`${selectedCategory === category ? "active" : ""
                                        }px-4 py-2 rounded-full`}
                                >
                                    <p className=' capitalize'>{category}</p>
                                </button>
                            )
                        })}

                    </div>
                    {/**Sort Option */}
                    <div className='flex justify-end mb-4 rounded-sm'>
                        <div className='bg-black p-2'>
                            <select id="sort" className='bg-black text-white px-2 rounded-sm'
                                onChange={(e) => handleSortChange(e.target.value, filterItemed)}
                                value={sortOptions}>
                                <option value={"default"}> Default </option>
                                <option value={"A-Z"}> A-Z </option>
                                <option value={"Z-A"}> Z-A </option>
                                <option value={"L-to-H"}> L to H </option>
                                <option value={"H-to-L"}> H to L </option>
                            </select>
                        </div>
                    </div>
                    {/**Product Card */}
                    <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
                        {currentItems.map((item, index) => (
                            <Card key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
            {/**Pagination */}
            <div className='flex justify-center my-8 flex-wrap gap-2'>
                {
                    Array.from({
                        length: Math.ceil(filterItemed.length / itemsPerPage)
                    }).map((_, index) => {
                        return (
                            <button key={index} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-red text-white" : " bg-gray-200"}`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductList
