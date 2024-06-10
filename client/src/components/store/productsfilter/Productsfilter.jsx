import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Productsitem from '../productsitem/Productsitem'
import { useDispatch, useSelector } from 'react-redux'
import { filerByPrice, filterByCategory, filterBySearch, filterproduct } from '../../../redux/slice/filterslice'
import { maxringe, minrange, pricerange, productsdata, } from '../../../redux/slice/productsslice'
function Productsfilter() {
    const dispatch = useDispatch();
    const [price, setPrice] = useState(0)
    const minRange = useSelector(minrange);
    const maxRange = useSelector(maxringe);
    const [inputsearch, setInputsearch] = useState("")
    const [type, setType] = useState([])
    const selectproducts = useSelector(productsdata)
    const filteredproduct = useSelector(filterproduct)
    const currentproduct = filteredproduct.length === 0 ? selectproducts : filteredproduct;
    useEffect(() => {
        dispatch(pricerange());
    })
    useEffect(() => {
        dispatch(filterBySearch({ product: selectproducts, search: inputsearch }))
    }, [dispatch, inputsearch, selectproducts])
    const filterbycategory = (cat) => {
        dispatch(filterByCategory({ product: selectproducts, category: cat }));
    }
    const category = [
        "All",
        ...new Set(selectproducts.map((product) => product.category)),
    ];
    useEffect(() => {
        dispatch(filerByPrice({ product: selectproducts, pricerange: price }));
    }, [dispatch, price, selectproducts])
    const resetFilter = () => {
        setInputsearch('')
        // setPrice(maxRange)
        filterbycategory("All")
        setPrice(maxRange / 2)

    }
    // console.log(selectproducts);
    return (
        <>
            <section className="storing">
                <div className="filter mt-10">
                    <div className="shop-widget">
                        <h3 className='shop-widget-title'>Category</h3>
                        <select aria-label="Default select example" className='form-select' onChange={(e) => {
                            setType(e.target.value);
                            filterbycategory(e.target.value);
                        }}>
                            {category.map((cat, index) => {
                                return (
                                    <option key={index} value={cat}>{cat}</option>
                                )
                            })}
                        </select>

                    </div>
                    <div className="shop-widget">
                        <h3 className='shop-widget-title'>Search</h3>
                        <input type='text' className='searchinput' value={inputsearch} placeholder='search' onChange={(e) => setInputsearch(e.target.value)} />
                    </div>
                    <div className="shop-widget">
                        <h2 className='shop-widget-title'>Price</h2>
                        <h3 className='shop-widget-title text'>{price}</h3>
                        <div className="price">
                            <input type="range" min={minRange} max={maxRange} value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <br />
                    </div>

                    <button className="clearbtn" onClick={resetFilter}>
                        Clear filter
                    </button>
                </div>
                <section className="aproducts">
                    <div className='mb-4'>
                        <p>Showing 1-20 of {selectproducts.length} Results</p>
                    </div>
                    <Productsitem product={currentproduct} category={category} />
                </section>
            </section>
        </>
    )
}

export default Productsfilter