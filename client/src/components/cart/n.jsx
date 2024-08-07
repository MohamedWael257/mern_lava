
<table>
    <thead>
        <tr>
            <th className='p-2'>IMAGE</th>
            <th className='p-2'>PRODUCT NAME</th>
            <th className='p-2'>PRICE</th>
            <th className='p-2'>QUANTITY</th>
            <th className='p-2'>SUB TOTAL</th>
        </tr>
    </thead>
    <tbody>
        {cart.map((ele, index) => {
            return (
                <tr className='cart' key={index}>
                    <td className="img w-25 me-4 p-2">
                        <img src={ele.ImageUrl} onClick={() => navigate(`/productdetails/${ele.id}/${ele.category}`)} className="w-100 h-50" alt="" />
                    </td>
                    {/* <td className="card-details"> */}
                    {/* <div className="title"> */}
                    <td className='p-2'>
                        <p>{ele.title}</p>
                    </td>
                    <td className='p-2'>
                        <strong className="">EGB {ele.price}</strong>
                    </td>
                    {/* </div> */}
                    <td className='p-2'>
                        <button className="increment" onClick={() => dispatch(addtocart(ele))}>+</button>
                        <span className="count">{ele.itemquantity}</span>
                        <button className="decrement" onClick={() => dispatch(decrease(ele))}>-</button>
                    </td>
                    <td className='p-2'>
                        <strong className="">EGB {ele.price * ele.itemquantity}</strong>
                    </td>
                    <td className='p-2'>
                        <button className="delete" onClick={() => dispatch(removefromcart(ele))}> X</button>
                    </td>

                    {/* </td> */}
                </tr>
            )
        })}
    </tbody>
</table>
const applyCoupon = () => {
    // toast.info(e)
    setActivecoupon(true)
    if (coupon === 'mohamed') {
        setDiscount(discount + 5000)
        setCart_total(cart_total - 5000)
        toast.success('Correct Coupon Code. you will have more discount')

    }
    else if (coupon === 'hady') {
        setDiscount(discount + 5000)
        setCart_total(cart_total - discount)
        toast.success('Correct Coupon Code. you will have more discount')

    }
    else if (coupon === 'hesham') {
        setDiscount(discount + 5000)
        setCart_total(cart_total - discount)
        toast.success('Correct Coupon Code. you will have more discount')

    }
    else if (coupon === 'abdo') {
        setDiscount(discount + 5000)
        setCart_total(cart_total - discount)
        toast.success('Correct Coupon Code. you will have more discount')

    }
    else if (coupon === 'hend') {
        setDiscount(discount + 5000)
        setCart_total(cart_total - discount)
        toast.success('Correct Coupon Code. you will have more discount')

    }
    else if (coupon === 'amina') {
        setDiscount(discount + 5000)
        setCart_total(cart_total - discount)
        toast.success('Correct Coupon Code. you will have more discount')

    }
    else if (coupon === 'menna') {
        setDiscount(discount + 5000)
        setCart_total(cart_total - discount)
        toast.success('Correct Coupon Code. you will have more discount')

    }
    else {
        toast.error('Wrong Coupon Code Try Again !')
    }
}